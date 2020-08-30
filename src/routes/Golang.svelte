<script>
  import { until, appendScript, consoleMsg } from "../utils.js";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  import Spinner from "../components/Spinner.svelte";
  let isCompilerReady = false;
  let isExecuting = false;
  window.RUN_GOLANG = () => {};
  let initialCode =
    'package main\n\nfunc main() {\n\tprintln("Hello, WebAssembly playground!")\n}';
  let editor;
  appendScript("/golang/wasm_exec.js");
  appendScript("/golang/golang_main.js");

  let runCode = () => {
    if (isExecuting || !isCompilerReady) return;
    isExecuting = true;
    window.RUN_GOLANG(editor.getValue());
  };

  window.GOLANG_DONE = () => (isExecuting = false);
  window.GOLANG_READY = () => (isCompilerReady = true);
  window.GET_GOLANG_CODE = () => editor.getValue();
  window.SET_GOLANG_CODE = val => {
    editor.setValue(val);
    editor.refresh();
  };
</script>

<NavBar showButtons={true} {runCode} />
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-10 col-sm-6 mb-3">
    <Editor bind:editor language={'go'} {initialCode} />
  </div>
  <div class="col-10 col-sm-4 mx-auto">
    <div class="console" id="output">
      {#if !isCompilerReady || isExecuting}
        <div
          class="d-flex justify-content-center align-items-center"
          style="height:100%">
          <div>
            <Spinner />
            <p style="margin-top: 20px;margin-bottom: 20%;">
              Loading Golang Compiler
            </p>
          </div>
        </div>
      {/if}
    </div>
  </div>
  <div class="col-sm-1" />
</div>
