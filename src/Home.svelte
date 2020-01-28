<script>
  import { blur } from "svelte/transition";
</script>

<style>
  main {
    background-image: linear-gradient(
      to bottom right,
      rgb(178, 219, 214),
      rgb(207, 161, 132)
    );
  }

  .container {
    text-align: center;
    padding: 1em;
    max-width: 960px;
    margin: 0 auto;
    min-height: 960px;
  }
</style>

<main transition:blur>
  <div class="container">
    <h1>Pokeskill Home</h1>
  </div>
</main>
