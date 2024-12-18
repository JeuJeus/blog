const {DateTime} = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginNavigation = require("@11ty/eleventy-navigation");
const {EleventyHtmlBasePlugin} = require("@11ty/eleventy");

const pluginDrafts = require("./eleventy.config.drafts.js");
const pluginImages = require("./eleventy.config.images.js");

const pluginPWA = require("eleventy-plugin-pwa-v2");

module.exports = eleventyConfig => {
    // Copy the contents of the `public` folder to the output folder
    // For example, `./public/css/` ends up in `_site/css/`
    eleventyConfig.addPassthroughCopy({
        "./public/": "/",
        "./node_modules/prism-themes/themes/prism-one-dark.css": "/css/prism-one-dark.css"
    });

    // Run Eleventy when these files change:
    // https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

    // Watch content images for the image pipeline.
    eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

    // App plugins
    eleventyConfig.addPlugin(pluginDrafts);
    eleventyConfig.addPlugin(pluginImages);

    // Official plugins
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginSyntaxHighlight, {
        preAttributes: {tabindex: 0}
    });
    eleventyConfig.addPlugin(pluginNavigation);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(pluginBundle);

    // Filters
    eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
        // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
        return DateTime.fromJSDate(dateObj, {zone: zone || "utc"}).toFormat(format || "dd LLLL yyyy");
    });

    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    });

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter("head", (array, n) => {
        if (!Array.isArray(array) || array.length === 0) return [];
        if (n < 0) return array.slice(n);
        return array.slice(0, n);
    });

    // Return the smallest number argument
    eleventyConfig.addFilter("min", (...numbers) => Math.min.apply(null, numbers));

    // Return all the tags used in a collection
    eleventyConfig.addFilter("getAllTags", collection => collection.flatMap(item => item.data.tags).filter(item => item));

    eleventyConfig.addFilter("filterTagList", tags => (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1));

    const filterPosts = filterTag => collection => collection.filter(post => (post.data.tags || []).some(tag => tag.toLowerCase() === filterTag));

    eleventyConfig.addFilter("javaSeriesPosts", filterPosts("weird quirks of java"));
    eleventyConfig.addFilter("learningSeriesPosts", filterPosts("learning"));
    eleventyConfig.addFilter("homeserverSeriesPosts", filterPosts("selfhosting and your homeserver"));
    eleventyConfig.addFilter("trustProblemsSeriesPosts", filterPosts("trust problems"));
    eleventyConfig.addFilter("bugHuntingSeriesPosts", filterPosts("bug hunting"));
    eleventyConfig.addFilter("phdSeriesPosts", filterPosts("phd"));

    // Customize Markdown library settings:
    eleventyConfig.amendLibrary("md", mdLib => {
        const fence = mdLib.renderer.rules.fence;

        const rules = {
            fence: (tokens, idx, options, env, slf) => {
                const fenced = fence(tokens, idx, options, env, slf);
                return `<web-copy-code>${fenced}</web-copy-code>`;
            },
            table_close: () => '</table>\n</div>',
            table_open: () => '<div class="table-overflow-wrapper">\n<table>\n',
        }

        mdLib.renderer.rules = {...mdLib.renderer.rules, ...rules};

        mdLib.use(markdownItAnchor, {
            permalink: markdownItAnchor.permalink.ariaHidden({
                placement: "after",
                class: "header-anchor",
                symbol: "#",
                ariaHidden: false,
            }),
            level: [1, 2, 3, 4],
            slugify: eleventyConfig.getFilter("slugify")
        });
    });

    eleventyConfig.addPlugin(pluginPWA, {
        cacheId: "jeujeus-blog",
        runtimeCaching: [
            {
                urlPattern: /\/$/,
                handler: "NetworkFirst",
            },
            {
                urlPattern: /\.html$/,
                handler: "NetworkFirst",
            },
            {
                urlPattern:
                    /^.*\.(avif|jpg|png|mp4|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json)$/,
                handler: "StaleWhileRevalidate",
            },
        ]
    });

    // Features to make your build faster (when you need them)

    // If your passthrough copy gets heavy and cumbersome, add this line
    // to emulate the file copy on the dev server. Learn more:
    // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

    // eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

    return {
        // Control which files Eleventy will process
        // e.g.: *.md, *.njk, *.html, *.liquid
        templateFormats: [
            "md",
            "njk",
            "html",
            "liquid",
        ],

        // Pre-process *.md files with: (default: `liquid`)
        markdownTemplateEngine: "njk",

        // Pre-process *.html files with: (default: `liquid`)
        htmlTemplateEngine: "njk",

        // These are all optional:
        dir: {
            input: "content",          // default: "."
            includes: "../_includes",  // default: "_includes"
            data: "../_data",          // default: "_data"
            output: "_site"
        },

        // -----------------------------------------------------------------
        // Optional items:
        // -----------------------------------------------------------------

        // If your site deploys to a subdirectory, change `pathPrefix`.
        // Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

        // When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
        // it will transform any absolute URLs in your HTML to include this
        // folder name and does **not** affect where things go in the output folder.
        pathPrefix: "/",
    };
};
