<script>
  import { until, appendScript, consoleMsg } from "../utils.js";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  let CProgram = `#include <stdio.h>
int main() {
   // printf() displays the string inside quotation
   printf("Hello, World!");
   return 0;
}`;
  appendScript("/cpp/shared.js");
  appendScript("/cpp/shared_web.js", () => {
    console.log(window.CPP);
    window.CPP.compileLinkRun("");
  });
  let initialCode =
    'package main\n\nfunc main() {\n\tprintln("Hello, WebAssembly playground!")\n}';
  let editor;
  let compileCommand = `echo 'int printf(const char *, ...); int main(){printf("hello world!\n");}' | wapm run clang -cc1 -triple wasm32-unkown-wasi -isysroot /sys -internal-isystem /sys/include -emit-obj -o ./example.o -`;
  let linkCommand = `wapm run wasm-ld -L/sys/lib/wasm32-wasi /sys/lib/wasm32-wasi/crt1.o ./example.o -lc -o ./example.wasm`;
  let containerEl;
</script>

<NavBar showButtons={true} runCode={false} />
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-6">
    <Editor bind:editor language={'clike'} {initialCode} />
  </div>
  <div class="col-4">
    <div bind:this={containerEl} class="console" id="output" />
  </div>
  <div class="col-1" />
</div>
