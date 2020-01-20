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
  }

  .navigation-link {
    margin: 0 8px;
  }
</style>

<Router {url}>
  <nav class="navigation-bar">
    <div class="navigation-link">
      <Link to="/">Home</Link>
    </div>
    <div class="navigation-link">
      <Link to="/single">Single Type</Link>
    </div>
  </nav>
  <div>
    <Route path="/" component={Home} />
    <Route path="home" component={Home} />
    <Route path="single" component={App} {typeChart} />
  </div>
</Router>
