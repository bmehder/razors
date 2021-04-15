<script>
  import { onMount } from "svelte";
  import { navigate, link } from "svelte-routing";
  import user from "../stores/user";
  import { cartTotal } from "../stores/cart";

  let name = "";

  // stripe vars
  let cardElement, cardErrors, card, stripe, elements;

  $: isEmpty = !name;

  onMount(() => {
    if (!$user.jwt) {
      navigate("/");
    }
  });

  function handleSubmit() {
    console.log("form submitted");
  }
</script>

{#if $cartTotal > 0}
  <section class="form">
    <h2 class="section-title">checkout</h2>
    <form class="checkout-form" on:submit|preventDefault={handleSubmit}>
      <h3>order total : ${$cartTotal}</h3>
      <div class="form-control">
        <label for="name">your name</label>
        <input type="text" id="name" bind:value={name} />
      </div>

      <div class="stripe-input">
        <label for="card-elements">Credit or Debit card</label>
        <p class="stripe-info">
          Test using this credit card: <span>4242 4242 4242 4242</span>
          <br />
          enter any five digits for the zip code
          <br />
          enter any 3 digits for the CVC
        </p>
        <div id="card-element" bind:this={cardElement} />
        <div id="card-errors" bind:this={cardErrors} role="alert" />
      </div>

      {#if isEmpty}
        <p class="form-empty">Please fill out the name field</p>
      {/if}
      <button
        type="submit"
        class="btn btn-block btn-primary"
        disabled={isEmpty}
        class:disabled={isEmpty}>submit</button
      >
    </form>
  </section>
{:else}
  <div class="checkout-empty">
    <h2>your cart is empoty</h2>
    <a href="/products" use:link class="btn btn-primary">fill it</a>
  </div>
{/if}
