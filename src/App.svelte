<script>
  import Router from "svelte-spa-router";
  import Python from "./routes/Python.svelte";
  import Home from "./routes/Home.svelte";

  const routes = {
    "/": Home,
    "/python": Python
  };
</script>

<style>
  :global(.CodeMirror) {
    text-align: left !important;
    height: auto;
    width: 100%;
  }
</style>

<Router {routes} />
