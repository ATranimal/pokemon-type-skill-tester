<script>
  export let submitted,
    weakChoices,
    weakAnswers,
    score,
    resistChoices,
    resistAnswers,
    typeChart,
    types,
    currentType;

  const submitAnswers = () => {
    let answerScore = 0;
    submitted = true;

    if (weakAnswers.length === 0)
      types.forEach(type => {
        const [weakChoice] = weakChoices.filter(choice => choice.name === type);
        const typeWithColour = typeChart.find(typeC => {
          return typeC.name === type;
        });

        if (currentType.damageTaken[type] === 1 && weakChoice.selected) {
          answerScore++;
          weakAnswers = [
            ...weakAnswers,
            { type: typeWithColour, correct: "correct" }
          ];
        } else if (
          currentType.damageTaken[type] === 1 &&
          !weakChoice.selected
        ) {
          answerScore--;
          weakAnswers = [
            ...weakAnswers,
            { type: typeWithColour, correct: "missing" }
          ];
        } else if (currentType.damageTaken[type] !== 1 && weakChoice.selected) {
          answerScore--;
          weakAnswers = [
            ...weakAnswers,
            { type: typeWithColour, correct: "incorrect" }
          ];
        }
      });

    if (resistAnswers.length === 0)
      types.forEach(type => {
        const [resistChoice] = resistChoices.filter(
          choice => choice.name === type
        );
        const typeWithColour = typeChart.find(typeC => {
          return typeC.name === type;
        });

        if (
          (currentType.damageTaken[type] === 2 ||
            currentType.damageTaken[type] === 3) &&
          resistChoice.selected
        ) {
          answerScore++;
          resistAnswers = [
            ...resistAnswers,
            { type: typeWithColour, correct: "correct" }
          ];
        } else if (
          (currentType.damageTaken[type] === 2 ||
            currentType.damageTaken[type] === 3) &&
          !resistChoice.selected
        ) {
          answerScore--;
          resistAnswers = [
            ...resistAnswers,
            // { type: `Missing: ${type}`, correct: "incorrect" }
            { type: typeWithColour, correct: "missing" }
          ];
        } else if (
          !(
            currentType.damageTaken[type] === 2 ||
            currentType.damageTaken[type] === 3
          ) &&
          resistChoice.selected
        ) {
          answerScore--;
          resistAnswers = [
            ...resistAnswers,
            // { type: `Incorrectly chose: ${type}`, correct: "incorrect" }
            { type: typeWithColour, correct: "incorrect" }
          ];
        }
      });
    score = score + answerScore;
  };
</script>

<style>
  .submit {
    margin: 8px 32px;
  }

  button {
    font-weight: 600;
    border-radius: 8px;
    background-color: rgb(108, 156, 151);
    color: rgb(219, 255, 252);
  }
</style>

<button class="submit" on:mousedown={submitAnswers}>Submit answers!</button>
