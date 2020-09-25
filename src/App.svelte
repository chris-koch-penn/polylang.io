<script>
  import Router from "svelte-spa-router";
  import Home from "./routes/Home.svelte";
  import Python34 from "./routes/Python34.svelte";
  import Python from "./routes/Python.svelte";
  import Ruby from "./routes/Ruby.svelte";
  import Golang from "./routes/Golang.svelte";
  import CPP from "./routes/CPP.svelte";
  import Julia from "./routes/Julia.svelte";
  import Perl from "./routes/Perl.svelte";
  import OCaml from "./routes/OCaml.svelte";
  import PHP from "./routes/PHP.svelte";
  import Support from "./routes/Support.svelte";

  const routes = {
    "/": Home,
    "/python": Python,
    "/python34": Python34,
    "/ruby": Ruby,
    "/golang": Golang,
    "/cpp": CPP,
    "/julia": Julia,
    "/perl": Perl,
    "/ocaml": OCaml,
    "/php": PHP,
    "/support": Support
  };
</script>

<style lang="scss">
  @import "./theme.scss";

  :global(.CodeMirror) {
    text-align: left !important;
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
    font-size: 16px;
    height: 45vh !important;
    @media (min-width: 576px) {
      height: 75vh !important;
    }
  }

  :global(.editor-row) {
    height: 75vh !important;
  }
  :global(.console) {
    background-color: lightslategrey;
    height: 100%;
    padding: 8px 20px;
    height: 45vh !important;
    @media (min-width: 576px) {
      height: 75vh !important;
    }
    overflow-y: scroll;
    overflow-x: hidden;
  }
  :global(.polylang-stdout),
  :global(.stderr),
  :global(.system) {
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    font-size: 15px;
    color: white !important;
    white-space: break-spaces;
    word-wrap: break-word;
  }
</style>

<Router {routes} />
