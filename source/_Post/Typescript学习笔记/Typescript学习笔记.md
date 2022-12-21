---
title: Typescript学习笔记
date: 2022-07-15 15:59:28
tags: [技术, Typescript, 学习笔记]
categories: '技术'
---

# Typescript学习笔记

## 前言

该笔记是基于学习 js 后所写的，笔记是自用，不一定 100% 准确！

## 概要

本质上是 js 的超集，就像是 js 的扩展罢

需要安装 tsx 将其编译成 js 使用

或者 node 直接执行就可以了

## 类型声明

在变量名字后声明变量类型

函数则是也要设置返回值类型

在该变量使用过程中只能设置变量为该类型，不可改变

如果变量不声明类型则 ts 可以自动检测变量类型并自行设置

```ts
let a: number = 23
let b: number | string = '233'
b = 233 // b 可以设置为 数字 或 字符串，可以多个或

function test(num:number): number {
  return num
}
```

### 类型列表

  |  类型   |       例子        |              描述              |
  | :-----: | :---------------: | :----------------------------: |
  | number  |    1, -33, 2.5    |            任意数字            |
  | string  | 'hi', "hi", `hi`  |           任意字符串           |
  | boolean |    true、false    |       布尔值true或false        |
  | 字面量  |      其本身       |  限制变量的值就是该字面量的值  |
  |   any   |         *         |            任意类型            |
  | unknown |         *         |         类型安全的any          |
  |  void   | 空值（undefined） |     没有值（或undefined）      |
  |  never  |      没有值       |          不能是任何值          |
  | object  |  {name:'孙悟空'}  |          任意的JS对象          |
  |  array  |      [1,2,3]      |           任意JS数组           |
  |  tuple  |       [4,5]       | 元素，TS新增类型，固定长度数组 |
  |  enum   |    enum{A, B}     |       枚举，TS中新增类型       |

字面量如下：
```ts
let a: 10 | 20; // 设置 a 的值只能为 10 或者 20
```

any 类型设置后变量变得跟 js变量 一个性质，不推荐而且在开发中不常用

any 自己可以赋值给任意变量

unknown 代表为未知类型

unknown 自己无法赋值给任意变量

可以用 if 判断类型是否相符并进行赋值

### 类型断言

直接将某变量看作某个类型

可以用来告诉解析器变量的实际类型

```ts
let ee: unknown
ee = '2333'

let ss: string = '5'

 // 告诉解析器变量实际类型
ss == ee as string
ss == <string>ee
```

如果确定获取的某些元素不会发生变化，如下：
```ts
// 网页中已经设定好有 #food 元素，通过获取元素时末尾加上叹号来告诉编译器元素是能获取到的
class Food {
  element: HTMLElement;
  constructor(public x: number, public y: number) {
    this.element = document.getElementById('food')!;
  }
}
```
本质上是使 `null` 和 `undefined` 类型可以赋值给其他类型并通过编译，表示该变量值可空

### 函数返回值类型

函数返回值设置为 `void` 时你可以返回任何代表空的变量，如 `null undefined`

函数返回值设置为 `never` 时任何东西都不能返回，连 `undefined` 也是，一般用来报错

```ts
// never 表示永远不会返回结果
function fn2(): never {
    throw new Error('报错了！');
}
```

### object 类型

一般来说是指定对象值的类型：
```ts
// 携带问号代表该变量为可选
let a: {name: string, age?: boolean}

// 不设置 age 也可以
a = {name: 'qz'}


// [propName: string]: any 表示任意字符串类型的属性
// propName 代表任意名字的属性名，any 代表对应 value 值为任意属性
let c: {name: string, [propName: string]: any};

c = {name: '猪八戒', age: 18, gender: '男'};
```

### 设置函数结构的类型声明

```ts
let d: (a: number ,b: number)=>number
```

### 数组类型声明

一般数组中存储相同类型的结构

```ts
// string[] 表示字符串数组
let e: string[];
e = ['a', 'b', 'c'];

// number[] 表示数值数值
let f: number[];

let g: Array<number>;
g = [1, 2, 3];
```

### 元组

元组就是固定长度的数组，其效率更高

```ts
let h: [string, number];
h = ['hello', 123];
```

### 枚举

即设置多个值

```ts
/*
* enum 枚举
* */
enum Gender{
    Male = 1,
    Female = 0
}

let i: {name: string, gender: Gender};
i = {
    name: '孙悟空',
    gender: Gender.Male // 1
}
```

### 自定义类型

```ts
// 类型的别名
type myType = 1 | 2 | 3 | 4 | 5;
let k: myType;
let l: myType;
let m: myType;

k = 2;
```

## 编译选项

在编译 ts 文件时使用 `-w` 选项对文件进行监听，当文件变化时自动重新编译

```bash
tsc app.ts -w

# 监控整个目录，需要在当前目录下有个 tsconfig.json 文件
tsc -w
```

在 `tsconfig.json` 中常用的有 `compilerOptions`

  - 配置选项：

    - include

      - 定义希望被编译文件所在的目录

      - 默认值：["\*\*/\*"]

      - 示例：

        - ```json
          // ** 代表所有的目录  * 代表所有的文件 
          "include":["src/**/*", "tests/**/*"]
          ```

        - 上述示例中，所有src目录和tests目录下的文件都会被编译

    - exclude

      - 定义需要排除在外的目录

      - 默认值：["node_modules", "bower_components", "jspm_packages"]

      - 示例：

        - ```json
          "exclude": ["./src/hello/**/*"]
          ```

        - 上述示例中，src下hello目录下的文件都不会被编译

    - extends

      - 定义被继承的配置文件

      - 示例：

        - ```json
          "extends": "./configs/base"
          ```

        - 上述示例中，当前配置文件中会自动包含config目录下base.json中的所有配置信息

    - files

      - 指定被编译文件的列表，只有需要编译的文件少时才会用到

      - 示例：

        - ```json
          "files": [
              "core.ts",
              "sys.ts",
              "types.ts",
              "scanner.ts",
              "parser.ts",
              "utilities.ts",
              "binder.ts",
              "checker.ts",
              "tsc.ts"
            ]
          ```

        - 列表中的文件都会被TS编译器所编译

      - **compilerOptions**

        - 编译选项是配置文件中非常重要也比较复杂的配置选项

        - 在compilerOptions中包含多个子选项，用来完成对编译的配置

          - 项目选项

            - target

              - 设置ts代码编译的目标版本

              - 可选值：

                - ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext

              - 示例：

                - ```json
                  "compilerOptions": {
                      "target": "ES6"
                  }
                  ```

                - 如上设置，我们所编写的ts代码将会被编译为ES6版本的js代码

            - lib

              - 指定代码运行时所包含的库（宿主环境）- 一般来说可以不写

              - 可选值：

                - ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost ......

              - 示例：

                - ```json
                  "compilerOptions": {
                      "target": "ES6",
                      "lib": ["ES6", "DOM"],
                      "outDir": "dist",
                      "outFile": "dist/aa.js"
                  }
                  ```

            - module

              - 设置编译后代码使用的模块化系统

              - 可选值：

                - CommonJS、UMD、AMD、System、ES2020、ESNext、None

              - 示例：

                - ```typescript
                  "compilerOptions": {
                      "module": "CommonJS"
                  }
                  ```

            - outDir

              - 编译后文件的所在目录

              - 默认情况下，编译后的js文件会和ts文件位于相同的目录，设置outDir后可以改变编译后文件的位置

              - 示例：

                - ```json
                  "compilerOptions": {
                      "outDir": "dist"
                  }
                  ```

                - 设置后编译后的js文件将会生成到dist目录

            - outFile

              - 将所有的文件编译为一个js文件

              - 默认会将所有的编写在全局作用域中的代码合并为一个js文件，如果module制定了None、System或AMD则会将模块一起合并到文件之中

              - 示例：

                - ```json
                  "compilerOptions": {
                      "outFile": "dist/app.js"
                  }
                  ```

            - rootDir

              - 指定代码的根目录，默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过rootDir可以手动指定根目录

              - 示例：

                - ```json
                  "compilerOptions": {
                      "rootDir": "./src"
                  }
                  ```

            - allowJs

              - 是否对js文件编译

            - checkJs

              - 是否对js文件进行检查

              - 示例：

                - ```json
                  "compilerOptions": {
                      "allowJs": true,
                      "checkJs": true
                  }
                  ```

            - removeComments

              - 是否删除注释
              - 默认值：false

            - noEmit

              - 不对代码进行编译
              - 默认值：false

            - sourceMap

              - 是否生成sourceMap
              - 默认值：false

              

          - 严格检查

            - strict
              - 启用所有的严格检查，默认值为true，设置后相当于开启了所有的严格检查
            - alwaysStrict
              - 总是以严格模式对代码进行编译
            - noImplicitAny
              - 禁止隐式的any类型
            - noImplicitThis
              - 禁止类型不明确的this
            - strictBindCallApply
              - 严格检查bind、call和apply的参数列表
            - strictFunctionTypes
              - 严格检查函数的类型
            - strictNullChecks
              - 严格的空值检查
            - strictPropertyInitialization
              - 严格检查属性是否初始化

          - 额外检查

            - noFallthroughCasesInSwitch
              - 检查switch语句包含正确的break
            - noImplicitReturns
              - 检查函数没有隐式的返回值
            - noUnusedLocals
              - 检查未使用的局部变量
            - noUnusedParameters
              - 检查未使用的参数

          - 高级

            - allowUnreachableCode
              - 检查不可达代码
              - 可选值：
                - true，忽略不可达代码
                - false，不可达代码将引起错误
            - noEmitOnError
              - 有错误的情况下不进行编译
              - 默认值：false


## webpack 打包

在要写项目的地方执行命令 `npm init -y`

下载构建工具


```bash
npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin html-webpack-plugin
```
       - 共安装了7个包
         - webpack
           - 构建工具webpack
         - webpack-cli
           - webpack的命令行工具
         - webpack-dev-server
           - webpack的开发服务器
         - typescript
           - ts编译器
         - ts-loader
           - ts加载器，用于在webpack中编译ts文件
         - html-webpack-plugin
           - webpack中html插件，用来自动创建html文件
         - clean-webpack-plugin
           - webpack中的清除插件，每次构建都会先清除目录

### webpack 配置

#### babel

用于兼容低版本浏览器

安装
```
cnpm i -D @babel/core @babel/preset-env babel-loader core-js
```

#### 配置参考

webpack.config.js
```js
const path = require('path')
const HTMLplugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  // 入口文件
  entry: './src/index.ts',
  // 输出位置
  output: {
    // 得是绝对路径，所以使用 path 将路径变成绝对的
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',

    // 打包环境
    environment: {
      // 打包时禁用箭头函数
      arrowFunction: false
    }
  },
  // module
  module: {
    // 指定加载规则
    rules: [
      {
        // 匹配所有以 ts 结尾的文件
        test: /\.ts$/,
        // 指定使用的 loader
        use: [
          {
            // 指定编译器
            loader: 'babel-loader',
            // babel设置
            options: {
              // 设置环境
              presets: [
                [
                  // 指定环境插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 指定兼容浏览器版本
                    targets: {
                      "ie": "9"
                    },
                    // 指定 corejs 版本
                    "corejs": "3.23.4",
                    // 使用 corejs 的方法，"usage" 代表按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 排除的文件
        exclude: /node_modules/
      }
    ],
  },
  // 配置 webpack 插件
  plugins: [
    // html 模板
    new HTMLplugin({
      title: 'test',
      template: './src/index.html'
    }),
    new CleanWebpackPlugin({

    })
  ],
  resolve: {
    // 以 ts 或 js 结尾的文件均可作为模块引用
    extensions: ['.ts', '.js']
  }
}
```
tsconfig.json
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2015"
  }
}
```

## ts 中的类

跟 js 差不多，只是变量需要声明类型

基本示例：
```ts
class Animal {

  // 定义实例属性
  // readonly name: string = '孙悟空';
  name = '孙悟空';

  // 在属性前使用static关键字可以定义类属性（静态属性）
  // static readonly age: number = 18;
  age = 18;
  // 构造器，对变量进行初始化
  constructor(name: string) {
    this.name = name
  }

  sayHiFromAnimal() {
    console.log("hi from Animal");
  }
}

class Dog1 extends Animal {
  constructor(name: string) {
    // 如果在子类中写了构造函数，在子类构造函数中必须对父类的构造函数进行调用
    super(name); // 调用父类的构造函数，新建一个父类的 this 对象
    // ES5的继承，实质上是先创造子类的实例对象this，然后再将父类的方法添加到this上（Parent.call(this)）.
    // ES6的继承，需要先创建父类的this，子类调用super继承父类的this对象，然后再加工。
  }
  // 子类如果不写构造函数则会默认添加上去

  sayHi = () => {
    console.log("hi");
    // super 相当于父类原型，这样子是调用父类原型上的方法
    super.sayHiFromAnimal()
  }
}

const myDog = new Dog1("wdnmd")

myDog.sayHi()

/*
*   以abstract开头的类是抽象类，
*       抽象类和其他类区别不大，只是不能用来创建对象
*       抽象类就是专门用来被继承的类
*       抽象类中可以添加抽象方法
* */
abstract class myPerson {
  name: string;
  constructor(name: string) {
    this.name = name
  }

  // 定义一个抽象方法
  // 抽象方法使用 abstract开头，没有方法体
  // 抽象方法只能定义在抽象类中，子类必须对抽象方法进行重写
  abstract sayHifromPerson(): void;
}

class myMan extends myPerson {
  sayHifromPerson(): void {
    console.log("sayHifromPerson")
  }
}

const man = new myMan("qz")

man.sayHifromPerson()

/*
*   接口用来定义一个类结构，用来定义一个类中应该包含哪些属性和方法
*   同时接口也可以当成类型声明去使用
*   类似于 C++ 的结构体
*
*   接口可以在定义类的时候去限制类的结构
*   接口中的所有的属性都不能有实际的值
*   接口只定义对象的结构，而不考虑实际值
*       在接口中所有的方法都是抽象方法
*
*   接口是 ts 独有的属性
* */
interface myInterface {
  name: string,
  age: number,

  speak(): void
}

// 可以声明多个同名接口，他们会自动合并
interface myInterface {
  gender: string
}

const human: myInterface = {
  name: 'ququ',
  age: 24,
  gender: 'man',
  speak() {
    console.log(111)
  }
}

// 用类去实现接口的方法如下
class classInterfalse implements myInterface {
  name: string;
  age: number;
  speak(): void {
    throw new Error("Method not implemented.");
  }
  gender: string = '男';
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

// 属性封装
class RealPerson {

  // 这种设置属性的方法是可以被任意修改的，会导致对象中的数据变得不安全
  unsafeName: string;
  /**
   * 属性修饰符可以限制属性是否可以被访问
   * 有三种属性关键字：public, private, protected
   * 这些关键字也是 ts 独有的，js 没有
   * 如果属性没声明则默认为 public
   * 
   * public 可以在类外被访问修改（包括子类
   * private 只能在当前类内访问和修改（通过对外暴露接口在外部进行修改
   * protected 受保护属性，只能在当前类和当前类的子类进行访问修改
   */
  private _name: string;
  protected age: number;
  constructor(name: string, age: number) {
    this.unsafeName = name
    this._name = name
    this.age = age;
  }

  /**
   * 要访问类内私有属性，可以定义一个对外暴露的方法，专门用来获取类内属性 
   * */
  getPrivateName(): string {
    return this._name
  }
  // 简写方式
  get name() {
    return this._name
  }
  /**
 * 要修改类内私有属性，可以定义一个对外暴露的方法，专门用来修改类内属性
 * 此时可以在这个 set 方法中对传入的值判断是否合法
 * */
  setPrivateName(val: string): void {
    this._name = val
  }
  // 简写方式
  set name(val: string) {
    this._name = val
  }
}

const realP = new RealPerson('big', 24)
// 可被修改
realP.unsafeName = 'small'
console.log(realP.getPrivateName())
// 简写方式修改值，相当于调用对象上的 get set 方法
console.log(realP.name)
realP.name = 'wdnmd'

// 泛型

/**
 *  在定义函数或是类时，如果遇到类型不明确就可以使用泛型
 *  类似于 C++ 模板
 *  使用泛型可以保持函数开启模板检查
 *  泛型 T 的确定是在传入参数值的类型确定的时候进行确定的
 *
 *  举例下面的 fn
 * 
 *  如果 a 传入的参数类型为 string ，则 `T1` 类型变为 string ，相当于自动推断类型
 */
function fn<T1, T2>(a: T1, b: T2): T1 {
  return a
}
fn(2)
/**
 * 如果类型太复杂使得 ts 无法判断
 * 则可以手动声明类型是什么
 */
fn<string, number>('2333', 1)

/**
 * 泛型范围限制
 * 使用接口进行限制
 */
interface TemplateInter {
  length: number;
}

/**
 * 该函数 a 参数继承了 TemplateInter
 * 根据接口设定，此时 a 身上必须要有 length 属性
 * 相当于限定了传入的参数身上必须要有什么属性才可以传入
 */
function fn2<T extends TemplateInter>(a: T): number {
  return a.length;
}

/**
 * 类定义泛型 T
 */
class TemplateClass<T> {
  constructor(public name: T) { }
}

const TC = new TemplateClass<string>('hi')
```


### constructor 的简易写法
```ts
class A {
  constructor(public name: string,private age: number) {}
}
```
这样子相当于在类中声明变量并赋值，相当于一个 ts 的语法糖