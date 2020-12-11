import axios from "axios";
const consoleMsg = "<p class='polylang-stdout'>Console output:\n";
const apiUrl = IS_PRODUCTION ? "https://api.polylang.io/" : "http://localhost:9000/";
// Run database locally: dynalite --port 8000

// Adds a script to the head element of the HTML document.
// This is to circumvent the weird behavior of how Svelte loads JS scripts.
function appendScript(src, loadCallback) {
    let el = document.createElement("script");
    document.head.appendChild(el);
    el.onload = loadCallback;
    el.src = src;
}


// Resolve promise by checking every 75 milliseconds until condition 
// callback evalutates true.
function until(conditionFunction) {
    const poll = resolve => {
        if (conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 75);
    };

    return new Promise(poll);
}

// Create new code snippet in database.
function newSnippet(code, lang) {
    return axios.post(apiUrl,
        {
            route: "new_snippet",
            code: code,
            lang: lang,
            owner: "guest",
            org: "",
            private: false
        }).catch(console.log);
}

// Update code snippet in database provided you have the correct token.
// The token is a JWT that contains the snippet id and is saved in local storage.
// This strategy allows guests to later update one of their posts without neeeding an acct.
function updateSnippet(code, token) {
    return axios.post(apiUrl,
        {
            route: "update_snippet",
            code: code,
            token: token
        }).catch(console.log);
}

function getSnippet(snippet_id) {
    return axios.post(apiUrl,
        { route: "get_snippet", snippet_id: snippet_id }).catch(console.log);
}

export {
    appendScript,
    until,
    updateSnippet,
    newSnippet,
    getSnippet,
    consoleMsg,
    apiUrl
}