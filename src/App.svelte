<script>
  import { onMount } from "svelte";
  import { blur, fade } from "svelte/transition";

  import TypeBox from "./components/TypeBox.svelte";
  import TypeSelector from "./components/TypeSelector.svelte";
  import SubmitAnswers from "./components/SubmitAnswers.svelte";
  import Timer from "./components/Timer.svelte";

  export let typeChart;

  let currentType = typeChart[Math.floor(Math.random() * typeChart.length)];
  const types = Object.keys(currentType.damageTaken);

  let weakChoices = [];
  let weakAnswers = [];

  let resistChoices = [];
  let resistAnswers = [];

  let submitted = false;

  onMount(() => {
    resetWeakChoices();
    resetResistChoices();
  });

  const resetWeakChoices = () => {
    weakChoices = [];
    typeChart.forEach(type => {
      weakChoices = [
        ...weakChoices,
        { name: type.name, selected: false, colour: type.colour }
      ];
    });
  };

  const resetResistChoices = () => {
    resistChoices = [];
    typeChart.forEach(type => {
      resistChoices = [
        ...resistChoices,
        { name: type.name, selected: false, colour: type.colour }
      ];
    });
  };

  const resetGame = () => {
    submitted = false;
    currentType = typeChart[Math.floor(Math.random() * typeChart.length)];
    resetWeakChoices();
    resetResistChoices();
    weakAnswers = [];
    resistAnswers = [];

    window.scrollTo(0, 0);
  };
</script>

<style>
  main {
    background-image: linear-gradient(
      to bottom right,
      rgb(178, 219, 214),
      rgb(240, 240, 204)
    );
  }

  .container {
    text-align: center;
    padding: 1em;
    max-width: 960px;
    margin: 0 auto;
  }

  .current-type-box {
    display: flex;
    justify-content: center;
  }

  button {
    border-radius: 2px;
  }

  .answer-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .answer-row p {
    margin: 16px 32px;
  }

  .correct {
    color: rgb(15, 97, 15);
  }

  .incorrect {
    color: rgb(124, 13, 13);
  }
</style>

<main transition:blur>
  <div class="container">
    <h1 transition:fade={{ delay: 400 }}>Pokemon Type Skill Tester</h1>

    <div class="current-type-box" transition:fade={{ delay: 400 }}>
      <h3>
        What types are
        <TypeBox type={currentType} />
        pokemon weak to?
      </h3>
    </div>

    <div transition:fade={{ delay: 400 }}>
      <TypeSelector {submitted} bind:choices={weakChoices} />
    </div>

    <h3 transition:fade={{ delay: 400 }}>
      What types do they resist / are they immune to?
    </h3>

    <div transition:fade={{ delay: 400 }}>
      <TypeSelector {submitted} bind:choices={resistChoices} />
    </div>

    <SubmitAnswers
      bind:submitted
      bind:weakAnswers
      bind:resistAnswers
      {types}
      {currentType}
      {weakChoices}
      {resistChoices} />

    {#if submitted}
      <div class="answers">
        <h3>The answers for weak are:</h3>
        <div class="answer-row">
          {#each weakAnswers as answer}
            <p class={answer.correct}>{answer.type}</p>
          {/each}
        </div>
        <h3>The answers for resist / immune are:</h3>
        <div class="answer-row">
          {#each resistAnswers as answer}
            <p class={answer.correct}>{answer.type}</p>
          {/each}
        </div>
      </div>
      <div class="reset">
        <button on:mouseup={resetGame}>Try Again?</button>
      </div>
    {/if}

    <div class="timer-container">
      <Timer {submitted} />
    </div>
  </div>
</main>
