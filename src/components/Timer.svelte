<script>
  import { onMount } from "svelte";

  export let submitted;

  let intervalID;
  let currentTime = 0;

  onMount(() => {
    intervalID = setInterval(() => {
      currentTime = currentTime += 1;
    }, 1000);
  });

  $: if (submitted) {
    clearInterval(intervalID);
  }
</script>

<style>
  .timer {
    padding: 4px;
    position: absolute;
    background-color: #97eabe;
    border: 2px solid black;
    bottom: 16px;
    right: 16px;
    width: 160px;
    height: 48px;
  }
</style>

<div class="timer">{currentTime} seconds elapsed</div>
