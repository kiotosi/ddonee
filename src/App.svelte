<script lang="ts">
  import UIButton from "./components/UI/Button.svelte";
  import UIInput from "./components/UI/Input.svelte";
  let inp = '';
  $: {
    console.log(inp);
  }
</script>

<main class="main">
  <UIButton>
    This is a button!
  </UIButton>
  <UIInput isNumerical placeholder="123" inputValue={inp} />
</main>

<style scoped>
  .main {
    width: 100vw;
    height: 100vh;
    background-color: var(--background);
  }
</style>