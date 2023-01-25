<script>
  import { onMount } from "svelte";
  import { tokenStore } from "../stores.js";
  import { querystring } from "svelte-spa-router";
  import { newSnippet, updateSnippet, getSnippet, until } from "../utils.js";
  import { push } from "svelte-spa-router";
  import Modal from "./Modal.svelte";
  import ClipboardJS from "clipboard";
  import Spinner from "../components/Spinner.svelte";
  export let showButtons = false;
  export let runCode;
  export let editor;
  export let lang = " ";
  let visible = false;
  let visible2 = false;
  let visible3 = false;
  let copyBtn;
  let copyMsg = "";
  tokenStore.useLocalStorage();
  $: id = getId($querystring);

  onMount(() => {
    loadSnippet();
    if (showButtons) initClipboard();
  });

  function initClipboard() {
    var clipboard = new ClipboardJS(copyBtn, {
      text: (trigger) => window.location.href,
    });

    clipboard.on("success", function (e) {
      copyMsg = "Link copied to clipboard!";
      visible2 = true;
      e.clearSelection();
    });

    clipboard.on("error", function (e) {
      copyMsg =
        "Could not copy link to clipboard. Please copy the link below:\n" +
        window.location.href;
      visible2 = true;
    });
  }

  function getId(q) {
    console.log(q);
    if (!q) return "";
    let id = q.slice(3);
    let last = id.length - 1;
    if (id[last] === "/") id = id.slice(0, last);
    return id;
  }

  async function save() {
    console.log(querystring, id);
    if (!id) {
      // Snippet does not exist, so create it.
      return uploadSnippet();
    } else {
      // Snippet exists, attempt to save if you are snippet owner.
      let res = await initiateSave();
      // Show modal if you are not snippet owner.
      visible = !res;
    }
  }

  async function initiateSave() {
    let tokens = tokenStore.get();
    if (tokens[id]) {
      let res = await updateSnippet(editor.getValue(), tokens[id]);
      console.log(res);
      return true;
    }
    return false;
  }

  async function share() {
    if (id) {
      // Snippet already exists, so copy url to clipboard and save snippet if you made it.
      initiateSave();
      copyBtn.click();
    } else {
      // Snippet does not exist, so create it and copy url to clipboard.
      let res = await uploadSnippet();
      copyBtn.click();
    }
  }

  async function uploadSnippet() {
    visible3 = true;
    let res = await newSnippet(editor.getValue(), lang);
    if (res && res.data) {
      let tokens = tokenStore.get();
      console.log(res.data);
      tokens[res.data.id] = res.data.token;
      console.log(tokens);
      tokenStore.set(tokens);
      window.location.href = window.location.href + "?id=" + res.data.id;
      visible3 = false;
      return "?id=" + res.data.id;
    } else {
      visible3 = false;
      return "";
    }
  }

  async function loadSnippet() {
    if (id.length) {
      let res = await getSnippet(id);
      console.log(res.data);
      await until(() => editor);
      if (res.data.code) editor.setValue(res.data.code);
    }
  }

  async function fork() {
    window.location.href = window.location.href.split("?")[0];
    await uploadSnippet();
    visible = false;
  }
</script>

<link
  href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
  rel="stylesheet"
/>

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
          id="run"
        >
          <i class="fa fa-code" aria-hidden="true" />
          &nbsp;Run
        </button>
      {:else}
        <button class="btn btn-md btn-outline-success" id="run">
          <i class="fa fa-code" aria-hidden="true" />
          &nbsp;Run
        </button>
      {/if}
      <button on:click={() => save()} class="btn btn-md btn-outline-light">
        <i class="fa fa-floppy-o" aria-hidden="true" />
        &nbsp;Save
      </button>
      <button on:click={() => share()} class="btn btn-md btn-outline-light">
        <i class="fa fa-paper-plane-o" aria-hidden="true" />
        &nbsp;Share
      </button>
    {/if}
  </div>
  <div class="d-flex align-items-center" style="margin:auto">
    <button
      on:click={() => push("/support")}
      class="btn btn-lg btn-outline-light"
    >
      Support
    </button>
  </div>
</div>

<Modal bind:visible class="col-1">
  <div class="my-modal p-5">
    <p>
      This playground can only be changed by it's creator. Would you like to
      fork it?
    </p>
    <div class="d-flex flex-row align-center justify-content-center">
      <button class="my-button btn btn-lg mx-3 px-5" on:click={() => fork()}>
        Yes
      </button>
      <button
        class="btn btn-light btn-lg mx-3 px-5"
        on:click={() => (visible = false)}
      >
        No
      </button>
    </div>
  </div>
</Modal>

<Modal bind:visible={visible2} class="col-1">
  <div class="my-modal p-5 d-flex flex-column justify-content-center">
    <p>{copyMsg}</p>
    <button
      class="my-button btn btn-lg px-5"
      on:click={() => (visible2 = false)}
    >
      Ok
    </button>
  </div>
</Modal>

<Modal bind:visible={visible3} class="col-1">
  <div class="my-modal p-5 d-flex flex-column justify-content-center">
    <Spinner />
    Saving snippet
  </div>
</Modal>

<button class="invisible" on:click={() => null} bind:this={copyBtn} />

<!-- svelte-ignore css-unused-selector -->
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

  .toplevel {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .my-modal {
    background-color: lightslategrey;
    max-width: 600px;
    p {
      font-size: 22px;
      text-align: center;
    }
    .my-button {
      background-color: black;
      color: white;
    }
  }
</style>
