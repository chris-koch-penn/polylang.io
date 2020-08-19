<script>
  import { until, appendScript, consoleMsg } from "../utils.js";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  import Spinner from "../components/Spinner.svelte";
  let outputConsole;
  let editor;
  let isCompilerReady = false;
  let CProgram = `#include <iostream>\n\nint main() {\n\tstd::cout << "Hello World!";\n\treturn 0;\n}`;
  appendScript("/cpp/shared.js", async () => {
    await window.CPP_READY;
    isCompilerReady = true;
  });
  let initialCode = CProgram;

  async function runCode() {
    try {
      await window.CPP.compileLinkRun(editor.getValue());
    } catch {
    } finally {
      outputConsole.innerHTML = consoleMsg + window.CPP_OUTPUT + "</xmp>";
      outputConsole.scrollTop = outputConsole.scrollHeight;
      window.CPP_OUTPUT = "";
    }
  }
</script>

<NavBar showButtons={true} {runCode} />
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-6">
    <Editor bind:editor language={'clike'} {initialCode} />
  </div>
  <div class="col-4">
    <div bind:this={outputConsole} class="console" />
  </div>
  <div class="col-1" />
</div>
