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

<div class="timer">
  <p>{currentTime}</p>
</div>
