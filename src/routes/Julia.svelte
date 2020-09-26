<script>
  import { appendScript, consoleMsg } from "../utils.js";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  import Spinner from "../components/Spinner.svelte";
  let outputConsole, editor;
  let isCompilerloaded = false;
  let outputBuffer = "";
  let initialCode =
    "# Some matrix operations are broken currently.\n# We are looking for contributors that can help.\n";
  let errCalls = 0;
  window.Module = {
    preRun: [],
    noInitialRun: true,
    print: stdout => (outputBuffer += stdout + "\n"),
    printErr: function(text) {
      errCalls++;
      if (errCalls == 1) return;
      if (arguments.length > 1) {
        text = Array.prototype.slice.call(arguments).join(" ");
      }
      outputBuffer += text + "\n";
    },
    postRun: [
      function() {
        window.Module._jl_initialize();
        let input = "Base.load_InteractiveUtils()";
        let ptr = window.Module._malloc(input.length + 1);
        window.Module.stringToUTF8(input, ptr, input.length + 1);
        window.Module._jl_eval_string(ptr);
        if (window.Module.initialize_jscall_runtime)
          window.Module.initialize_jscall_runtime();
        isCompilerloaded = true;
      }
    ]
  };
  appendScript("/julia/julia.js");

  let runCode = () => {
    let code = editor.getValue();
    let ptr = window.Module._malloc(code.length + 1);
    window.Module.stringToUTF8(code, ptr, code.length + 1);
    window.Module._jl_eval_and_print(ptr);
    displayOutput();
  };

  function displayOutput() {
    if (outputBuffer.endsWith("nothing\n")) {
      outputBuffer = outputBuffer.slice(0, outputBuffer.length - 8);
      outputBuffer += "\nReturn Type: nothing";
    } else {
      outputBuffer = outputBuffer
        .split("typeof(")
        .join("\nReturn Type: typeof(");
    }
    console.log(outputBuffer);
    outputConsole.innerHTML = consoleMsg + outputBuffer + "</p>";
    outputConsole.scrollTop = outputConsole.scrollHeight;
    outputBuffer = "";
  }
</script>

<NavBar showButtons={true} {runCode} />
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-10 col-sm-6 mb-3">
    <Editor bind:editor language={'julia'} {initialCode} />
  </div>
  <div class="col-10 col-sm-4 mx-auto">
    <div bind:this={outputConsole} class="console">
      {#if !isCompilerloaded}
        <div
          class="d-flex justify-content-center align-items-center"
          style="height:100%">
          <div>
            <Spinner />
            <p style="margin-top: 20px;margin-bottom: 20%;">
              Loading Julia Compiler
            </p>
          </div>
        </div>
      {/if}
    </div>
  </div>
  <div class="col-sm-1" />
</div>
