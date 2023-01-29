### 手写promise

#### 基本实现：

```js
function Promise(executor){
    this.promiseState='pendding';
    this.promiseResult=null;
    let _this=this;
    
    function resolve(val){
        _this.promiseState='resolved';
        _this.promiseResult=val;
    }
    
    function reject(val){
        _this.promiseState='rejected';
        _this.promiseResult=val;
    }
    try{
        executor(resolve,reject);
    }catch(err){
        reject(err)
    }
    function then(onResolved,onRejected){
        if(this.promiseState=='resolved'){
            onResolved(this.promiseResult);
        }
        if(this.promiseState=='rejected'){
            onRejected(this.promiseResult);
        }
    }
}
```

#### 解决异步实现：

以上基本可以实现简单的同步代码，但是当resolve在setTimeout等异步执行时，then中的state还是pendding状态，我们 就需要将成功和失败状态保存到各自的数组，一旦reject或者resolve,就调用它们

类似于发布订阅，先将then里面的两个函数存储起来，由于一个promise可以有多个then，所以存在同一个数组内

成功或失败时，forEach调用它们

```js
function Promise(executor){
    this.promiseState='pendding';
    this.promiseResult=null;
    const _this=this;
    //成功存放的数组
    this.onResolvedCallbacks=[];
    //失败存放的数组
    this.onRejectedCallbacks=[];
    function resolve(data){
        if(promiseState!=='pendding')return;
        _this.promiseState='resolved';
        _this.promiseResult=data;
        //一旦resolve执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach(fn=>fn());
    }
    function reject(data){
        if(promiseState!=='pendding')return;
        _this.promiseState='rejected';
        _this.promiseResult=data;
        //一旦reject执行，调用失败数组的函数
    }
    try{
        executor(resolve,reject)
    }catch(err){
        reject(err);
    }
}

Promise.prototype.then=function(onResolved,onRejected){
    if(this.promiseState=='resolved'){
        onResolved(this.promiseResult);
    }
    if(this.promiseState=='rejected'){
        onRejected(this.promiseResult)
    }
    //当状态state为pendding时
    if(this.promiseState=='pendding'){
        //将onResolved传入到成功的数组
        this.onResolvedCallbacks.push(()=>{
            onResolved(this.promiseResult)
        })
        //将onRejected传入到失败的数组
        this.onRejectedCallbacks.push(()=>{
            onRejected(this.promiseResult);
        })
    }
}
```

#### 解决链式调用：

我们常常用到new Promise().then().then(),这就是链式调用，用来解决回调地狱

1.为了达成链式，我们默认在第一个then里返回第一个promise。秘籍规定了一种方法，就是在then里面返回一个新的promise,称为promise2:promise2=new Promise((resolve,reject)=>{})

- 将这个promise2返回的值传递到下一个then中
- 如果返回一个普通值，则将普通值传递给下一个then中国

2.当我们在第一个then中return  了一个参数（参数未知，需要判断）。这个return 出来的新的promise就是onResolved()或者onRejected()的值

秘籍规定onResolved()或onRejected()的值，即第一个返回的值，叫做x,判断X的函数叫做resolvePromise

```js
function Promise(executor){
    this.promiseState='pendding';
    this.promiseResult=null;
    const _this=this;
    this.onResolvedCallbacks=[];
    this.onRejectedCallbacks=[];
    function resolve(data){
        if(promiseState!=='pendding')return;
        _this.promiseState='resolved';
        _this.promiseResult=data;
        _this.onResolvedCallbacks.forEach(fn=>fn());
    }
    function reject(data){
        if(promiseState!=='pendding')return;
        _this.promiseState='rejected';
        _this.promiseResult=data;
        _this.onRejectedCallbacks.forEach(fn=>fn())
    }
    try{
        executor(resolve,reject)
    }catch(err){
        reject(err);
    }
}

Promise.prototype.then=function(onResolved,onRejected){
    let promise2=new Promise((resolve,reject)=>{
        if(this.promiseState=='resolved'){
            let x=onResolved(this.promiseResult);
            resovlePromise(promise2,x,resolve,reject);
        }
        if(this.promiseState=='rejected'){
            let x=onRejected(this.promiseResult);
            resolvePromise(promise2,x,resolve,reject)
        }
        if(this.promiseState=='pendding'){
            this.onResolveCallbacks.push(()=>{
                let x=onResolved(this.promiseResult);
            resovlePromise(promise2,x,resolve,reject);
            })
            this.onRejectedCallbacks.push(()=>{
                let x=onRejected(this.promiseResult);
                resolvePromise(promise2,x,resolve,reject);
            })
        }
    })
    return promise2;
}
```

#### 完成resolvePromise函数

秘籍规定了一段代码，让不同的promise代码相互套用，叫做resolvePromise

- 如果x === promise2，则是会造成循环引用，会报错

判断x:

- x 不能是null
- x 是普通值，直接resolve(x)
- x是对象或者函数（包括promise），let  then=x.then
- 声明了then
- 如果then报错，则reject()
- 如果then 是个函数，则用call 执行then,第一个参数是this,后面是成功的回调和失败的回调
- 如果成功的回调还是promise，就继续递归解析

```js
function resolvePromise(promise2,x,resolve,reject){
    //循环引用报错
    if(x==promise2){
        //reject报错
        return reject(new TypeError('Chaining cycle detected foe promise'))
    }
    
    //防止多次调用
    let called;
    //x不是null，而且x 是对象或者函数
    if(x!=null&&(typeof x=='object'||typeof x=='function')){
        try{
        //A+规定，声明then=x .then的方法
        let then=x.then;
        //如果then是函数，就默认是promise了
        if(typeof then=='function'){
            //就让then执行 ，第一个参数是this 后面是成功的回调和失败的回调
            then.call((x,y)=>{
                //成功和失败只能调用一个
                if(called)return;
                called=true;
                //resolve的结果依旧是promise，那就继续解析
                resolvePromise(promise2,y,resolve,reject)
                
            },err=>{
                //成功和失败只能用一个
                if(called)return;
                called=true;
                reject(err);
            })
        }else{
            resolve(x);//直接成功即可
        }
        }catch(err){
            if(called)return;
            called=true;
            //取then出错了就不要在继续执行了
            reject(e)
        }
    }else{
        resolve(x);
    }
    }
}
```

#### promise.all()

```js
//获取所有的promise，都执行then,把结果放到数组，一起返回
Promise.all=function(promises){
    let arr=[];
    let i=0;
    function processData(index,data){
        arr[index]=data;
        i++;
        if(i==promises.length){
            resolve(arr)
        }
    }
    return new Promise((resolve,reject)=>{
        for(let i=0;i<promises.length;i++){
            promises[i].then(data=>{
                processData(i,data);
            },reject);
        }
    })
}
```



#### promise.race()