const consoleMsg = "<p class='polylang-stdout'>Console output:\n";

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

export {
    appendScript,
    until,
    consoleMsg
}