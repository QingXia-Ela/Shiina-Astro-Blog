<script lang="ts" setup>
import { ref } from 'vue';
import StateArea from './StateArea/index.vue'

const SearchContent = ref(""), StateAreaRef = ref<InstanceType<typeof StateArea> | null>(null)

function goSearch(key?: string) {
  if (key === "Enter")
    StateAreaRef.value?.FirstSearch(SearchContent.value)
}
</script>

<template>
  <div class="search_input">
    <input id="InputArea" type="text" placeholder="文章关键字..." v-model="SearchContent"
      @keydown="(e) => goSearch(e.key)" />
    <i class="iconfont icon-24gl-search2" @click="() => goSearch('Enter')"></i>
  </div>
  <StateArea ref="StateAreaRef" />
</template>

<style lang="scss" scoped>
.search_input {
  position: relative;
  margin: 2rem 4rem;

  #InputArea {
    width: 100%;
    padding: 1rem;
    padding-right: 3rem;
    border-radius: .6rem;
    border: 1px solid #ccc;
    font-size: 1.1rem;
    font-style: oblique;
    color: var(--text-default);
    letter-spacing: .1rem;
    background-color: transparent;
    transition: border-color .1s, box-shadow .1s;
    outline: none;

    &:focus {
      border-color: var(--tips-default);
      box-shadow: inset 0 1px 1px var(--background-active-default), 0 0 5px var(--tips-default);
    }
  }

  .iconfont {
    position: absolute;
    right: 1.5rem;
    top: calc(50% - .8rem);
    font-size: 1.4rem;
    cursor: pointer;

    &:hover {
      color: var(--tips-default);
    }
  }
}

@media screen and (max-width: 992px) {
  .search_input {
    margin: 2rem 0;
  }
}
</style>