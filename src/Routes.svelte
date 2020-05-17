<script>
  import { Router, Link, Route } from "svelte-routing";

  import App from "./App.svelte";
  import Home from "./Home.svelte";

  export let url = "";
  export let typeChart;
</script>

<style>
  .navigation-bar {
    /* text-align: center; */
    display: flex;
    justify-content: center;
    background-color: rgb(217, 245, 229);
  }

  .navigation-link {
    margin: 0 8px;
  }

  body {
    background-color: rgb(178, 219, 214);
    padding: 0px;
  }
</style>

<Router {url}>

  <Route path="/" component={Home} />
  <Route path="type" component={App} {typeChart} />
</Router>
