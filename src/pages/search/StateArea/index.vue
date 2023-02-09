<script lang="ts" setup>
import EmptyVue from './state/empty.vue';
import PendingVue from './state/pending.vue';
import ErrorVue from './state/error.vue'
import ResultVue from './state/result.vue'
import { onMounted, ref } from 'vue';
import cfg from 'blog.config'
import type { SearchResultItem } from '@/declare/Search';
import SearchVirtualServer from '@/utils/search/Server';

defineExpose({
  FirstSearch
})

const { SearchConfig } = cfg
/** 1: `empty` 2: `pending` 3: `error` 4: `result` */
const state = ref<1 | 2 | 3 | 4>(cfg.SearchConfig?.mode === "static" ? 2 : 1),
  resultArray = ref<SearchResultItem[]>([]),
  ResultVueRef = ref<InstanceType<typeof ResultVue> | null>(null)
let outerKeyword = "", isFirstSearch = true

const isStaticSearch = () => SearchConfig?.mode === "static"

const ServerInstance = new SearchVirtualServer({ staticData: {} })

async function goSearch(keywords: string, offset = 0, limit = 5, firstSearch = false) {
  if (SearchConfig.mode === "static" && !ServerInstance.finishRequireData) return
  outerKeyword = keywords
  if (firstSearch) {
    state.value = 2
    resultArray.value = []
  }
  try {
    const { data, end } = await ServerInstance.goSearch({
      keywords,
      offset,
      limit
    })
    if (end) ResultVueRef.value?.SwtichTipState(3)
    resultArray.value.push(...data)
    state.value = 4
    isFirstSearch = false
  } catch (e) {
    console.log(e);
    if (firstSearch) {
      state.value = 3
    }
    else ResultVueRef.value?.SwtichTipState(2)
  }
}

async function FirstSearch(keywords = outerKeyword) {
  isFirstSearch = true
  await goSearch(keywords, 0, 5, true)
}

async function nextPage() {
  await goSearch(outerKeyword, resultArray.value.length)
}

async function requestStaticIndex() {
  // eslint-disable-next-line no-undef
  ServerInstance.setStaticData(await (await fetch(process.env.NODE_ENV === "development" ? "../.blog/SearchIndex.json" : SearchConfig?.requestURL ? SearchConfig.requestURL : cfg.WebsiteSettings.base + "/SearchIndex.json")).json())
}

function retry() {
  state.value = 2
  setTimeout(async () => {
    if (isStaticSearch()) {
      try {
        await requestStaticIndex()
        state.value = 1
      } catch (e) {
        console.log(e);
        state.value = 3
      }
    }
    else {
      if (isFirstSearch)
        FirstSearch()
      else
        nextPage()
    }
  }, 500);
}

onMounted(async () => {
  if (SearchConfig?.mode === "static") {
    // init static search
    retry()
  }
})

</script>

<template>
  <div class="state_area">
    <EmptyVue v-if="state === 1" />
    <PendingVue v-else-if="state === 2" />
    <ErrorVue v-else-if="state === 3" @retry="retry" />
    <ResultVue v-else :result="resultArray" ref="ResultVueRef" @next-page="nextPage" @retry="retry" />
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
