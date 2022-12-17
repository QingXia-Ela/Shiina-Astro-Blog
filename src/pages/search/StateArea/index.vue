<script lang="ts" setup>
import EmptyVue from './state/empty.vue';
import PendingVue from './state/pending.vue';
import ErrorVue from './state/error.vue'
</script>

<template>
  <div class="state_area">
    <ErrorVue />
  </div>
</template>

<style lang="scss" scoped>
.state_area {
  margin: 0 4rem;
}
</style>
