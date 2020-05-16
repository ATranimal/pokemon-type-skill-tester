<script>
  import TypeBox from "./TypeBox.svelte";

  export let choices;
  export let answers;
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

  const checkIfActive = type => {
    return type.selected;
  };
</script>

<style>
  .active {
    border: 2px rgb(5, 133, 238) solid;
    border-radius: 10px;
  }

  .right {
    border: 2px #26df34 solid;
    border-radius: 10px;
  }

  .wrong {
    border: 2px #ca0606 solid;
    border-radius: 10px;
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

  .type:hover {
    opacity: 0.65;
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
      class:active={checkIfActive(type)}
      on:mousedown={handleTypeSelected}>
      <TypeBox {type} />
    </div>
  {/each}
</div>
