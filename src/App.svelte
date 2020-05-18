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

  let score = 0;
  let currentRound = 1;
  let maxRounds = 5;

  let submitted = false;
  let finished = false;

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
    if (currentRound !== maxRounds) {
      currentRound++;
      submitted = false;
      currentType = typeChart[Math.floor(Math.random() * typeChart.length)];
      resetWeakChoices();
      resetResistChoices();
      weakAnswers = [];
      resistAnswers = [];

      window.scrollTo(0, 0);
    } else {
      finished = true;
    }
  };
</script>

<style>
  main {
    height: 100%;
  }

  .answer-row-correct {
    display: flex;
    align-items: center;
    min-height: 32px;
  }

  .answer-row-incorrect {
    display: flex;
    align-items: center;
    min-height: 32px;
  }

  .answer-row-missing {
    display: flex;
    align-items: center;
    min-height: 32px;
  }

  .container {
    background-image: linear-gradient(
      to bottom right,
      rgb(178, 219, 214),
      rgb(240, 240, 204)
    );
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  .current-type-box {
    display: flex;
    justify-content: center;
  }

  button {
    font-weight: 600;
    border-radius: 8px;
    background-color: rgb(108, 156, 151);
    color: rgb(219, 255, 252);
  }

  .answer-row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
  }

  .score {
    position: fixed;
    top: 16px;
    left: 16px;
    opacity: 0.6;
    border-radius: 8px;
    color: rgb(218, 235, 199);
    background-color: rgb(39, 53, 23);
    padding: 2px 4px;
  }

  .finished {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .selector-div {
    display: flex;
    justify-content: center;
  }

  .title {
    margin-top: 32px;
  }
</style>

<main transition:blur>
  <div class="container" class:finished>
    <div class:score={!finished} class:finished>
      {#if finished}
        <div>{`Final Score: ${score}`}</div>
        <button
          style="margin-top: 16px"
          on:mousedown={() => {
            location.reload();
          }}>
          Try again?
        </button>
      {/if}
      {#if !finished}
        {`Current Round: ${currentRound} - Current Score: ${score}`}
      {/if}
    </div>

    {#if !finished}
      <h1 class="title" in:fade={{ delay: 400 }}>Pokemon Type Skill Tester</h1>

      <div class="current-type-box" in:fade={{ delay: 400 }}>
        <h3>
          What types are
          <TypeBox type={currentType} />
          pokemon weak to?
        </h3>
      </div>

      {#if !submitted}
        <div class="selector-div" in:fade={{ delay: 400 }}>
          <TypeSelector
            {submitted}
            bind:choices={weakChoices}
            bind:answers={weakAnswers} />
        </div>

        <h3 in:fade={{ delay: 400 }}>
          What types do they resist / are they immune to?
        </h3>

        <div class="selector-div" in:fade={{ delay: 400 }}>
          <TypeSelector
            {submitted}
            bind:choices={resistChoices}
            bind:answers={resistAnswers} />
        </div>

        <SubmitAnswers
          bind:submitted
          bind:weakAnswers
          bind:resistAnswers
          bind:score
          {typeChart}
          {types}
          {currentType}
          {weakChoices}
          {resistChoices} />
      {/if}

      {#if submitted}
        <div class="answers">
          <h3>The answers for weak are:</h3>
          <div class="answer-row">
            <div class="answer-row-correct">
              Correct:
              {#each weakAnswers as answer}
                {#if answer.correct === 'correct'}
                  <TypeBox type={answer.type} />
                {/if}
              {/each}
            </div>
            <div class="answer-row-incorrect">
              Incorrect:
              {#each weakAnswers as answer}
                {#if answer.correct === 'incorrect'}
                  <TypeBox type={answer.type} />
                {/if}
              {/each}
            </div>
            <div class="answer-row-missing">
              Missing:
              {#each weakAnswers as answer}
                {#if answer.correct === 'missing'}
                  <TypeBox type={answer.type} />
                {/if}
              {/each}
            </div>
          </div>
          <h3>The answers for resist / immune are:</h3>
          <div class="answer-row">
            <div class="answer-row-correct">
              Correct:
              {#each resistAnswers as answer}
                {#if answer.correct === 'correct'}
                  <TypeBox type={answer.type} />
                {/if}
              {/each}
            </div>
            <div class="answer-row-incorrect">
              Incorrect:
              {#each resistAnswers as answer}
                {#if answer.correct === 'incorrect'}
                  <TypeBox type={answer.type} />
                {/if}
              {/each}
            </div>
            <div class="answer-row-missing">
              Missing:
              {#each resistAnswers as answer}
                {#if answer.correct === 'missing'}
                  <TypeBox type={answer.type} />
                {/if}
              {/each}
            </div>
          </div>
        </div>
        <div class="reset">
          <button on:mouseup={resetGame}>Next</button>
        </div>
      {/if}
    {/if}
  </div>
</main>
