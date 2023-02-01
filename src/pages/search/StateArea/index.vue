<script lang="ts" setup>
import EmptyVue from './state/empty.vue';
import PendingVue from './state/pending.vue';
import ErrorVue from './state/error.vue'
import ResultVue from './state/result.vue'
</script>

<template>
  <div class="state_area">
    <!-- <EmptyVue /> -->
    <ResultVue />
  </div>
</template>

<style lang="scss" scoped>
.state_area {
  margin: 0 4rem;
}

@media screen and (max-width: 992px) {
  .state_area {
    margin: 0;
  }
}
</style>
