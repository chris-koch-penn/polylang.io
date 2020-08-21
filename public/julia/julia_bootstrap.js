var Module = {
    preRun: [],
    noInitialRun: true,
    print: window.JULIA_PRINT_CALLBACK,
    printErr: function (text) {
        if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
        console.error(text);
    },
    postRun: [function () {
        Module._jl_initialize();
        input = "Base.load_InteractiveUtils()"
        ptr = Module._malloc(input.length + 1);
        Module.stringToUTF8(input, ptr, input.length + 1);
        Module._jl_eval_string(ptr);
        if (Module.initialize_jscall_runtime) Module.initialize_jscall_runtime();
        window.JULIA_LOADED_CALLBACK();
    }]
};

window.JULIA_RUN = (input) => {
    ptr = Module._malloc(input.length + 1);
    Module.stringToUTF8(input, ptr, input.length + 1);
    Module._jl_eval_and_print(ptr);
}