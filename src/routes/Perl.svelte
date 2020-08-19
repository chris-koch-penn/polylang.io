<script>
  import { appendScript, consoleMsg } from "../utils.js";
  import { onMount } from "svelte";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  let outputConsole, editor;
  appendScript("/perl/webperl.js", () => {
    window.PERL_RUN('print ""'); // Flush buffer.
    window.PERL_OUTPUT_CALLBACK = stdout => {
      outputConsole.innerHTML = consoleMsg + stdout + "</xmp>";
      outputConsole.scrollTop = outputConsole.scrollHeight;
    };
  });

  let runCode = () => {
    let code = editor.getValue();
    window.PERL_RUN(editor.getValue());
  };
</script>

<NavBar showButtons={true} {runCode} />
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-6">
    <Editor bind:editor language={'perl'} />
  </div>
  <div class="col-4">
    <div bind:this={outputConsole} class="console" />
  </div>
  <div class="col-1" />
</div>
