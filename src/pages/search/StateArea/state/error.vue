<script lang="ts" setup>
defineEmits(['retry'])
</script>

<template>
  <div class="error">
    <div class="icon">
      <svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em"
        fill="currentColor" aria-hidden="true">
        <path
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z">
        </path>
        <path
          d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z">
        </path>
      </svg>
    </div>
    <h3>出错了！错误代码：502</h3>
    <h4 @click="$emit('retry')">点这里重试</h4>
  </div>
</template>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;

  .icon {
    color: red;
    font-size: 3.6rem;
  }

  h3 {
    margin-bottom: 1rem;
  }

  h4 {
    text-decoration: underline;
    cursor: pointer;
    user-select: none;
  }
}
</style>