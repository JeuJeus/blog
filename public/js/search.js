const includesSearchString = (postMeta, searchString) => postMeta.toLowerCase().includes(searchString);

const postIncludesSearchString = (post, searchString) => includesSearchString(post.title, searchString) || includesSearchString(post.description, searchString) || includesSearchString(post.tags.toLowerCase(), searchString);

const htmlDecode = input => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
};
const createPostResultEntry = post => {
    const resultElement = document.createElement('div');

    const resultHeading = document.createElement('h2');
    const resultLink = document.createElement('a');
    resultLink.href = post.url;
    resultLink.innerText = htmlDecode(post.title);
    resultHeading.appendChild(resultLink);

    const resultLinkParagraph = document.createElement('p');
    resultLinkParagraph.innerText = htmlDecode(post.description);

    resultElement.appendChild(resultHeading);
    resultElement.appendChild(resultLinkParagraph);

    return resultElement;
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