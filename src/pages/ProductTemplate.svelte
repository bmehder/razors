<script>
  import products from "../stores/defaultProducts";
  import Loading from "../components/Loading.svelte";
  import { link } from "svelte-routing";
  import Product from "../components/Products/Product.svelte";

  $: product = $products.find((item) => item.id === parseInt(id));

  export let id;
  export let location;
</script>

<svelte:head>
  <title>{!product ? "Single Product" : product.title.to}</title>
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
            console.log("add to cart");
          }}
          class="btn btn-primary btn-block">Add to Cart</button
        >
      </article>
    </div>
  </section>
{/if}
