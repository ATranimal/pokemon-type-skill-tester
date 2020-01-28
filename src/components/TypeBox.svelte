<script>
  export let type;
</script>

<style>
  .type-box {
    background-color: var(--theme-color);
    border-radius: 5px;
    padding: 0px 8px;
    margin: 0px 8px;
    max-width: 128px;
  }
</style>

<div class="type-box" style="--theme-color: {type.colour}">
  <p>{type.name}</p>
</div>
