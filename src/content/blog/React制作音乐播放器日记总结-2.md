---
title: React制作音乐播放器日记总结-2
date: 2022-08-08 10:52:13
categories: 技术
tags: [技术, React, 总结, 经验, canvas]
---

# React制作音乐播放器日记总结-2

## 声明：文章仅为本人总结的经验，不代表这就是正确标准答案

这篇博客主要用于记录制作音频可视化的过程与遇到的困难，本来想着别人的轮子能拿来用用，但奈何 CSDN 上的文章都没看明白，所以只好自己造一部分了

## 获取音频对象并将声音转换成频谱数组

### 关于柱形图的定义

柱形图的音频可视化可能大家都有见过，在这里放个简单的图

![](/content/blog/React制作音乐播放器日记总结-2/bar1.jpg)

这种图一般用于实时展示音频频域，每一根柱子代表其频率对应的能量大小

![](/content/blog/React制作音乐播放器日记总结-2/频域图1.png)

而在 Web Audio API 中，有这样一个 API 专门用于获取音频实时数据，专门用于处理音频可视化问题：

MDN 文档：https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode

在本文章中我们就围绕这个 API 进行操作

### 获取柱形图数据

#### 初始化音频上下文

创建一个基本的音频上下文的流程如下（图摘自 MDN 官网）：

![](/content/blog/React制作音乐播放器日记总结-2/流程.jpg)

在使用 `AnalyserNode` API 获取数据之前，我们首先需要创建一个音频上下文对象

```js
let audioContext = new window.AudioContext()
```

在该音乐播放器中只有要绘制频谱的地方用到了音频上下文，所以我直接在需要进行音频可视化的地方初始化了上下文对象，如果全局使用则更推荐在音频相关的全局 reducer 进行初始化

随后便是为上下文选择一个音频源，本人是在 全局的音频 Reducer 中 new 了一个音频对象，所以在这里直接使用 `AudioContext` 实例上的 `createMediaElementSource()` 方法来为音频上下文选择音频源

```js
let eleSource = audioContext.createMediaElementSource(this.props.ele)
```

接下来是构造 `AnalyserNode` 实例，此时构造出来的 analyser 实例输出的频域数组长度为 `1024` ， 一般我们不需要那么多，所以我们还需要设计其 `fftSize` 属性减少数组长度

```js
let analyser = audioContext.createAnalyser()
// 减短数组长度
analyser.fftSize = 256
```

最后一步就是将处理器串联起来，以音频源为起点，以系统目前的输出设备为终点。

```js
eleSource.connect(analyser)
analyser.connect(audioContext.destination)
```

![](/content/blog/React制作音乐播放器日记总结-2/connect.jpg)

源码如下

![](/content/blog/React制作音乐播放器日记总结-2/初始化1.jpg)

至此，我们完成了音频上下文的初始化

#### 获取数据数组

我们在此处定义一个 `getDataArray` 的方法，专门用于获取我们需要的数据

为获取数据，首先我们需要构造一个 `Uint8Array` 类型的数组，长度是 `analyser` 身上的 `frequencyBinCount` 长度为 前文设置的 `fftSize` 的一半

`Uint8Array` 数组资料：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array

随后调用 `analyser` 身上的 `getByteFrequencyData` 方法，并将刚刚初始化的 array 作为参数

接下来在控制台打印这个数组就可以看到我们想要的数据，完整代码如下：

```ts
const getDataArray = (analyser: AnalyserNode) => {
  let array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(array)
  console.log(array)
}
```

通过调用这个方法我们就可以看到想要的数据

![](/content/blog/React制作音乐播放器日记总结-2/data1.jpg)

#### 注意事项
{% note warning %}
**以下内容都是个人实践后所得到的经验和解决方法，仅供参考**
{% endnote %}

当选择 `HTMLMediaElement` 作为音频上下文对象的音频源时，音频源的源文件，即 `src` 不能是空或者无效的文件，否则在音频上下文初始化后将无法正常播放音频，但是 `Firefox` 浏览器在部分情况下仍然可以正常播放

因此我在钩子 `componentDidUpdate` 对上下文是否初始化进行判断，当播放器有媒体资源且可以正常播放时对音频上下文进行初始化，同时开始对 `canvas` 进行绘图

```js
class CanvasComponent extends React.Component {
  // 组件中设置一个私有变量判断是否初始化
  private hasInit = false

  componentDidUpdate() {
    // 未初始化且无资源
    if (!this.hasInit && this.props.ele.src.length) {
      let audioContext = new window.AudioContext();
      let eleSource = audioContext.createMediaElementSource(this.props.ele);
      let analyser = audioContext.createAnalyser();

      analyser.fftSize = this.myFftSize;

      eleSource.connect(analyser);
      analyser.connect(audioContext.destination);

      this.hasInit = true;

      // 初始化完成后调用绘制函数
      this.draw(analyser)
    }
  }
}
```
最后那里的 `draw` 函数详解：[音频播放时调用绘制函数进行绘制](#音频播放时调用绘制函数进行绘制)

### 在 Canvas 上绘制柱形图

#### 封装绘制函数

有了数据之后，接下来就是绘制柱形图

我们首先封装一个纯绘图函数，并将 `canvas元素` 和 `频域数组` 传入

```ts
drawToDom = (canvas: HTMLCanvasElement, arr: Uint8Array) => {}
```
我们要获取 canvas 的宽高，这样可以计算其中每个条的宽度
```js
const w = canvas.width
const h = canvas.height
// 数组长度，代表绘制柱形条的数量
const alt = arr.length

// 计算每一个柱形条宽度
let barW = w / alt
let barH = 0
// 渲染下一个柱形条的 x 轴位置
let x = 0
```
在渲染之前先要清空 `canvas` ，随后用 for 循环读出每个频域的数据，并渲染到 canvas 中，频域的数据可能过大，使得柱形条高度大于画布范围，所以有必要除一下使得柱形条高度变矮；每次 for 循环中除了加上柱形条宽度还要在加一个常熟让柱形条隔开

这里我们使用 `canvas元素` 上下文的 `fillRect` 绘制矩形

{% note %}
`fillRect` 文档链接: https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect
{% endnote %}

为了让每个柱形条居中，我们需要决定其初始位置，即 `canvas` 元素自身高度的一半，但此时柱形条将以 `canvas` 中心进行渲染，会变成这样：
![](/content/blog/React制作音乐播放器日记总结-2/bar2.jpg)

因此我们还需要对起始位置的渲染进行调整，即再把 y 轴位置减去当前柱形条高度的一半，即可达到正常效果

![](/content/blog/React制作音乐播放器日记总结-2/effection1.jpg)

绘制代码如下：
```js
canvasCtx.fillStyle = '#bce5ef' // 设置渲染颜色
canvasCtx.fillRect(x, h / 2 - barH / 8, barW, (barH / 4));
```
这里我设置柱形条高度时除了 `4`，所以在设置 `y` 轴的位置时在除了 `4` 的基础上再除了 `2`

完整代码如下：
```ts
  drawToDom = (canvas: HTMLCanvasElement, arr: Uint8Array) => {
    let canvasCtx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height
    const alt = arr.length
    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, w, h)
      // 计算每个条的宽度
      let barW = (w / alt) * 0.9
      let barH = 0
      let x = 0

      for (let i = 0; i < alt; i++) {
        barH = arr[i] + 20
        canvasCtx.fillStyle = '#bce5ef'
        canvasCtx.fillRect(x, h / 2, barW, (barH / 4))

        // 增加一个常数使得渲染的柱形条不会紧挨在一起
        x += barW + 3;
      }
    } else {
      throw Error('canvas 元素为空')
    }
  }
```

#### 音频播放时调用绘制函数进行绘制

现在我们封装一个上下文初始化时调用的 draw 函数，我将获取音频可视化数据的 `analyser` 作为参数传入

在这里我将使用 `requestAnimationFrame` 作为动画回调函数载体进行无限递归，从而做到持续更新 `canvas` 画布，当然我也使用了节流，防止不必要的性能消耗，这里的节流使用了 `lodash` 自带的节流功能

{% note %}
`requestAnimationFrame` 文档链接: https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
{% endnote %}

完整代码如下
```ts
  draw = (analyser: AnalyserNode) => {
    const alt = analyser.frequencyBinCount
    let array = new Uint8Array(alt);

    // 绘制函数
    let drawToCanvas = throttle(() => {
      // 无限递归更新画布
      this.drawVisual = requestAnimationFrame(drawToCanvas)
      // 获取频域数据
      analyser.getByteFrequencyData(array);
      // 当 canvas 元素存在时进行绘制
      if (this.IndexCanvas.current) this.drawToDom(this.IndexCanvas.current, array)
    }, 20)

    drawToCanvas()
  }
```
大概总结了这么多，如果有错漏的地方可以 B 站私信我及时修改。