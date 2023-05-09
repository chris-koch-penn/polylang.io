function redirectOutput(text) {
    if (!text) text = "\n"
    const output = window.RUBY_STDOUT ?? "";
    window.RUBY_STDOUT = output + text;
}

const Module = {
    'print': redirectOutput,
    'printErr': redirectOutput,
    'prettyPrint': redirectOutput
};