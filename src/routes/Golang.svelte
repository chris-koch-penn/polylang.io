<script>
  let initialCode =
    "package main\nfunc main() {\nprintln('Hello, WebAssembly playground!')\n}";
</script>

<svelte:head>
  <!-- <link rel="stylesheet" href="style.css"> -->
  <script src="/golang/wasm_exec.js">

  </script>
  <script
    src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js">

  </script>
  <script
    src="https://cdn.jsdelivr.net/npm/lz-string@1.4.4/libs/lz-string.min.js">

  </script>
  <script src="/golang/jquery-linedtextarea.js">

  </script>
  <script src="/golang/playground.js">

  </script>
  <script src="/golang/golang_main.js">

  </script>
</svelte:head>

<div id="banner">
  <div id="controls">
    <input type="button" value="Loading..." id="run" disabled />
    <input
      type="button"
      value="Format"
      id="fmt"
      style="display:none;"
      disabled />
  </div>
</div>
<div id="wrap">
  <textarea
    itemprop="description"
    id="code"
    name="code"
    autocorrect="off"
    autocomplete="off"
    autocapitalize="off"
    spellcheck="false">
    {initialCode}
  </textarea>
</div>
<div id="output" />
