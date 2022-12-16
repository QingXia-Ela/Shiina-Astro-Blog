<script lang="ts" setup>
import { ref } from 'vue';

const SearchContent = ref("")
</script>

<template>
  <div class="search_input">
    <input id="InputArea" type="text" placeholder="文章关键字..." v-model="SearchContent" />
    <i class="iconfont icon-24gl-search2"></i>
  </div>
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
</style>