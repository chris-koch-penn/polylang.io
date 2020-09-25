<script>
  import { onMount } from "svelte";
  import { appendScript, until, consoleMsg } from "../utils.js";
  import Spinner from "../components/Spinner.svelte";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  let outputConsole, editor;
  let stdout = "";
  let isInitialized = false;
  let initialCode = 'print("Hello World")';
  appendScript("/micropython/micropython.js");
  let print = e => (stdout = stdout + e.data);

  async function runCode() {
    if (!isInitialized) {
      await until(() => window.mp_js_init);
      window.mp_js_init(64 * 100000);
      isInitialized = true;
    }
    let val = editor.getValue();
    window.mp_js_do_str(val);
    outputConsole.innerHTML = consoleMsg + stdout + "</p>";
    outputConsole.scrollTop = outputConsole.scrollHeight;
    stdout = "";
  }
</script>

<style lang="scss">

</style>

<NavBar showButtons={true} {runCode} />
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-10 col-sm-6 mb-3">
    <Editor bind:editor language={'python'} {initialCode} />
  </div>
  <div class="col-10 col-sm-4 mx-auto">
    <div
      bind:this={outputConsole}
      class="console"
      id="mp_js_stdout"
      on:print={print}>
      <div
        class="d-flex justify-content-center align-items-center"
        style="height:100%" />
    </div>
  </div>
  <div class="col-sm-1" />
</div>
