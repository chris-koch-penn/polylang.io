<script>
  import { until, appendScript, consoleMsg } from "../utils.js";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  import Spinner from "../components/Spinner.svelte";
  let isCompilerReady = false;
  let isCompiling = false;
  let CProgram = `#include <stdio.h>
                    int main() {
                    // printf() displays the string inside quotation
                    printf("Hello, World!");
                    return 0;
                    }`;
  appendScript("/cpp/shared.js", async () => {
    await window.CPP_READY;
    isCompilerReady = true;
  });
  appendScript("/cpp/shared_web.js");
  let initialCode = CProgram;
  let editor;

  function runCode() {
    isCompiling = true;
    console.log(window.CPP);
    window.CPP.compileLinkRun(editor.getValue());
  }
</script>

<NavBar showButtons={true} {runCode} />
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-6">
    <Editor bind:editor language={'clike'} {initialCode} />
  </div>
  <div class="col-4">
    <div class="console" id="output">
      {#if !isCompilerReady}
        <div
          class="d-flex justify-content-center align-items-center"
          style="height:100%">
          <div>
            <Spinner />
            <p style="margin-top: 20px;margin-bottom: 20%;">
              <!-- {#if executing} -->
              Loading Clang 8.0.1 compiler
              <!-- {:else}Loading Python Interpreter{/if} -->
            </p>
          </div>
        </div>
      {/if}
    </div>
  </div>
  <div class="col-1" />
</div>
