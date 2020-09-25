import axios from "axios";
const consoleMsg = "<p class='polylang-stdout'>Console output:\n";
const apiUrl = IS_PRODUCTION ? "https://polylang.io/api" : "http://localhost:8000/api";
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
async function new_snippet(code, lang) {
    await axios.post(apiUrl,
        {
            route: "new_snippet",
            code: code,
            lang: lang,
            org: "",
            user: "guest"
        });
}

// Update code snippet in database provided you have the correct token.
// The token is a JWT that contains the snippet id and is saved in local storage.
// This strategy allows guests to later update one of their posts without neeeding an acct.
async function update_snippet(code, token) {
    await axios.post(apiUrl,
        {
            route: "update_snippet",
            code: code,
            token: token
        });
}


export {
    appendScript,
    until,
    update_snippet,
    new_snippet,
    consoleMsg,
    apiUrl
}