<script>
  import { onMount } from "svelte";
  import TypeBox from "./components/TypeBox.svelte";

  export let typeChart;

  let currentType = typeChart[Math.floor(Math.random() * typeChart.length)];
  const types = Object.keys(currentType.damageTaken);

  let weakTypes = [];
  let weakAnswers = [];

  onMount(() => {
    typeChart.forEach(type => {
      weakTypes = [
        ...weakTypes,
        { name: type.name, selected: false, colour: type.colour }
      ];
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
    background-image: linear-gradient(
      to bottom right,
      rgb(178, 219, 214),
      rgb(240, 240, 204)
    );
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
    margin: 32px;
  }
  .active {
    border: 1px black solid;
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
    {#each weakTypes as type}
      <div
        class="type"
        class:active={type.selected}
        on:mousedown={handleTypeSelected}>
        <TypeBox {type} />
      </div>
    {/each}
  </div>

  <button class="submit" on:mousedown={submitAnswers}>Submit answers!</button>

  <div class="answers">
    {#each weakAnswers as answer}
      <p>{answer}</p>
    {/each}
  </div>
</main>
