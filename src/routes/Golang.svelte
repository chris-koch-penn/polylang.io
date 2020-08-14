<script>
  import { appendScript, consoleMsg } from "../utils.js";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  let initialCode =
    'package main\n\nfunc main() {\n\tprintln("Hello, WebAssembly playground!")\n}';
  let editor;
  appendScript("/golang/wasm_exec.js");
  appendScript("/golang/golang_main.js");

  window.GET_GOLANG_CODE = () => {
    return editor.getValue();
  };
  window.SET_GOLANG_CODE = val => {
    editor.setValue(val);
    editor.refresh();
  };
</script>

<NavBar showButtons={true} runCode={false} />
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-6">
    <Editor bind:editor language={'go'} {initialCode} />
  </div>
  <div class="col-4">
    <div class="console" id="output" />
  </div>
  <div class="col-1" />
</div>
