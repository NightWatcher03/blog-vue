/*
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-31 11:50:33
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-11-11 19:59:37
 * @FilePath: \blog-vue\src\views\mock.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
 export const article={
    id:"zhttty",
    title:"JS的原型链及继承",
    preface:"JS中每个对象都有一个prototype属性，它指向的就是这个对象的原型，而这个原型的值也是一个对象，因此它也有自己的原型，就这样串联成立一条原型链.原型链的尽头时object,它的prototye比较特殊，值为null原型链就是，如果在对象上没有找到需要的属性或方法引用，引擎就会在它 的prototye关联的对象上找。如果在后者中也没有找到，则就在后者的prototye关联的对象上找，以此类推。一直到object.prototype原型对象（null）为止。",
    tags:["JavaScript","语言基础","笔记"],
    author:"守夜人",
    // createTime:"2022/10/31 11:58",
    updateTime:"2022/10/31 11:58",
    href:"",
}
 
export const diary={
    content:`<h3 style="text-align: center;">道生一，一生二，二生三，三生万物</h3><pre><code >hello world</code></pre><p>a</p><p>a</p><p>a</p><p>a</p><p><br></p><p>a</p><p>a</p><p>a</p><p><br></p><p>a</p><p>a</p><p>a</p><p>a</p><p><br></p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p>a</p><p><br></p><p>a</p><p>a</p><p>a</p><p><br></p>`,
    createTime:"2022/10/31 11:58",
    author:"守夜人",
    title:"道家无上法门"
}


// export {article};