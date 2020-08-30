<script>
  import { appendScript, consoleMsg } from "../utils.js";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  let editor, outputConsole, isInterpreterLoaded;
  let initialCode = '<?php\nprint "Hello World from PHP!"\n?>';
  let outputBuffer = [];
  let isExecuting = false;
  let printFunc = function(msg) {
    if (arguments.length > 1) {
      msg = Array.prototype.slice.call(arguments).join(" ");
    }
    outputBuffer.push(msg);
  };

  let config = {
    postRun: [() => (isInterpreterLoaded = true)],
    print: printFunc,
    printErr: printFunc,
    stdout: printFunc,
    stderr: printFunc
  };
  appendScript("/php/php-web.js", () => {
    console.log(window);
    window.Module = {
      ...window.Module,
      ...config
    };
  });

  let runCode = () => {
    if (!isInterpreterLoaded || isExecuting) return;
    let code = editor.getValue();
    isExecuting = true;
    let cmd1 = ["pib_eval", "number", ["string"], ["?>" + code]];
    let retVal = window.Module.ccall(...cmd1);
    window.Module.ccall("pib_eval", "number", ["string"], ['echo "\n"']);
    isExecuting = false;
    let outputMsg = String.fromCharCode(...outputBuffer);
    if (retVal == -1) {
      console.log("not here");
      outputMsg = "An error occurred in your code.";
    }
    outputConsole.innerHTML = consoleMsg + outputMsg + "</p>";
    outputConsole.scrollTop = outputConsole.scrollHeight;
    outputBuffer = [];
  };
</script>

<NavBar showButtons={true} {runCode} />
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-10 col-sm-6 mb-3">
    <Editor bind:editor language={'clike'} {initialCode} />
  </div>
  <div class="col-10 col-sm-4 mx-auto">
    <div class="console" bind:this={outputConsole} />
  </div>
  <div class="col-sm-1" />
</div>
