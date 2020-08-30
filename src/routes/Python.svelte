<script>
  import { appendScript, until, consoleMsg } from "../utils.js";
  import Spinner from "../components/Spinner.svelte";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  let outputConsole, canvas, editorTA, editor;
  let packageList = [];
  let packagesAreLoaded = false;
  let interpreterHasLoaded = false;
  let executing = false;
  window.languagePluginUrl = "https://pyodide-cdn2.iodide.io/v0.15.0/full/";
  appendScript(window.languagePluginUrl + "pyodide.js", setupMatplotlib);
  loadPackages(packageList);

  function setupMatplotlib() {
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
  }

  async function loadPackages(packages) {
    packagesAreLoaded = false;
    await until(() => window.languagePluginLoader);
    window.languagePluginLoader.then(async () => {
      interpreterHasLoaded = true;
      await pyodide.loadPackage(packages);
      pyodide.runPython(`import sys\nimport io\nsys.stdout = io.StringIO()`);
      packagesAreLoaded = true;
    });
  }

  async function runCode() {
    executing = true;
    loadPackages(matchImports(editor.getValue()));
    await until(() => packagesAreLoaded == true);
    try {
      pyodide.runPython(editor.getValue());
      let clr = "x = sys.stdout.getvalue()\nsys.stdout = io.StringIO()\nx";
      let stdout = pyodide.runPython(clr);
      outputConsole.innerHTML = consoleMsg + stdout + "</p>";
      outputConsole.scrollTop = outputConsole.scrollHeight;
    } catch (err) {
      let lines = err.message
        .split("\n")
        .slice(3)
        .join("\n");
      outputConsole.innerHTML = consoleMsg + lines + "</p>";
    }
    executing = false;
  }

  function matchImports(code) {
    let rx1 = /(?:from[ ]+(.+)[\.]+.+[ ]+)?import[ ]+(\S+)[ ]*/g;
    let rx2 = /(?:from[ ]+(.+)[\.]+.+[ ]+)?import[ ]+(.+)[\.]+.+[ ]*/g;
    let matches1 = code.matchAll(rx1);
    let matches2 = code.matchAll(rx2);
    let matches = [...matches1, ...matches2].map(a => (a[1] ? a[1] : a[2]));
    matches = matches.filter(el => !el.includes("."));
    matches = [...new Set(matches)];
    console.log("MATCHES: ", matches);
    return matches;
  }
</script>

<style lang="scss">

</style>

<NavBar showButtons={true} {runCode} />
<div class="row d-flex justify-content-center">
  <div bind:this={canvas} />
</div>
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-10 col-sm-6 mb-3">
    <Editor bind:editor language={'python'} />
  </div>
  <div class="col-10 col-sm-4 mx-auto">
    <div bind:this={outputConsole} class="console">
      {#if !interpreterHasLoaded || (interpreterHasLoaded && executing)}
        <div
          class="d-flex justify-content-center align-items-center"
          style="height:100%">
          <div>
            <Spinner />
            <p style="margin-top: 20px;margin-bottom: 20%;">
              {#if executing}
                Executing code (first run is slowest)
              {:else}Loading Python Interpreter{/if}
            </p>
          </div>
        </div>
      {/if}
    </div>
  </div>
  <div class="col-sm-1" />
</div>
