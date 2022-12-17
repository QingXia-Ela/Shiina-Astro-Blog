<template>
  <div class="result">
    <a class="result_item" href="/" v-for="i in 10" :key="i">
      <i class="iconfont icon-24gl-fileText"></i>
      <div class="info">
        <div class="title">标题</div>
        <div class="brief_content text_nowrap">
          测试内容</div>
      </div>
      <i class="iconfont icon-24gl-link"></i>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.result {

  .result_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: .8rem 0;
    padding: 1rem;
    border-radius: .4rem;
    background-color: var(--background-active-default);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    transition: none;

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
}
</style>