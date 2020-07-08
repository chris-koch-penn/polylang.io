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
    await until(() => packagesAreLoaded == true);
    pyodide.runPython("print('Console output: ')");
    pyodide.runPython(editor.getValue());
    let clr = "x = sys.stdout.getvalue()\nsys.stdout = io.StringIO()\nx";
    let stdout = pyodide.runPython(clr);
    pyConsole.innerText = stdout;
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
    }
  }
</script>

<style>
  .button-row {
    padding: 15px 0px;
    margin-bottom: 20px;
    background-color: #2b2b2b;
  }
  button {
    width: 100%;
    word-break: break-all;
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
    border: none;
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
  <!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js">

  </script>  <script
    src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" ✂prettier:content✂="CgogIA==" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=">{}</script>  <script
    src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" ✂prettier:content✂="CgogIA==" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=" ✂prettier:content✂="e30=">{}</script> -->
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
    <button class="polylang-logo">polylang.io</button>
  </div>
  <div class="col-1">
    <button on:click={runCode} class="btn btn-sm btn-success">Run</button>
  </div>
  <div class="col-1">
    <button on:click={runCode} class="btn btn-sm btn-light">Save</button>
  </div>
  <div class="col-1">
    <button on:click={runCode} class="btn btn-sm btn-light">Share</button>
  </div>
  <div class="col-2" />
  <div class="col-2" style="margin:auto">
    <button on:click={runCode} class="btn btn-sm btn-light">Support</button>
  </div>
</div>
<div class="row">
  <div class="col-1" />
  <div class="col-6">
    <textarea bind:value={code} bind:this={editorTA} />
  </div>
  <div class="col-5">
    <div bind:this={pyConsole}>
      {#if !interpreterHasLoaded}
        <Spinner />
        <p style="text-align:center;">Loading Python Interpreter</p>
      {/if}
    </div>
    <div bind:this={canvas} />
  </div>
</div>
