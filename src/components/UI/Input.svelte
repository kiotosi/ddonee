
<script lang="ts">
  export let isNumerical = false;
  export let placeholder = '';
  export let inputValue = '';

  function validateKeystroke(ev: KeyboardEvent) {
    const control = ev.ctrlKey || ev.metaKey;
    const isCopy = control && ev.key === 'c';
    const isPaste = control && ev.key === 'v';
    const isSelectAll = control && ev.key === 'a';

    if (isSelectAll || isCopy || isPaste) {
      return;
    }

    // Prevent typing non-letters if input mode is numerical
    if (isNumerical && !/\d/.test(ev.key)) {
      ev.preventDefault();
    }
  }

  function validatePaste(ev: ClipboardEvent) {
    const data = ev.clipboardData.getData('text');
    const target = ev.target as HTMLInputElement;

    if (isNumerical) {
      ev.preventDefault();
      const validData = data.match(/\d/gi)?.join('') ?? '';
      const endInputValue = inputValue.slice(0, target.selectionStart) + validData + inputValue.slice(target.selectionEnd);
      inputValue = endInputValue;
      target.selectionStart = target.selectionEnd;
    }
  }
</script>

<div class="input">
  <input
    class="input__field"
    type="text"
    placeholder={placeholder}
    bind:value={inputValue}
    on:keypress={validateKeystroke}
    on:paste={validatePaste}
  >
  <div class="input__aftertext">
    <slot name="aftertext" />
  </div>
</div>

<style lang="scss">
  
</style>