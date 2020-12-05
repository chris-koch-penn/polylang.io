<script>
  import { appendScript, consoleMsg } from "../utils.js";
  import { onMount } from "svelte";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  let outputConsole, editor;
  let initialCode = 'print("Hello, World!\\n")';
  appendScript("/perl/webperl.js", () => {
    window.PERL_RUN('print ""'); // Flush buffer.
    window.PERL_OUTPUT_CALLBACK = stdout => {
      outputConsole.innerHTML = consoleMsg + stdout + "</p>";
      outputConsole.scrollTop = outputConsole.scrollHeight;
    };
  });

  let runCode = () => {
    let code = editor.getValue();
    window.PERL_RUN(editor.getValue());
  };
</script>

<NavBar showButtons={true} {runCode} lang="perl" {editor} />
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-10 col-sm-6 mb-3">
    <Editor bind:editor language={'perl'} {initialCode} />
  </div>
  <div class="col-10 col-sm-4 mx-auto">
    <div bind:this={outputConsole} class="console" />
  </div>
  <div class="col-sm-1" />
</div>
