<script lang="ts" setup>
import EmptyVue from './state/empty.vue';
import PendingVue from './state/pending.vue';
import ErrorVue from './state/error.vue'
import ResultVue from './state/result.vue'
import { onMounted, ref } from 'vue';
import cfg from 'blog.config'
import type { SearchResultItem } from '@/declare/Search';

defineExpose({
  goSearch
})

const { SearchConfig } = cfg
/** 1: `empty` 2: `pending` 3: `error` 4: `result` */
const state = ref<1 | 2 | 3 | 4>(cfg.SearchConfig?.mode === "static" ? 2 : 1),
  STATIC_SEARCH_DATA = ref<Record<string, string>>({}),
  staticResultArray = ref<SearchResultItem[]>([]),
  ResultVueRef = ref<InstanceType<typeof ResultVue> | null>(null)
let cacheContent = ""

const isStaticSearch = () => SearchConfig?.mode === "static"

async function goSearch(content: string) {
  if (content === cacheContent) return
  cacheContent = content
  let cnt = 1
  staticResultArray.value = []
  if (isStaticSearch()) {
    state.value = 4
    if (SearchConfig?.staticSearchHandler) {
      staticResultArray.value = await SearchConfig?.staticSearchHandler(content) ?? []
      return
    }
    const reg = new RegExp(content.toLowerCase())
    for (const k in STATIC_SEARCH_DATA.value) {
      if (Object.prototype.hasOwnProperty.call(STATIC_SEARCH_DATA.value, k)) {
        const e = STATIC_SEARCH_DATA.value[k], i = e.toLowerCase().indexOf(reg.source)
        if (reg.test(k.toLowerCase())) {
          staticResultArray.value.push({
            title: k,
            content: k
          })
        }
        else if (i != -1) {
          const t = i + reg.source.length
          staticResultArray.value.push({
            title: k,
            content: `${e.substring(t, t + 100)}`,
            hl: e.substring(i, i + reg.source.length)
          })
        }
      }
    }
  }
  else {
    const URL = (SearchConfig?.requestURL ?? "") + '?offset=' + cnt
      , { data, end } = await (await fetch(URL)).json()
    staticResultArray.value.push(...data)
    state.value = 4
    cnt++
    if (end === "true") {
      ResultVueRef.value?.SwtichTipState(3)
    }
  }
}

async function requestStaticIndex() {
  // eslint-disable-next-line no-undef
  return await (await fetch(process.env.NODE_ENV === "development" ? "../.blog/SearchIndex.json" : SearchConfig?.requestURL ? SearchConfig.requestURL : "/SearchIndex.json")).json()
}

function retry() {
  state.value = 2
  setTimeout(async () => {
    if (isStaticSearch()) {
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

</script>

<template>
  <div class="state_area">
    <EmptyVue v-if="state === 1" />
    <PendingVue v-else-if="state === 2" />
    <ErrorVue v-else-if="state === 3" @retry="retry" />
    <ResultVue :result="staticResultArray" v-else ref="ResultVueRef" />
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
