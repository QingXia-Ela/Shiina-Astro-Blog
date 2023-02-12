<script lang="ts" setup>
import type { SearchResultItem } from '@/declare/Search';
import { onMounted, ref, watch } from 'vue';
import cfg from 'blog.config';

defineExpose({
  SwtichTipState
})

const emit = defineEmits(["nextPage", "retry"])

const props = defineProps<{
  result: SearchResultItem[]
}>(), { WebsiteSettings: { base } } = cfg;

const MoreTip = ref<1 | 2 | 3>(1),
  LoadingMore = ref<HTMLElement>()

/**
 * 改变展示
 * @param state 展示状态
 * 获取中时传入 `1`，加载出错传入 `2`，无更多内容传入 `3`
 */
function SwtichTipState(state: 1 | 2 | 3) {
  MoreTip.value = state;
}

onMounted(() => {
  const lazy = new IntersectionObserver(function (entry) {
    entry.forEach((e) => {
      if (e.isIntersecting) {
        if (MoreTip.value === 1) emit("nextPage")
      }
    })
  })
  lazy.observe(LoadingMore.value!)
})
</script>

<template>
  <div class="result">
    <a class="result_item" :href="`${base}/posts/${i.title}`" v-for="i in props.result" :key="i.title">
      <i class="iconfont icon-24gl-fileText"></i>
      <div class="info">
        <div class="title">{{ i.title }}</div>
        <div class="brief_content text_nowrap">
          <strong v-if="i.hl">{{ i.hl }}</strong>{{ i.content }}
        </div>
      </div>
      <i class="iconfont icon-24gl-link"></i>
    </a>
    <h3 v-show="MoreTip === 1" class="more_tip" ref="LoadingMore">正在加载更多...</h3>
    <h3 v-if="MoreTip === 2" class="more_tip">加载出错，<span @click="$emit('nextPage')"
        class="retry text_underline_decoration">重试</span></h3>
    <h3 v-else-if="MoreTip === 3 || !props.result.length" class="more_tip">没有更多内容了</h3>
  </div>
</template>

<style lang="scss" scoped>
.result {
  .result_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.2rem 0;
    padding: 1rem;
    border-radius: .5rem;
    background-color: var(--background-default);
    box-shadow: 0 2px 5px 0 rgba(90, 90, 90, 0.2), 0 2px 10px rgba(139, 139, 139, 0.5);
    transition: none;

    strong {
      text-decoration: underline;
    }

    &:hover {
      color: #fff;
      background-color: var(--tips-default);
    }

    .info {
      width: 0;
      flex: 1;
      padding: 0 1.2rem;

      .title {
        font-size: 1.3em;
        margin-bottom: .2rem;
      }
    }

    .iconfont {
      font-size: 1.4rem;
    }
  }

  .more_tip {
    text-align: center;

    .retry {
      cursor: pointer;

      &:hover {
        color: var(--tips-default);
      }
    }
  }
}
</style>
