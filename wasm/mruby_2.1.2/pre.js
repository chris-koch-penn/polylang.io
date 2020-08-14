var Module = {
    'print': function (text) { window.RUBY_STDOUT = text; },
    'printErr': function (text) { window.RUBY_STDOUT = text; },
    'prettyPrint': function (text) { window.RUBY_STDOUT = text; }
};