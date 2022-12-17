<script lang="ts" setup>
import EmptyVue from './state/empty.vue';
import PendingVue from './state/pending.vue';
</script>

<template>
  <div class="state_area">
    <PendingVue />
  </div>
</template>

<style lang="scss" scoped>
.state_area {
  margin: 0 4rem;
}
</style>