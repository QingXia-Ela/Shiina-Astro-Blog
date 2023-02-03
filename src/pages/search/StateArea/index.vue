<script lang="ts" setup>
import EmptyVue from './state/empty.vue';
import PendingVue from './state/pending.vue';
import ErrorVue from './state/error.vue'
import ResultVue from './state/result.vue'
import { onMounted, ref } from 'vue';
import cfg from 'blog.config'
import type { SearchResultItem } from '@/declare/Search';
const { SearchConfig } = cfg
/** 1: `empty` 2: `pending` 3: `error` 4: `result` */
const state = ref<1 | 2 | 3 | 4>(cfg.SearchConfig?.mode === "static" ? 2 : 1),
  STATIC_SEARCH_DATA = ref<Record<string, string> | null>(null),
  searchResultArray = ref<SearchResultItem[]>([]),
  staticResultArray = ref<SearchResultItem[]>([]),
  STATIC_SEATCH_ITEM_COUNT = 10

const isStaticSearch = () => STATIC_SEARCH_DATA.value && SearchConfig?.mode === "static"

function updateStaticResult() {
  searchResultArray.value = searchResultArray.value.concat(staticResultArray.value.splice(0, STATIC_SEATCH_ITEM_COUNT > staticResultArray.value.length ? staticResultArray.value.length : STATIC_SEATCH_ITEM_COUNT))
}

function nextPage() {
  if (isStaticSearch()) {
    updateStaticResult()
  }
}

function goSearch(content: string) {
  if (content === "") return
  searchResultArray.value = []
  staticResultArray.value = []
  if (isStaticSearch()) {
    const reg = new RegExp(content)
    for (const k in STATIC_SEARCH_DATA.value) {
      if (Object.prototype.hasOwnProperty.call(STATIC_SEARCH_DATA.value, k)) {
        const e = STATIC_SEARCH_DATA.value[k];
        if (reg.test(k.toUpperCase()) || reg.test(k.toLowerCase()) || reg.test(e)) {
          staticResultArray.value.push({
            title: k,
            content: k
          })
        }
      }
    }
    state.value = 4
    updateStaticResult()
  }
  else {

  }
}

async function requestStaticIndex() {
  // eslint-disable-next-line no-undef
  return await (await fetch(process.env.NODE_ENV === "development" ? "../.blog/SearchIndex.json" : "/SearchIndex.json")).json()
}

function retry() {
  state.value = 2
  setTimeout(async () => {
    if (SearchConfig?.mode === "static") {
      try {
        STATIC_SEARCH_DATA.value = await requestStaticIndex()
        state.value = 1
      } catch (e) {
        console.log(e);
        state.value = 3
      }
    }
    else {

    }
  }, 500);
}

onMounted(async () => {
  if (SearchConfig?.mode === "static") {
    // init static search
    retry()
  }
})

defineExpose({
  goSearch
})
</script>

<template>
  <div class="state_area">
    <EmptyVue v-if="state === 1" />
    <PendingVue v-else-if="state === 2" />
    <ErrorVue v-else-if="state === 3" @retry="retry" />
    <ResultVue :result="searchResultArray" v-else-if="state === 4 && searchResultArray.length" />
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
