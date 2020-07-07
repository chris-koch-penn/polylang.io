<script>
  import Router from "svelte-spa-router";
  import Pip from "./routes/pip.svelte";

  const routes = {
    "/": Pip
  };
</script>

<link
  href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
  rel="stylesheet" />

<main>
  <Router {routes} />
</main>
