<script>
  import products from "../stores/products";
  import Loading from "../components/Loading.svelte";
  import { link } from "svelte-routing";
  import Product from "../components/Products/Product.svelte";
  import globalStore from "../stores/globalStore";
  import { addToCart } from "../stores/cart";

  $: product = $products.find((item) => item.id === parseInt(id));

  export let id;
  export let location;
</script>

<svelte:head>
  <title>{!product ? "Single Product" : product.title}</title>
</svelte:head>

{#if !product}
  <Loading />
{:else}
  <section class="single-product">
    <a class="btn btn-primary" href="/products" use:link>Back to products</a>
    <div class="single-product-container">
      <article class="single-product-image">
        <img src={product.image} alt={product.title} />
      </article>
      <article>
        <h1>{product.title}</h1>
        <h2>${product.price}</h2>
        <p>{product.description}</p>
        <button
          on:click={() => {
            addToCart(product);
            globalStore.toggleItem("cart", true);
          }}
          class="btn btn-primary btn-block">Add to Cart</button
        >
      </article>
    </div>
  </section>
{/if}
