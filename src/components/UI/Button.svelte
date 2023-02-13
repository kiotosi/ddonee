<script lang="ts">

</script>

<div class="button">
  <slot />
</div>

<style scoped>
  .button {
    width: fit-content;
    padding: 8px 12px;
    background-color: var(--primary);
    border: 1px solid var(--secondary);
    border-radius: 2px;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    color: var(--foreground);
    font-weight: 300;
  }

  .button:hover {
    filter: grayscale(0.1);
  }

  .button:active {
    background-color: var(--secondary);
  }
</style>