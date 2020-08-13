<script>
  import Router from "svelte-spa-router";
  import Python from "./routes/Python.svelte";
  import Home from "./routes/Home.svelte";

  const routes = {
    "/": Home,
    "/python": Python
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
  }
</style>

<Router {routes} />
