<script>
  import languagePluginLoader from "pyodide";
  import Spinner from "../components/Spinner.svelte";
  import NavBar from "../components/NavBar.svelte";
  let pyConsole, canvas, editorTA, editor;
  let packageList = [];
  let packagesAreLoaded = false;
  let interpreterHasLoaded = false;
  let code = "";
  let numScriptsLoaded = 0;
  $: loadPackages(packageList);

  window.iodide = {
    output: {
      // This ensures matplotlib will be plotted correctly.
      element: tagName => {
        let elem = document.createElement(tagName);
        canvas.innerHTML = "";
        canvas.appendChild(elem);
        return elem;
      }
    }
  };

  function until(conditionFunction) {
    const poll = resolve => {
      if (conditionFunction()) resolve();
      else setTimeout(_ => poll(resolve), 75);
    };

    return new Promise(poll);
  }

  async function loadPackages() {
    packagesAreLoaded = false;
    await languagePluginLoader;
    interpreterHasLoaded = true;
    await pyodide.loadPackage(packageList);
    pyodide.runPython(`import sys\nimport io\nsys.stdout = io.StringIO()`);
    packagesAreLoaded = true;
  }

  async function runCode() {
    matchImports(editor.getValue());
    await until(() => packagesAreLoaded == true);
    let consoleMsg = "<xmp style='white-space: break-spaces;'>Console output: \n";
    try {
      pyodide.runPython(editor.getValue());
      let clr = "x = sys.stdout.getvalue()\nsys.stdout = io.StringIO()\nx";
      let stdout = pyodide.runPython(clr);
      pyConsole.innerHTML = consoleMsg + stdout + "</xmp>";
    } catch(err) {
      let lines = err.message.split("\n").slice(3).join("\n");
      pyConsole.innerHTML = consoleMsg + lines + "</xmp>";
    }
  }

  function matchImports(imports) {
    let rx = /(?:from[ ]+(.+)[\.]+.+[ ]+)?import[ ]+(\S+)[ ]*/g;
    let matches = imports.matchAll(rx);
    matches = [...matches].map(a => (a[1] ? a[1] : a[2]));
    matches = [...new Set(matches)];
  }

  function makeEditor() {
    editor = window.CodeMirror.fromTextArea(editorTA, {
      theme: "darcula",
      mode: { name: "python", version: 3, singleLineStringErrors: false },
      lineNumbers: true,
      indentUnit: 4,
      matchBrackets: true
    });
    editor.setSize("100%", "100%");
  }

  function appendPythonHighlightScript() {
    let el = document.createElement("script");
    document.head.appendChild(el);
    el.onload = makeEditor;
    el.src =
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/mode/python/python.min.js";
  }
</script>

<style lang="scss">
  @import "../theme.scss";

  .editor-row {
    height: 75vh;
  }
  .console {
    background-color: lightslategrey;
    height: 100%;
    padding: 8px 20px;
  }

  textarea {
    background-color:$darkest;
    height:75vh;
    width:100%;
    border:none;
  }
</style>

<svelte:head>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/codemirror.min.js"
    on:load={() => appendPythonHighlightScript()}>

  </script>
</svelte:head>

<NavBar showButtons={true} runCode={runCode} />
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-6">
    <textarea bind:value={code} bind:this={editorTA} />
  </div>
  <div class="col-4">
    <div bind:this={pyConsole} class="console">
      {#if !interpreterHasLoaded}
        <div
          class="d-flex justify-content-center align-items-center"
          style="height:100%">
          <div>
            <Spinner />
            <p style="margin-top: 20px;margin-bottom: 20%;">
              Loading Python Interpreter
            </p>
          </div>
        </div>
      {/if}
    </div>
    <div bind:this={canvas} />
  </div>
  <div class="col-1" />
</div>