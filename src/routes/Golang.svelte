<script>
  import { appendScript, consoleMsg } from "../utils.js";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  let initialCode =
    'package main\n\nfunc main() {\n\tprintln("Hello, WebAssembly playground!")\n}';
  let editor;
  appendScript(
    "https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"
  );
  appendScript("/golang/wasm_exec.js");
  appendScript("/golang/playground.js");
  appendScript("/golang/golang_main.js");

  window.GET_GOLANG_CODE = () => {
    return editor.getValue();
  };
</script>

<!-- 
<svelte:head>
  <script src="/golang/wasm_exec.js">

  </script>  <script
    src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js" ✂prettier:content✂="CgogIA==" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=">{}</script>  <script
    src="https://cdn.jsdelivr.net/npm/lz-string@1.4.4/libs/lz-string.min.js" ✂prettier:content✂="CgogIA==" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=">{}</script>  <script src="/golang/playground.js">

  </script>  <script src="/golang/golang_main.js">

  </script></svelte:head> -->

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
