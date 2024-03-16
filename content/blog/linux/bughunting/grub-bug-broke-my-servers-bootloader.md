---
title: Bug Hunting - E02 - How Grub broke my Server, Rebooting into a broken Bootloader
description: We take a deep dive into how a GRUB Bug broke my Servers Bootloader and left me frustrated and chrooting into it, in order to fix it.
date: 2024-03-12
tags:
  - bug
  - 'bug hunting'
  - zfs
  - grub
  - linux
  - file system
  - server
---

_This Article serves as a chronicle recapitulation of the events that took place over the course of last saturday (
09.03.24)._

## What happened?

My Saturday morning started rather boring with my alarm going off at 07:00 as usual.
Whilst sleepy me was browsing through the notifications I received since traversing the land of the sleeping, some mail
grabbed my attention.  
My Server notified me of a broken APT upgrade.
This is nothing unusual itself, the unattended-upgrades package performs APT upgrades for the Ubuntu LTS running on my
server and notifies me in the event of any mishaps.  
The major fuckup happened to me still sleepy not reading the whole message but rather only skimming it on my phone
before taking immediate action.
But we will come to that in a minute.

{% image "./mail-reporting-apt-failure.png", "The Mail Report that started it all" %}

So let us examine that mail together.  
First of all, we see that the Linux Kernel Package received an upgrade which lead to the rebuild of the Servers
Initramfs and grub.
The latter step failed since there was no space left.
Also, we are informed that we - obviously - should reboot after the upgrade as it finished successfully, since only then
we get to apply the new kernel version.  
Ok, at this point in time I decided to quickly pull out my laptop from the nightstand ssh into my server, fix the error,
reapply the package upgrade (therefore initramfs and grub update) and reboot.
Should be as easy as this - right?
Spoiler: **No**  
This took me way longer in the end...

## My Fuckup

I ssh'ed into my Server and validated that the boot partition was indeed out of space.
The reason was quite easy, I utilize zfs-auto-snapshot as a service, but did not care to configure it properly.
Since the boot partition - as automatically created via Ubuntus Installer - is quite small, the automatic Snapshots of
the corresponding Pool and Datasets quickly fill it up with every kernel upgrade.  
I validated this quickly via Shell (the command output below is recreated therefore showing the current and correct
space usage).

{% highlight "bash" %}
$ zpool list                                                              
NAME SIZE ALLOC FREE CKPOINT EXPANDSZ FRAG CAP DEDUP HEALTH ALTROOT
bpool 1.88G 316M 1.57G - - 1% 16% 1.00x ONLINE -
rpool 920G 77.4G 843G - - 15% 8% 1.00x ONLINE -
xypool 3.62T 1.71T 1.92T - - 0% 47% 1.00x ONLINE -
{% endhighlight %}

Snapshots of the boot partition do not contain any relevant data or serve any additional purpose.
I mostly utilize Snapshots for easy rollbacks and recovery of deleted files on my data partition (xypool/data) as well
as the Docker containers running all relevant services on the root (rpool).
Therefore, I decided the easiest way out would be to purge all snapshots of the bpool.

{% highlight "bash" %}
$ zfs list -H -o name -t snapshot bpool/BOOT/ubuntu_ww2tf2 | xargs -n1 zfs destroy
$ zfs list -H -o name -t snapshot bpool/BOOT/ | xargs -n1 zfs destroy
$ zfs list -H -o name -t snapshot bpool/ | xargs -n1 zfs destroy
{% endhighlight %}
_Contrary to the Syntax Highlighting, these commands are executed as root, zfs assumes you know what you are doing,
there is no way back._

Ok fine, now that there is sufficient space, let us rerun `apt upgrade`.
Finished without visible errors on first sight (hint for the fuckup) aaaand `sudo reboot`.

## Everything is in Shambles

As I am used to reboots taking some time (fastboot is disabled anyway, grub has a long timeout) I usually ping my
server.

{% highlight "bash" %}
$ ping 192.168.178.5
PING 192.168.178.5 (192.168.178.5) 56(84) bytes of data.
From 192.168.178.40 icmp_seq=1 Destination Host Unreachable
From 192.168.178.40 icmp_seq=2 Destination Host Unreachable
From 192.168.178.40 icmp_seq=3 Destination Host Unreachable
{% endhighlight %}

Well that did not look good, as it is necessary to supply the zfs key for the rpool (root partition) in order to boot I
utilize a kvm which came in handy.
But what I saw through the HDMI Screens stream, did freak me out.  
My urge to quickly rush through the required steps to fixup the server, in order to get some breakfast, coffee and go
bouldering now fell back on me.

{% image "./grub-rescue-shell.png", "Symbolic Image Grub Rescue Shell" %}Symbolic Image [1]

The particularly attentive out of you may have already noticed the second error.
My mails screenshot above contains a scrollbar, which might reveal important information.

{% highlight "bash" %}
Processing triggers for linux-image-6.5.0-25-generic (6.5.0-25.25~22.04.1) ...
/etc/kernel/postinst.d/initramfs-tools:
update-initramfs: Generating /boot/initrd.img-6.5.0-25-generic
/etc/kernel/postinst.d/zz-update-grub:
Sourcing file `/etc/default/grub'
Sourcing file `/etc/default/grub.d/init-select.cfg'
Generating grub configuration file ...
Found linux image: vmlinuz-6.5.0-25-generic in rpool/ROOT/ubuntu_ww2tf2
Found initrd image: initrd.img-6.5.0-25-generic in rpool/ROOT/ubuntu_ww2tf2
Found linux image: vmlinuz-6.5.0-21-generic in rpool/ROOT/ubuntu_ww2tf2
Found initrd image: initrd.img-6.5.0-21-generic in rpool/ROOT/ubuntu_ww2tf2
Found linux image: vmlinuz-6.2.0-37-generic in rpool/ROOT/ubuntu_ww2tf2
Found initrd image: initrd.img-6.2.0-37-generic in rpool/ROOT/ubuntu_ww2tf2
[...]
/usr/sbin/grub-probe: error: compression algorithm inherit not supported
.
Memtest86+ needs a 16-bit boot, that is not available on EFI, exiting
Warning: os-prober will not be executed to detect other bootable partitions.
Systems on them will not be added to the GRUB boot configuration.
Check GRUB_DISABLE_OS_PROBER documentation entry.
Adding boot menu entry for UEFI Firmware Settings ...
done
{% endhighlight %}

And there it was, right in front of my eyes, the cryptic error
message `grub-probe: error: compression algorithm inherit not supported`.

## An annoying GRUB Bug

After long traversing trough loads of issues I found the culprit.[4][5]

{% highlight "bash" %}
grub-core/fs/zfs/zfs.c:3395:zfs: endian = 1
grub-core/fs/zfs/zfs.c:3170:zfs: endian = 1
grub-core/fs/zfs/zfs.c:1885:zfs: zio_read: E 0: size 0/512
grub-core/kern/fs.c:79:fs: error: compression algorithm inherit not supported
{% endhighlight %}[5]

The underlying root cause is that a nasty bug in grub leads to grub-prober (grubs detection mechanism for boot
partitions) to no longer detect the zfs boot partition if the top level pool is snapshotted.  
As you have witnessed above, I did deploy regular snapshots on a regular basis.
What frightens me is the fact, that this bugs seems not to occur every time since I do snapshots of bpool since the
server is up and running and were confronted by this bug only months later.

## The Mitigation

Ok now that I knew the issue, the real work of fixing my broken bootloader started.  
I moved over to the pivkm and mounted an image of ubuntu I could boot into.
Or so I thought, I should have more carefully investigated the issue and read the proposed solutions.
To be fair, this was 20 minutes into the chaos and i was far from being awake or in reach of my first coffee.

{% image "./192.168.178.55_kvm_.png", "pikvm Web GUI" %}

From there it was the usual hustle of chrooting into an encrypted zfs partition.
I utilized this Guide [6] as a base and adapted it to my Setup as well as an native encrpyted zfs install, which takes
some additional hoops to jump through.

{% highlight "bash" %}

# import root pool

zpool import -f rpool -R /mnt

# ensure root pool datasets are mounted + decrypted

cryptsetup open /dev/zvol/rpool/keystore zfskey

# proceeding to mount the key via nautilus (file explorer)

cat /media/ubuntu/keystore-rpool/system.key | zfs load-key -L prompt rpool

# mount all datasets

zfs mount -a

# import boot pool

zpool import -f bpool -R /mnt

# mount EFI Partition

mount -t msdos /dev/nvme0n1p1 /mnt/boot/efi

# mount special file systems

for i in proc dev sys dev/pts; do mount -v --bind /$i /mnt/$i; done

# bind mount grub folder in efi partition

mount -v --bind /mnt/boot/efi/grub /mnt/boot/grub

# mount efivars for grub reinstall

mount --bind /sys/firmware/efi/efivars /mnt/sys/firmware/efi/efivars

# chroot into FS

chroot /mnt /bin/bash
{% endhighlight %}

Jumping into the servers shell I first had to finish DNS resolution to get working internet access (especially since the
DNS server my router was pointing to should have been running on the very server I was working from).
So i proceeded to reinstall grub, rebuilt initramfs and grub.

{% highlight "bash" %}

# fix dns resolution

vim /etc/resolv.conf # add 'nameserver 8.8.8.8'

# proceed to upadte initramfs

update-initramfs -uvk all

# update bootloader

update-grub

# reinstall grub-packages

apt update
apt --reinstall install grub-common grub-efi-amd64-bin grub-efi-amd64-signed os-prober

# install grub

grub-install --bootloader-id=ubuntu --recheck --target=x86_64-efi --efi-directory=/boot/efi --no-floppy
{% endhighlight %}

After then backing out of the chroot, I prepared the system for shutdown.

{% highlight "bash" %}

# unmount special FS

for i in proc dev/pts dev sys boot/grub; do umount -v /mnt/$i; done

# remove EFI Partition + efi vars

umount -v /dev/nvme0n1p1
umount /mnt/sys/firmware/efi/efivars

# unmount zfs pools

zpool export bpool
zfs umount -a

# ensure to umount keystore before

zpool export rpool
{% endhighlight %}

After a reboot I was struck, once again with the grub rescue shell - I will spare you the symbolic picture again.  
That could not be right?  
After more careful reading I realized that the proposed solution was to recreate the boot pool.
But hey at least this was a good exercise in desaster chrooting.  
As I was not willing to go through that process again I decided to bypass grubs configuration and manually boot my
server from the rescue shell.
This seemed a viable option as I was certain that the boot partition contained the correct entries.

{% highlight "bash" %}
set root=(hd3,gpt3)
linux /BOOT/ubuntu_ww2tf2/@/vmlinuz root=ZFS=rpool/ROOT/ubuntu_ww2tf2 boot=zfs
initrd /BOOT/ubuntu_ww2tf2/@/initrd.img
boot
{% endhighlight %}

After some minutes of figuring the partition layout out later, I booted into my server.
There I straight up went to work, backing up my boot partition, deleting the pool and dataset.

{% highlight "bash" %}
ll / | grep boot                                                          
-rw-r--r-- 1 root root 300M Mär 9 16:48 backup-boot-partition-before-zfs-problems-grub.tgz
drwxr-xr-x 4 root root 19 Mär 14 07:37 boot
{% endhighlight %}

Then I went into recreating it with the proposed mitigating parameters[7] combined with the default parameters for
ubuntu 22.04 taken from the openzfs documentation[8].
I was aware that this was highly experimental, especially cannonical does not utilize the default openzfs configuration
oftentimes.
But my backup plan was to utilize zfs boot manager until the grub bugfix was present in my Ubuntu version (which I was
aware could potentially mean never, since people reported issues with this constellation for years).

{% highlight "bash" %}

# create pool (exemplary did not recover command)

zpool create \
-o ashift=12 \
-o autotrim=on \
-o cachefile=/etc/zfs/zpool.cache \
-o compatibility=grub2 \
-o feature@livelist=enabled \
-o feature@zpool_checkpoint=enabled \
-O devices=off \
-O acltype=posixacl -O xattr=sa \
-O compression=lz4 \
-O normalization=formD \
-O relatime=on \
-o feature@extensible_dataset=disabled \
-o feature@bookmarks=disabled \
-o feature@filesystem_limits=disabled \
-o feature@large_blocks=disabled \
-o feature@large_dnode=disabled \
-o feature@sha512=disabled \
-o feature@skein=disabled \
-o feature@edonr=disabled \
-o feature@userobj_accounting=disabled \
-o feature@encryption=disabled \
-o feature@project_quota=disabled \
-o feature@obsolete_counts=disabled \
-o feature@bookmark_v2=disabled \
-o feature@redaction_bookmarks=disabled \
-o feature@redacted_datasets=disabled \
-o feature@bookmark_written=disabled \ #some properties needed to be removed
-o feature@livelist=disabled \ #due to incompatibility with my package versions
-o feature@zstd_compress=disabled \
-o feature@head_errlog=disabled \
-O canmount=off -O mountpoint=/boot -R /mnt \
bpool ${DISK}-part3

# create dataset used for partition with mountpoint (exemplary did not recover command)

zfs create -o canmount=off -o mountpoint=none rpool/ROOT
zfs create -o mountpoint=/boot bpool/BOOT/ubuntu_$UUID
{% endhighlight %}[7][8]

From there I restored my bootloader backup and rebuilt the initramfs as well as grub just to be sure.
Also, I checked that grub-prober did indeed detect the partition without erros, which worked out fine.
Additionally, I made sure, that I will never be plagued by this bug again, by disabling auto snapshots by property for
the pool and datasets.

{% highlight "bash" %}

# rebuild initramfs

update-initramfs -c -k all

# rebuild grub

update-grub

# check grub-prober works as intended

grub-probe /boot

# disable snapshotting on pool and datasets

zfs set com.sun:auto-snapshot=false bpool                                                                  
zfs set com.sun:auto-snapshot=false bpool/BOOT                                                             
zfs set com.sun:auto-snapshot=false bpool/BOOT/ubuntu_ww2tf2
{% endhighlight %}

After a reboot later my server came up without any problems - finally!
And this is how 10 minutes of work, turned into hours of debugging once again.

---

<a href="https://olinux.net/grub-rescue-mode/" target="_blank">[1] - how to use grub rescue mode, olinux.net</a>    
<a href="https://github.com/openzfs/zfs/issues/15261" target="_blank">[2] - grub-probe ("suddenly") fails with "
algorithm inherit not supported" #15261 , GitHub Openzfs</a>    
<a href="https://github.com/openzfs/zfs/issues/13873#issuecomment-1889885090" target="_blank">[3] - snapshotting
top-level "bpool" filesystem causes grub to fail #13873, GitHub Openzfs</a>    
<a href="https://bugs.launchpad.net/ubuntu/+source/grub2/+bug/2047173" target="_blank">[4] - grub-probe: error:
compression algorithm inherit not supported , Bugs Launchpad</a>    
<a href="https://bugs.launchpad.net/ubuntu/+source/grub2/+bug/2041739" target="_blank">[5] - update-grub giving errors
and apparently not locating /boot on correct zfs pool after upgrade to Ubuntu Mantic, Bugs Launchpad</a>    
<a href="https://develmonk.com/2022/05/20/mount-ubuntu-22-04-zfs-partitions-using-live-iso-for-disaster-recovery/" target="_blank">[6] -
Mount Ubuntu 22.04 ZFS partitions using live ISO for disaster recovery, Developer Monkey</a>
<a href="https://bugs.launchpad.net/ubuntu/+source/grub2/+bug/2041739/comments/9" target="_blank">[7] -
Comment 9 for bug 2041739, Bugs Launchpad</a>
<a href="https://openzfs.github.io/openzfs-docs/Getting%20Started/Ubuntu/Ubuntu%2022.04%20Root%20on%20ZFS.html" target="_blank">[8] -
Ubuntu 22.04 Root on ZFS, openzfs documentation</a> 