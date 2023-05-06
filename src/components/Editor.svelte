<script>
  import { appendScript } from "../utils.js";
  export let editor;
  export let language="";
  export let initialCode = "";
  let base = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/"

  function makeEditor() {
    let textAreaEditor = document.getElementById("textarea-editor");
    editor = window.CodeMirror.fromTextArea(textAreaEditor, {
      theme: "darcula",
      mode: { name: language, version: 3, singleLineStringErrors: false },
      lineNumbers: true,
      indentUnit: 4,
      matchBrackets: true
    });
    editor.setValue(initialCode);
    editor.refresh()
    editor.setSize("100%", "100%");
  }

  function appendHighlightScript() {
    appendScript(base + `mode/${language}/${language}.min.js`, makeEditor)
  }
</script>

<svelte:head>
  <script
    src={base + "/codemirror.min.js"}
    on:load={() => appendHighlightScript()}>

  </script>
</svelte:head>

<style lang="scss">
    @import "../theme.scss";
    #textarea-editor {
        background-color:$darkest;
        height:75vh;
        width:100%;
        border:none;
    }
</style>

<textarea id="textarea-editor" />
