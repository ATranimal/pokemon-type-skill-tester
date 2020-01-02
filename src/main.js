import App from "./App.svelte";
import BattleTypeChart from "./data/typechart";

const app = new App({
  target: document.body,
  props: {
    typeChart: BattleTypeChart
  }
});

export default app;
