<script>
  import { appendScript, until, consoleMsg } from "../utils.js";
  import Spinner from "../components/Spinner.svelte";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  let outputConsole, editor;
  let interpreterHasLoaded = false;
  let executing = false;
  let pyodideReadyPromise = null;
  let stdout = "";
  window.languagePluginUrl = "https://cdn.jsdelivr.net/pyodide/v0.22.0/full/";
  appendScript(window.languagePluginUrl + "pyodide.js", init);

  function addToOutput(stdout) {
    outputConsole.innerHTML = consoleMsg + stdout + "</p>";
    outputConsole.scrollTop = outputConsole.scrollHeight;
  }

  // Init Pyodide
  async function init() {
    pyodideReadyPromise = await loadPyodide();
    interpreterHasLoaded = true;
  }

  async function runCode() {
    cleanUp();
    executing = true;
    let pyodide = await pyodideReadyPromise;
    pyodide.setStdout({
      batched: (data) => {
        stdout = stdout + data + "\n";
        console.log("STDOUT HANDLER: ", stdout);
      },
    });
    try {
      await pyodide.loadPackagesFromImports(editor.getValue());
      await loadMatplotlibIfNecessary();
      // await loadPackages(matchImports(editor.getValue())).catch();
      let output = await pyodide.runPython(editor.getValue());
      // stdout ? addToOutput(stdout) : addToOutput(output);
      addToOutput(stdout ? stdout : outpout);
      // stdout = stdout + output;
      // addToOutput(stdout);
    } catch (err) {
      console.log("ORIGINAL ERRR: ", err);
      err = err.message.split("\n").slice(5).join("\n");
      console.log("NEW ERRR: ", err);
      addToOutput(err);
    }
    executing = false;
  }

  async function loadMatplotlibIfNecessary() {
    let pyodide = await pyodideReadyPromise;
    // await pyodide.loadPackage(["micropip", ...packages]);
    // let promises = packages.map((pk) => pyodide.pyimport(pk));
    // await Promise.all(promises);
    // await pyodide.pyimport(packages);
    // await micropip.install(packages);
    // if (packages.includes("matplotlib")) {
    if (editor.getValue().includes("matplotlib")) {
      await pyodide.runPythonAsync(
        'import matplotlib \nmatplotlib.use("module://matplotlib_pyodide.html5_canvas_backend")'
      );
    }
  }

  function matchImports(code) {
    let rx1 = /((?:(?!#).)?:from[ ]+(.+)[ ]+)?import[ ]+(\S+)[ ]*/gm;
    let rx2 =
      /((?:(?!#).)?:from[ ]+(.+)[\.]+.+[ ]+)?import[ ]+(.+)[\.]+.+[ ]*/gm;
    // let rx1 = /(?:from[ ]+(.+)[ ]+)?import[ ]+(\S+)[ ]*/g;
    // let rx2 = /(?:from[ ]+(.+)[\.]+.+[ ]+)?import[ ]+(.+)[\.]+.+[ ]*/g;
    let matches1 = code.matchAll(rx1);
    let matches2 = code.matchAll(rx2);
    console.log(...matches1, ...matches2);
    let matches = [...matches1, ...matches2].map((a) => (a[1] ? a[1] : a[2]));
    console.log(matches);
    matches = matches.map((el) => el.split(".")[0]);
    matches = [...new Set(matches)];
    console.log("MATCHES: ", matches);
    return matches;
  }

  function cleanUp() {
    let oldPlots = document.querySelectorAll('[id ^= "matplotlib"]');
    oldPlots.forEach((el) => el.remove());
    stdout = "";
  }
</script>

<NavBar showButtons={true} {runCode} lang="python" {editor} />
<!-- <div class="row d-flex justify-content-center">
  <div bind:this={canvas} />
</div> -->
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-10 col-sm-6 mb-3">
    <Editor bind:editor language={"python"} />
  </div>
  <div class="col-10 col-sm-4 mx-auto">
    <div bind:this={outputConsole} class="console">
      {#if !interpreterHasLoaded || (interpreterHasLoaded && executing)}
        <div
          class="d-flex justify-content-center align-items-center"
          style="height:100%"
        >
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
<!-- 
<style lang="scss">
</style> -->
