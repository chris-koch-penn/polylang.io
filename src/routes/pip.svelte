<script>
  import { onMount } from "svelte";
  import languagePluginLoader from "pyodide";
  import Spinner from "svelte-spinner";
  let pyConsole, canvas;
  let packageList = ["matplotlib"];
  let packagesAreLoaded = false;
  let interpreterHasLoaded = false;
  let code = "";
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
    let code2 = `from matplotlib import pyplot as plt\nplt.figure()\nplt.plot([1,2,3])\nplt.show()`;
    pyodide.runPython("print('Console output: ')");
    pyodide.runPython(code);
    pyodide.runPython(code2);
    let clr = "x = sys.stdout.getvalue()\nsys.stdout = io.StringIO()\nx";
    let stdout = pyodide.runPython(clr);
    pyConsole.innerText = stdout;
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
  :root {
    --sk-size: 60px;
    --sk-color: red;
  }
  .sk-grid {
    width: var(--sk-size);
    height: var(--sk-size);
    margin: auto;
  }
  .sk-grid-cube {
    width: 33.33%;
    height: 33.33%;
    background-color: var(--sk-color);
    float: left;
    animation: sk-grid 1.3s infinite ease-in-out;
  }
  .sk-grid-cube:nth-child(1) {
    animation-delay: 0.2s;
  }
  .sk-grid-cube:nth-child(2) {
    animation-delay: 0.3s;
  }
  .sk-grid-cube:nth-child(3) {
    animation-delay: 0.4s;
  }
  .sk-grid-cube:nth-child(4) {
    animation-delay: 0.1s;
  }
  .sk-grid-cube:nth-child(5) {
    animation-delay: 0.2s;
  }
  .sk-grid-cube:nth-child(6) {
    animation-delay: 0.3s;
  }
  .sk-grid-cube:nth-child(7) {
    animation-delay: 0s;
  }
  .sk-grid-cube:nth-child(8) {
    animation-delay: 0.1s;
  }
  .sk-grid-cube:nth-child(9) {
    animation-delay: 0.2s;
  }
  @keyframes sk-grid {
    0%,
    70%,
    100% {
      transform: scale3D(1, 1, 1);
    }
    35% {
      transform: scale3D(0, 0, 1);
    }
  }
</style>

<link
  src="https://cdnjs.cloudflare.com/ajax/libs/spinkit/2.0.1/spinkit.min.css" />

<main>
  {#if !interpreterHasLoaded}
    <div class="sk-grid">
      <div class="sk-grid-cube" />
      <div class="sk-grid-cube" />
      <div class="sk-grid-cube" />
      <div class="sk-grid-cube" />
      <div class="sk-grid-cube" />
      <div class="sk-grid-cube" />
      <div class="sk-grid-cube" />
      <div class="sk-grid-cube" />
      <div class="sk-grid-cube" />
    </div>
    <p>Loading Python Interpreter</p>
  {/if}
  <br />
  <textarea bind:value={code} />
  <br />
  <button on:click={runCode}>Run code</button>
  <div bind:this={canvas} />
  <div bind:this={pyConsole} />
</main>
