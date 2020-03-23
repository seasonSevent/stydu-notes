# study-notes

# 关于前端学习的一些笔记

## css

* [垂直居中的几种方法](#垂直居中的几种方法)
* [grid实现底部置顶](#grid实现底部置底)
* [column实现瀑布流](#column实现瀑布流)
* [border实现三角形](#border实现三角形)


## javascript

* [alert消息弹窗](#alert消息弹窗)
* [this指向](#this指向)
---

### 垂直居中的几种方法

 1. `position` + `margin` 

``` css
    .box {
        max-width: 100vw;
        min-height: 100vh;
        position: relative;
    }

    .children {
        position: absolute;
        width: 100px;
        height: 100px;
        top: 50%;
        left: 50%;
        margin: -50px 0 0 -50px;
    }
```

 2. `position` + `transform` 

``` css
    .box {
        position: relative;
        max-width: 100vw;
        min-height: 100vh;
    }

    .children {
        position: absolute;
        width: 100px;
        height: 100px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
```

### `grid`实现底部置底

``` html
    <!-- 页面布局 -->
    <body>
        <header></header>
        <main></main>
        <footer></footer>
    </body>
```

```css
    /* css样式 */
    body{
        min-height:100vh;
        display:grid;
        grid-template-rows:auto 1fr auto;
    } 

    footer{
        grid-row-start:3;
        grid-row-end:4;
    }
```

### `column`实现瀑布流

```css
    /* 
        column-count:100px 4; 控制列的宽度和数量
        column-gap控制列之间的间距
        counter-reset: string 创建或重置一个或多个计数器 和counter-increment一起使用 
        注意的是counter-reset 后面的名字要和counter-increment 后面的名字一样
    */
    .gallery{
        column-count:3;
        column-gap:5px; 
        counter-reset:item-counter;
    }
    /* 
        break-inside:avoid; 来避免主框中中断点
        break-inside:auto | avoid | avoid-page | avoid-column | avoid-region
        auto
        允许(既不禁止也不强制)在主框中插入任何中断(页、列或区域)。
        avoid-page
        避免主框中任何页的中断点
        avoid-column
        避免主框中任何列的中断点
        avoid-region 
        避免原则框内的任何区域中断。
    */
    .gallery-item{
        box-sizing:border-box;
        break-inside:avoid;
        counter-increment:item-counter;
    }
```

### `border`实现三角形

```css
    /* 
        border的每个方向都是一个三角形，所以我们将border任意三个方向都透明就可以实现三角形
    */
    div{
        width:0;
        border-width:10px 20px;
        border-style:solid;
        border-color:#000 transparent transparent transparent;
    }
```

### `alert`消息弹窗

[css和javascript代码地址](https://github.com/seasonSevent/stydu-notes/tree/master/infomationAlert)

> 关于样式目前就只有`success`和`danger`两个样式需要样式可以自己添加
`class`名称规范`alert-xxx`就可以了,样式可以自己单独写一个`css`样式也可以在`alert.js`中添加修改。

> 关于使用只需要引入`alert.js`就可以直接调用`message(type,message)`即可，由于没有做一些判断处理，只有简单实现，建议格式如下：
> ``` javascript
>   message("success","添加成功!")
>   message("danger","添加失败!")
> ```

### `this`指向

在`javascript`中全局的`this`指向默认是指向`Window`，在`function`中`this`默认指向也还是`Window`,在全局和`function`的环境定义一个`let a = 111`的话`this.a`打印出来`undefined`，只有`a`将绑定到`this`的指向上打印`this.a`的时候才会返回`a`的值，代码如下：
> ```javascript
>  let a = 111;
>  console.log(this) // this => Window
>  console.log(this.a) // this.a => undefined 
>
>  function fn(){
>   let a = 111;
>   console.log(this) // this => Window
>   console.log(this.a) // this.a => undefined     
>  }
> 
>  this.a = a;　// this.a => undefined
> 
>  window.a = a;
>  console.log(this.a) // this.a => 111
>  
> ```
我们在`new`一个`function`的时候会发生`this`指向的改变,`this`会指向`function`,当然如果这个时候我们在`function`定义一个`a`变量，打印`this.a`的时候还是返回`undefined`，只有我们将`a`绑定到`this`上,才会返回`a`的值，代码如下:
> 一般我们要`new`一个`function`的时候，`function`的首字母应该大写,为了好区分构造函数和普通函数
> ```javascript
>  function Fn(){
>   　console.log(this) // this => fn{}
>     let a = 111;
>     console.log(this.a) // this.a => undefined
>     this.a = a;
>     console.log(this.a) // => 111 
> } 
>  let fn1 = new Fn()
> ```
>值得注意的是在对象的方法中使用一些回调函数或箭头函数中`this`指向也会被更改,获取不到我们想要获取的值。
