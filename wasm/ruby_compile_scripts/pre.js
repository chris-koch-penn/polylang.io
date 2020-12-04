function redirectOutput(text) {
    if (!text) text = "\n"
    let output = window.RUBY_STDOUT ? window.RUBY_STDOUT : "";
    window.RUBY_STDOUT = output + text;
}
var Module = {
    'print': redirectOutput,
    'printErr': redirectOutput,
    'prettyPrint': redirectOutput
};