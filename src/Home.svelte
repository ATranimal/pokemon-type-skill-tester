<script>
  import { blur } from "svelte/transition";
  import { Link } from "svelte-routing";
</script>

<style>
  main {
    background-image: linear-gradient(
      to bottom right,
      rgb(178, 219, 214),
      rgb(207, 161, 132)
    );
    height: 100%;
  }

  .container {
    text-align: center;
    padding: 1em;
    max-width: 960px;
    margin: 0 auto;
    min-height: 960px;
  }

  .information {
    margin: 0 auto;
    max-width: 640px;
  }
</style>

<main transition:blur>
  <div class="container">
    <h1>Pokeskill Trainer</h1>

    <div class="information">
      <p>
        How well do you know your Pokemon type weaknesses? Take this quick quiz
        to see your accuracy and speed in 10 random type selections
      </p>

      <button>

        <Link to="/type">Start!</Link>
      </button>
    </div>
  </div>
</main>
