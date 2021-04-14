<script>
  import links from "../../constants/links.js";
  import { link } from "svelte-routing";
  import globalStore from "../../stores/globalStore.js";
  import { fly, fade } from "svelte/transition";
</script>

<div class="sidebar-container" transition:fly={{ x: -1000 }}>
  <div class="sidebar" out:fade={{ delay: 400 }}>
    <div class="sidebar-header">
      <button
        class="btn-close"
        on:click={() => {
          globalStore.toggleItem("sidebar", false);
        }}
      >
        <i class="fas fa-window-close" />
      </button>
    </div>
    <img class="logo sidebar-logo" src="/assets/images/logo.svg" alt="logo" />
    <ul class="sidebar-links">
      {#each links as sideLink}
        <li>
          <a
            href={sideLink.url}
            use:link
            on:click={() => globalStore.toggleItem("sidebar", false)}
            >{sideLink.text}</a
          >
        </li>
      {/each}
    </ul>
  </div>
</div>
