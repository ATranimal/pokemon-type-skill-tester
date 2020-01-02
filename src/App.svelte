<script>
  import { onMount } from "svelte";

  export let typeChart;

  let currentType = typeChart[Math.floor(Math.random() * typeChart.length)];
  const types = Object.keys(currentType.damageTaken);

  let weakTypes = [];
  let weakAnswers = [];

  onMount(() => {
    typeChart.forEach(type => {
      weakTypes = [...weakTypes, { name: type.name, selected: false }];
    });
  });

  const handleTypeSelected = e => {
    const newTypeName = e.target.innerText;

    const indexOfSelectedType = weakTypes.findIndex(type => {
      return type.name === newTypeName;
    });

    weakTypes[indexOfSelectedType].selected = !weakTypes[indexOfSelectedType]
      .selected;
  };

  const submitAnswers = () => {
    if (weakAnswers.length === 0)
      types.forEach(type => {
        if (currentType.damageTaken[type] === 1) {
          weakAnswers = [...weakAnswers, type];
        }
      });
  };
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 960px;
    margin: 0 auto;
  }

  .type-selector {
    display: flex;
    justify-content: space-between;
  }

  .active {
    border: 1px black solid;
  }
</style>

<main>
  <h1>Pokemon Type Skill Tester</h1>
  <h3>What types are {currentType.name} pokemon weak to?</h3>

  <div class="type-selector">
    {#each weakTypes as type}
      <p class:active={type.selected} on:mousedown={handleTypeSelected}>
        {type.name}
      </p>
    {/each}
  </div>

  <button on:mousedown={submitAnswers}>Submit answers!</button>

  <div class="answers">
    {#each weakAnswers as answer}
      <p>{answer}</p>
    {/each}
  </div>
</main>
