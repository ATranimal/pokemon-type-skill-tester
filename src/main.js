import App from "./App.svelte";
import Routes from "./Routes.svelte";
import BattleTypeChart from "./data/typechart";

const app = new Routes({
  target: document.body,
  props: {
    typeChart: BattleTypeChart
  }
});

export default app;
