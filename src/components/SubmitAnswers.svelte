<script>
  export let submitted,
    weakChoices,
    weakAnswers,
    resistChoices,
    resistAnswers,
    types,
    currentType;
  const submitAnswers = () => {
    submitted = true;

    if (weakAnswers.length === 0)
      types.forEach(type => {
        const [weakChoice] = weakChoices.filter(choice => choice.name === type);

        if (currentType.damageTaken[type] === 1 && weakChoice.selected) {
          weakAnswers = [...weakAnswers, { type: type, correct: "correct" }];
        } else if (
          currentType.damageTaken[type] === 1 &&
          !weakChoice.selected
        ) {
          weakAnswers = [
            ...weakAnswers,
            { type: `Missing: ${type}`, correct: "incorrect" }
          ];
        } else if (currentType.damageTaken[type] !== 1 && weakChoice.selected) {
          weakAnswers = [
            ...weakAnswers,
            { type: `Incorrectly chose: ${type}`, correct: "incorrect" }
          ];
        }
      });

    if (resistAnswers.length === 0)
      types.forEach(type => {
        const [resistChoice] = resistChoices.filter(
          choice => choice.name === type
        );
        if (
          (currentType.damageTaken[type] === 2 ||
            currentType.damageTaken[type] === 3) &&
          resistChoice.selected
        ) {
          resistAnswers = [
            ...resistAnswers,
            { type: type, correct: "correct" }
          ];
        } else if (
          (currentType.damageTaken[type] === 2 ||
            currentType.damageTaken[type] === 3) &&
          !resistChoice.selected
        ) {
          resistAnswers = [
            ...resistAnswers,
            { type: `Missing: ${type}`, correct: "incorrect" }
          ];
        } else if (
          !(
            currentType.damageTaken[type] === 2 ||
            currentType.damageTaken[type] === 3
          ) &&
          resistChoice.selected
        ) {
          resistAnswers = [
            ...resistAnswers,
            { type: `Incorrectly chose: ${type}`, correct: "incorrect" }
          ];
        }
      });
  };
</script>

<style>
  .submit {
    margin: 8px 32px;
  }
</style>

<button class="submit" on:mousedown={submitAnswers}>Submit answers!</button>
