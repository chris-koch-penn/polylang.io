<script>
  import { appendScript, consoleMsg } from "../utils.js";
  import { onMount } from "svelte";
  import NavBar from "../components/NavBar.svelte";
  import Editor from "../components/Editor.svelte";
  appendScript("/ruby/ruby_main.js", initRuby);
  let outputConsole, editor;
  let runCode = () => {};

  function initRuby() {
    runCode = () => {
      let rubyCode = editor.getValue();
      let ascii_array = [];
      for (var i = 0; i < rubyCode.length; i++)
        ascii_array.push(rubyCode[i].charCodeAt(0));

      // Allocate Int32Array and fill with ascii data
      const typedArray = new Int32Array(ascii_array.length);
      for (let i = 0; i < ascii_array.length; i++) {
        typedArray[i] = ascii_array[i];
      }

      var len = typedArray.length;
      var bytes_per_element = typedArray.BYTES_PER_ELEMENT; // 4 bytes each element

      // Allocate memory on wasm heap.
      let ptr = window.RUBY._malloc(
        typedArray.length * typedArray.BYTES_PER_ELEMENT
      );
      window.RUBY.HEAP32.set(typedArray, ptr / typedArray.BYTES_PER_ELEMENT);

      //call wasm func
      var result = window.RUBY._ruby_exec(ptr, typedArray.length);
      let output = window.RUBY_STDOUT
        ? window.RUBY_STDOUT
        : 'No output. Try writing something valid to "puts".';
      outputConsole.innerHTML = consoleMsg + output + "</xmp>";
      window.RUBY_STDOUT = "";
    };
  }
</script>

<!-- <svelte:head>
  <script src="/ruby/ruby_main.js" on:load={() => initRuby()}>

  </script></svelte:head> -->

<NavBar showButtons={true} {runCode} />
<div class="row editor-row">
  <div class="col-1" />
  <div class="col-6">
    <Editor bind:editor language={'python'} />
  </div>
  <div class="col-4">
    <div bind:this={outputConsole} class="console" />
  </div>
  <div class="col-1" />
</div>
