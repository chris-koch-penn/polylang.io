<script>
  import { appendScript, consoleMsg } from "../utils.js";
  import { onMount } from "svelte";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  let outputConsole, editor;

  let runCode = () => {
    // TODO
  };
</script>

<NavBar showButtons={true} {runCode} />
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-6">
    <Editor bind:editor language={'javascript'} />
  </div>
  <div class="col-4">
    <div bind:this={outputConsole} class="console" />
  </div>
  <div class="col-1" />
</div>
