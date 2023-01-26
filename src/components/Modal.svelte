<script>
  import { fly, fade } from "svelte/transition";
  export let visible = false;
  export let stylesheet = "";
  export const open = () => (visible = true);
  export const close = () => (visible = false);
  let background;
  const handleOuterClick = (event) => {
    if (event.target === background) {
      event.preventDefault();
      close();
    }
  };

  function handleEscape(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  }
</script>

<svelte:window on:keydown={handleEscape} />

{#if visible}
  <div
    class="backdrop"
    transition:fade={{ duration: 300 }}
    on:click={handleOuterClick}
    on:keypress={() => {}}
    bind:this={background}
  >
    <div
      transition:fly={{ y: -100, duration: 300 }}
      class="my-modal"
      style={stylesheet}
    >
      <slot />
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    background: rgb(0, 0, 0, 0.5);
    z-index: 10;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .my-modal {
    overflow: scroll;
    z-index: 10;
    background: white;
    box-shadow: 0px 0px 10px rgb(0.5, 0.5, 0.5, 0.5);
    border-radius: 0.5rem;
  }
</style>
