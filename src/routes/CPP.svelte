<script>
  import { until, appendScript, consoleMsg } from "../utils.js";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  import Spinner from "../components/Spinner.svelte";
  let outputConsole;
  let editor;
  let isCompilerReady = false;
  let isExecuting = false;
  let CProgram = `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello World!";\n\treturn 0;\n}`;
  let url = "https://cdn.jsdelivr.net/npm/@chriskoch/cpp-wasm";
  appendScript(url, async () => {
    await window.CPP_READY;
    isCompilerReady = true;
  });
  let initialCode = CProgram;

  async function runCode() {
    try {
      isExecuting = true;
      await window.CPP.compileLinkRun(editor.getValue());
    } catch {
    } finally {
      isExecuting = false;
      outputConsole.innerHTML = consoleMsg + window.CPP_OUTPUT + "</p>";
      outputConsole.scrollTop = outputConsole.scrollHeight;
      window.CPP_OUTPUT = "";
    }
  }
</script>

<NavBar showButtons={true} {runCode} lang="cpp" {editor} />
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-10 col-sm-6 mb-3">
    <Editor bind:editor language={'clike'} {initialCode} />
  </div>
  <div class="col-10 col-sm-4 mx-auto">
    <div bind:this={outputConsole} class="console">
      {#if !isCompilerReady}
        <div
          class="d-flex justify-content-center align-items-center"
          style="height:100%">
          <div>
            <Spinner />
            <p style="margin-top: 20px;margin-bottom: 20%;">
              Loading Clang Compiler
            </p>
          </div>
        </div>
      {/if}
    </div>
  </div>
  <div class="col-sm-1" />
</div>
