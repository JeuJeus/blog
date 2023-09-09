const includesSearchString = (postMeta, searchString) => postMeta.toLowerCase().includes(searchString);

const postIncludesSearchString = (post, searchString) => includesSearchString(post.title, searchString) || includesSearchString(post.description, searchString) || includesSearchString(post.tags.toLowerCase(), searchString);

const createPostResultEntry = post => {
    const resultLink = document.createElement('a');
    resultLink.href = post.url;
    const resultLinkHeader = document.createElement('h2');
    resultLinkHeader.innerText = post.title;
    const resultLinkParagraph = document.createElement('p');
    resultLinkParagraph.innerText = post.description;

    resultLink.appendChild(resultLinkHeader);
    resultLink.appendChild(resultLinkParagraph);

    return resultLink;
}

function triggerSearch(posts, searchString, resultsDom) {
    const results = posts
        .filter(p => postIncludesSearchString(p, searchString))
        .map((post) => createPostResultEntry(post));
    resultsDom.replaceChildren(...results);
}

const handleKeyUpEvent = (event, posts, resultsDom) => {
    const searchString = event.target.value.toLowerCase();
    triggerSearch(posts, searchString, resultsDom);
};

const fetchPostsAsJson = async () => await fetch('/search.json').then(res => res.json());

(async () => {
    const resultsDom = document.querySelector('#results');
    const searchDom = document.querySelector('#search');
    const posts = await fetchPostsAsJson();
    searchDom.addEventListener('keyup', keyUpEvent => handleKeyUpEvent(keyUpEvent, posts, resultsDom));
    triggerSearch(posts, '', resultsDom);
})()