---
title: JS浅入学习笔记
date: 2022-11-02 22:58:11
tags: [Js,前端]
---

# 特性、函数和对象

## 语言特性

### 引用与值

js 中有两种方式对变量进行保存：值和引用

对于原始值在对其他变量赋值的时候都是复制到变量中，原始值有以下几样：

 - string
 - number
 - boolean
 - null
 - undefined

其最重要的特点是：他们是之间按照值进行赋值，赋值，传递函数参数以及返回函数结果

而其他的数据类型则是通过引用的方式，没有复制原始值而是保存对象的引用，这样子做是为了提高操作的效率，一次修改就能反映到其他的引用中

```js
var obj = {}

var refObj = obj

obj.p = true

console.log(obj.p === refObj.p) // true
```

### 作用域

**在 JS 中只用两种作用域：全局作用域与函数作用域**

即函数内是一个全新的作用域，其他地方均为全局作用域

```js
{
  var a = 0
}

(()=>{
  var a = 1
  console.log(a) // 1
})()

console.log(a) // 0
```

不过在 ES6 中推出了新的 `let` 这一声明变量的方法，使得变量的作用域范围可以被限制在一个块级内：

```js
{
  let a = 0
}

console.log(a) // 报错：a 未定义
```

因此在各种 for 循环或者 while 循环中都推荐使用 `let` 对变量进行声明，控制其作用域不会污染全局

### 隐式全局变量声明

```js
// 全局环境下
function test() {
  foo = 'bar'
}

console.log(window.foo) // 'bar'
```

这段代码中是 window 对象调用了 test，所以函数中 this 指向 window。而 foo 前面又没有关键字 var 所以这个变量值被放入了全局中

在使用 var 的时候 js 会把用 var 标记的变量先全部提升到顶部，从而保证全局变量可用

### 上下文

```js
// 浏览器环境
function setFoo(fooInput) {
  this.foo = fooInput
}

var foo = 5
var obj = {
  foo: 10
}

setFoo(15) // window 调用，赋值到 window 上

obj.setFoo = setFoo
obj.setFoo(20)

console.log(foo, obj.foo) // 15 20
```

这段代码在 浏览器环境 下与 Nodejs环境 下运行结果并不相同，在 nodejs 中 第一个 `foo = 5` 是被定义到 `Local` 环境中，而在浏览器则是定义在 `window` 中；nodejs 下 第一个 `setFoo` 指向的环境是 `Global` 而不是 `Local` 所以 nodejs 输出的结果是 `5 20` ，而浏览器是 `15 20`

#### 使用函数的 call()、apply() 和 bind() 改变上下文

他们都是用来为函数指定上下文（即 this 指向）：

```js
var name = '小王', age = 17
var obj = {
  name: '小张',
  objAge: this.age,
  myFun: function (f,t) {
    console.log(this.name, this.age, 'from:'+f+' to:'+t)
  }
}

var db = {
  name: '小红',
  age: 24
}

obj.myFun.call(db, '成都', '上海') // 直接用逗号分隔传入的参数
obj.myFun.apply(db, ['成都', '上海']) // 用一个数组将所有参数包起来
obj.myFun.bind(db, '成都', '上海')() // 与 call 同理，不过返回一个函数，需要手动调用，不会直接执行
```

### 闭包

一般用于限制变量的作用域

下面这里第一段代码会在控制台循环打印出 5 个 5，因为 js 是单线程任务，在这个例子中 当开始执行 setTimeout 的回调时全局的 i 的值已经是 5 了，所以会循环打印出 5 个 5，对此我们可以使用闭包，即封装一个立即执行函数，限制变量的作用域

```js
for (var i = 0; i < 5; i++) {

  // 未使用闭包
  setTimeout(()=>{
    console.log(i)
  },i*1000)

  // 使用了闭包
  (function (j) {
    setTimeout(()=>{
      console.log(j)
    },j*1000)
  })(i)

}
```

下面这段代码通过闭包将全局变量进行了隐藏

```js
(function () {
  var msg = 'msg'

  window.onload = function () {
    // 使用隐藏的变量，避免这个内部的变量影响到外部的变量
    console.log('msg')
  }
})()
```

### 函数重载

js 本质上来说其实并没有函数重载，而 typescript 也仅仅只是提供了函数声明的重载。

但是我们可以利用函数自身作用域下的 `arguments` 来自己模拟重载

```js
  function f1(t2, t3) {
    if (arguments.length == 2) {
      // 传入了两个变量，将变量转为数组
      var arr = Array.prototype.slice.call(arguments, 0)
      console.log(arr)
    }
    else {
      // 传入了其他数量的变量
    }
  }
```

### typeof 与 instanceof

他们都可以用来判断某个变量的类型，但是 `typeof` 只能判断原始值，对于一些复杂结构如 `Object`, `Array` 都是返回 `"object"`

因此便有了 `instanceof` 关键字，语法：`object instanceof constructor`

用来检测 `constructor.prototype` 是否存在于参数 `object` 的原型链上。

```js
const arr = []
console.log(typeof arr) // object
console.log(arr instanceof Array) // true
console.log(arr instanceof Object) // true，因为 Array 的构造函数的原型链上存在着 Object 构造函数的 prototype 对象
console.log(arr instanceof Date) // false，Date 的构造函数原型是 Date.prototype {}，他不存在于 Array 上
```

## 对象工具

直接说点高级技巧

### 修改对象

#### 阻止对象写入新的属性

```js
var obj = {}

// 冻结对象方法
var obj2 = Object.preventExtensions(obj)
```

此时往对象内新增值时会抛出错误，但是可以更新与删除

#### 阻止对象的扩展能力

```js
var obj = {}

Object.seal(obj)
```

这种方法会使得对象属性无法添加和删除，也不能转换为存取器 (即定义 getter 和 setter)，但是可以对对象的属性值进行更新

#### 控制对象变得完全不可变

```js
var obj = {}

Object.freeze(obj)
```

此时对象已经变得完全不可变了，除非其属性中有以对象为值的属性，那么这个属性仍然可以读写，必须通过递归的形式进行深度冻结才可以使得所有属性被冻结

# 创建可重用代码

## 面向对象？

直接上一些高级技巧

### isPrototypeOf() & getPrototypeOf()

`isPrototypeOf()` 这个方法可以在任何对象上进行调用，其存在于所有 JS 对象中，其用于判断 **一个对象是否是某种类型的实例**

```js
  class Person {
    constructor() {
      this.name = 'foo'
    }
  }

  let obj = Object.create(Person)
  let obj2 = new Person()

  console.log(Person.isPrototypeOf(obj)) // true
  console.log(Person.isPrototypeOf(obj2)) // false，因为 new 出来的属性没有其标准的 prototype 属性
```

### 通过函数闭包控制属性成员私有化

```js
  class Person {
    constructor() {
      this.name = 'foo'
      var privateN = 10

      this.getPrivate = () => privateN
    }
  }
  const obj = new Person()

  var test = obj.getPrivate()
  console.log(obj.test); // 10
```

这种方法只能对原始值进行处理，如果是复杂数据结构可能要考虑使用 `Map` 或者 `WeakMap` 进行处理