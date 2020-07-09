<script>
  // import languagePluginLoader from "pyodide";
  import Spinner from "../components/spinner.svelte";
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
    pyodide.runPython(editor.getValue());
    let clr = "x = sys.stdout.getvalue()\nsys.stdout = io.StringIO()\nx";
    let stdout = pyodide.runPython(clr);
    pyConsole.innerText = "Console output: \n" + stdout;
  }

  function matchImports(imports) {
    let rx = /(?:from[ ]+(.+)[\.]+.+[ ]+)?import[ ]+(\S+)[ ]*/g;
    let matches = imports.matchAll(rx);
    matches = [...matches].map(a => (a[1] ? a[1] : a[2]));
    matches = [...new Set(matches)];
    alert(matches);
  }

  function makeEditor() {
    numScriptsLoaded++;
    if (numScriptsLoaded == 2) {
      editor = window.CodeMirror.fromTextArea(editorTA, {
        theme: "darcula",
        mode: { name: "python", version: 3, singleLineStringErrors: false },
        lineNumbers: true,
        indentUnit: 4,
        matchBrackets: true
      });
      editor.setSize("100%", "100%");
    }
  }
</script>

<style>
  .editor-row {
    height: 75vh;
  }
  .button-row {
    padding: 15px 0px;
    margin-bottom: 20px;
    background-color: #2b2b2b;
  }
  button {
    border: none;
    font-size: 18px;
  }
  .btn:focus,
  .btn:active {
    outline: none !important;
    box-shadow: none;
  }
  .polylang-logo {
    font-family: "montserrat";
    color: #cfbff7;
    background-color: transparent;
    font-weight: bold;
    padding-top: 3px;
    padding-left: 20px;
    line-height: 1;
    margin: 0px;
  }
  .console {
    background-color: lightslategrey;
    height: 100%;
    padding: 8px 20px;
  }
</style>

<svelte:head>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/codemirror.min.js"
    on:load={makeEditor}>

  </script>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/mode/python/python.min.js"
    on:load={makeEditor}>

  </script>
</svelte:head>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/codemirror.min.css" />
<link
  href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
  rel="stylesheet" />
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/theme/darcula.min.css" />

<div class="row button-row">
  <div class="col-2">
    <h3 class="polylang-logo">polylang.io</h3>
  </div>
  <div class="col">
    <button on:click={runCode} class="btn btn-md btn-outline-success">
      <i class="fa fa-code" aria-hidden="true" />
      &nbsp;Run
    </button>
    <button on:click={runCode} class="btn btn-md btn-outline-light">
      <i class="fa fa-floppy-o" aria-hidden="true" />
      &nbsp;Save
    </button>
    <button on:click={runCode} class="btn btn-md btn-outline-light">
      <i class="fa fa-paper-plane-o" aria-hidden="true" />
      &nbsp;Share
    </button>
  </div>
  <div class="col-2" />
  <div class="col-2" style="margin:auto">
    <button on:click={runCode} class="btn btn-lg btn-outline-light">
      Support
    </button>
  </div>
</div>
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
