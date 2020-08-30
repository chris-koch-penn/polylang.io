<script>
  import { push } from "svelte-spa-router";
  export let showButtons = false;
  export let runCode;
</script>

<style lang="scss">
  @import "../theme.scss";

  .button-row {
    padding: 15px 0px;
    margin-bottom: 20px;
    background-color: $darkest;
  }
  button {
    border: none;
    font-size: 18px;
  }
  .btn:focus,
  .btn:active {
    outline: none !important;
    box-shadow: none;
  }
  .polylang-logo {
    font-size: 1.75rem;
    font-family: "montserrat";
    color: $main-color !important;
    background-color: transparent;
    font-weight: bold;
    text-decoration: none !important;
    text-align: center;
    cursor: pointer;
  }
</style>

<link
  href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
  rel="stylesheet" />

<div class="row button-row px-5">
  <div class="col-6 col-sm-4 col-md-3 col-lg-2">
    <a class="polylang-logo" href="/">polylang.io</a>
  </div>

  <div class="d-flex align-items-center col">
    {#if showButtons}
      {#if runCode}
        <button
          on:click={runCode}
          class="btn btn-md btn-outline-success"
          id="run">
          <i class="fa fa-code" aria-hidden="true" />
          &nbsp;Run
        </button>
      {:else}
        <button class="btn btn-md btn-outline-success" id="run">
          <i class="fa fa-code" aria-hidden="true" />
          &nbsp;Run
        </button>
      {/if}
      <button on:click={runCode} class="btn btn-md btn-outline-light">
        <i class="fa fa-floppy-o" aria-hidden="true" />
        &nbsp;Save
      </button>
      <button on:click={runCode} class="btn btn-md btn-outline-light">
        <i class="fa fa-paper-plane-o" aria-hidden="true" />
        &nbsp;Share
      </button>
    {/if}
  </div>
  <div class="d-flex align-items-center" style="margin:auto">
    <button
      on:click={() => push('/support')}
      class="btn btn-lg btn-outline-light">
      Support
    </button>
  </div>
</div>
