<script>
  import { onMount } from "svelte";
  import TypeBox from "./components/TypeBox.svelte";

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

  const handleWeakTypeSelected = e => {
    if (!submitted) {
      const newTypeName = e.target.innerText;

      const indexOfSelectedType = weakChoices.findIndex(type => {
        return type.name === newTypeName;
      });

      weakChoices[indexOfSelectedType].selected = !weakChoices[
        indexOfSelectedType
      ].selected;
    }
  };

  const handleResistTypeSelected = e => {
    if (!submitted) {
      const newTypeName = e.target.innerText;

      const indexOfSelectedType = resistChoices.findIndex(type => {
        return type.name === newTypeName;
      });

      resistChoices[indexOfSelectedType].selected = !resistChoices[
        indexOfSelectedType
      ].selected;
    }
  };

  const submitAnswers = () => {
    submitted = true;

    // TODO: Colour the answers so its accurate
    if (weakAnswers.length === 0)
      types.forEach(type => {
        if (currentType.damageTaken[type] === 1) {
          weakAnswers = [...weakAnswers, type];
        }
      });

    if (resistAnswers.length === 0)
      types.forEach(type => {
        if (
          currentType.damageTaken[type] === 2 ||
          currentType.damageTaken[type] === 3
        ) {
          resistAnswers = [...resistAnswers, type];
        }
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
    text-align: center;
    padding: 1em;
    max-width: 960px;
    margin: 0 auto;
    background-image: linear-gradient(
      to bottom right,
      rgb(178, 219, 214),
      rgb(240, 240, 204)
    );
  }

  button {
    border-radius: 2px;
  }

  .type-selector {
    padding: 0 240px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .type {
    margin: 0px;
  }

  .submit {
    margin: 8px 32px;
  }

  .active {
    border: 1px black solid;
  }

  .answer-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .answer-row p {
    margin: 16px 32px;
  }

  @media (max-width: 960px) {
    .type-selector {
      padding: 0px;
    }
  }
</style>

<main>
  <h1>Pokemon Type Skill Tester</h1>
  <h3>
    What types are
    <TypeBox type={currentType} />
    pokemon weak to?
  </h3>

  <div class="type-selector">
    {#each weakChoices as type}
      <div
        class="type"
        class:active={type.selected}
        on:mousedown={handleWeakTypeSelected}>
        <TypeBox {type} />
      </div>
    {/each}
  </div>

  <h3>What types do they resist / are they immune to?</h3>

  <div class="type-selector">
    {#each resistChoices as type}
      <div
        class="type"
        class:active={type.selected}
        on:mousedown={handleResistTypeSelected}>
        <TypeBox {type} />
      </div>
    {/each}
  </div>

  <button class="submit" on:mousedown={submitAnswers}>Submit answers!</button>

  {#if submitted}
    <div class="answers">
      <h3>The answers for weak are:</h3>
      <div class="answer-row">
        {#each weakAnswers as answer}
          <p>{answer}</p>
        {/each}
      </div>
      <h3>The answers for resist / immune are:</h3>
      <div class="answer-row">
        {#each resistAnswers as answer}
          <p>{answer}</p>
        {/each}
      </div>
    </div>
  {/if}

  <div class="reset">
    <button on:mouseup={resetGame}>Try Again?</button>
  </div>
</main>
