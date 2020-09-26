<script>
  import { appendScript, consoleMsg } from "../utils.js";
  import { onMount } from "svelte";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  import Spinner from "../components/Spinner.svelte";
  appendScript("/ocaml/ocaml.js");
  setTimeout(function() {
    // This is necessary because sometimes the OCaml interpreter never loads.
    if (numCalls == 0) location.reload(1);
  }, 1000);
  let outputConsole, editor, hiddenOutput, textareaInput;
  let numCalls = 0;

  onMount(() => {
    const hiddenOutputConsole = document.getElementById("output");
    const callback = function(mutations, observer) {
      numCalls++;
      if (numCalls == 1) return;
      let outputMsg = getOutput(mutations);
      outputConsole.innerHTML = consoleMsg + outputMsg + "</p>";
      outputConsole.scrollTop = outputConsole.scrollHeight;
    };
    const observer = new MutationObserver(callback);
    observer.observe(hiddenOutputConsole, { childList: true, subtree: true });
  });

  function getOutput(mutations) {
    let outputMsg = "";
    let camlOutput = "";
    let stdoutNodes = [];
    for (let mutation of mutations) {
      for (let node of mutation.addedNodes) {
        if (node.className === "caml") {
          camlOutput += node.innerHTML;
        } else if (node.className === "stdout" || node.className === "stderr") {
          outputMsg += node.innerHTML;
        }
      }
    }

    return outputMsg + "\nTypes:\n" + camlOutput;
  }

  let runCode = () => {
    if (numCalls == 0) return;
    let code = editor.getValue();
    code = code.split("\n").join(";; ");
    textareaInput.value = code;
    const e = new KeyboardEvent("keydown", { keyCode: 13 });
    textareaInput.dispatchEvent(e);
  };
</script>

<style lang="scss">
  .hidden {
    display: none;
  }
</style>

<NavBar showButtons={true} {runCode} />
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-10 col-sm-6 mb-3">
    <Editor bind:editor language={'mllike'} />
  </div>
  <div class="col-10 col-sm-4 mx-auto">
    <div bind:this={outputConsole} class="console" id="console">
      {#if numCalls == 0}
        <div
          class="d-flex justify-content-center align-items-center"
          style="height:100%">
          <div>
            <Spinner />
            <p style="margin-top: 20px;margin-bottom: 20%;">
              Loading OCaml Compiler
            </p>
          </div>
        </div>
      {/if}
    </div>
  </div>
  <div class="col-sm-1" />
</div>

<!-- None of these elements should be displayed. They are used to communicate with
ocaml.js and pass input and output between OCaml and Javascript. This is incredibly
hacky and horrible practice, and I should probably change it later ... -->
<div class="hidden">
  <div id="toplevel-container">
    <textarea bind:this={textareaInput} id="userinput">Loading</textarea>
  </div>
  <div id="toplevel-examples">
    <pre bind:this={hiddenOutput} id="output" />
  </div>
  <canvas id="test-canvas" />
  <pre id="last-js" class="hidden" />
</div>
<!-- End elements that shouldn't be displayed. -->
