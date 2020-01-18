<script>
  import TypeBox from "./TypeBox.svelte";

  export let choices;
  export let submitted;

  const handleTypeSelected = e => {
    if (!submitted) {
      const newTypeName = e.target.innerText;

      const indexOfSelectedType = choices.findIndex(type => {
        return type.name === newTypeName;
      });

      choices[indexOfSelectedType].selected = !choices[indexOfSelectedType]
        .selected;
    }
  };
</script>

<style>
  .active {
    border: 1px rgb(5, 133, 238) solid;
    border-radius: 5px;
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

  @media (max-width: 960px) {
    .type-selector {
      padding: 0px;
    }
  }
</style>

<div class="type-selector">
  {#each choices as type}
    <div
      class="type"
      class:active={type.selected}
      on:mousedown={handleTypeSelected}>
      <TypeBox {type} />
    </div>
  {/each}
</div>
