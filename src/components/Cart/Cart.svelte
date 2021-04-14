<script>
  import globalStore from "../../stores/globalStore";
  import { fly, fade, blur } from "svelte/transition";
  import { link } from "svelte-routing";
  import ItemsList from "./ItemsList.svelte";

  let user = false;
</script>

<div class="cart-overlay" tansition:blur>
  <div class="cart-container" transition:fly={{ x: 100 }}>
    <div class="cart" transition:fade={{ delay: 400 }}>
      <!-- Cart header -->
      <div class="cart-header">
        <button
          class="btn-close"
          on:click={() => globalStore.toggleItem("cart", false)}
        >
          <i class="fas fa-window-close" />
        </button>
        <h2 class="cart-title">your bag</h2>
        <span />
      </div>
      <!-- End of cart header -->
      <!-- Cart Items -->
      <ItemsList />
      <!-- End of Cart Items -->

      <!-- Cart Footer -->
      <div class="cart-footer">
        {#if user}
          <a
            href="/checkout"
            use:link
            on:click={() => globalStore.toggleItem("cart", false)}
            class="btn btn-primary btn-block">Checkout</a
          >
        {:else}
          <p class="cart-login">
            in order to checkout, please <a
              href="/login"
              use:link
              on:click={() => globalStore.toggleItem("cart", false)}>Login</a
            >
          </p>
        {/if}
      </div>
      <!-- End of Cart Footer -->
    </div>
  </div>
</div>
