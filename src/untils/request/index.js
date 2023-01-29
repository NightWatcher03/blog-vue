/*
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-12-01 18:27:18
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-27 21:05:49
 * @FilePath: \blog-vue\src\untils\request\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import axios from 'axios';
import qs from 'qs';
import { ElMessage } from 'element-plus'

const contentTypes={
    json: 'application/json; charset=utf-8',
  urlencoded: 'application/x-www-form-urlencoded; charset=utf-8',
  file: 'multipart/form-data',

}
const defaultOptions={
    widthCredentials:true,
    headers:{
        Accept: 'application/json',
        'Content-Type': contentTypes.json,
    },
    timeout:10000
}

 export const unToken=()=>{
    ElMessage({
        message:'用户过期,请重新登入',
        type:'error'
    });
    this.$router.push({
        path: "/home"
      });
    this.$store.commit("setState", {
        name:"userInfo",
        data:{
          isLogin: true,
        userId: window.localStorage.getItem("userId"),
        userName: window.localStorage.getItem("userName"),
        }
      });
   

}
export const useRequest=(
    url,
    data={},
    method='get',
    isToken=false,
    options={},
    contentType='json',
    prefixUrl='api'

)=>{
    if(!url){
        const error=new Error("请传入url")
        return Promise.reject(error);
    };
    const finalUrl=`/${prefixUrl}/${url}`;
    const newOptions={
        ...defaultOptions,
        ...options,
        headers:{
            'Content-Type':(options.headers && options.headers['Content-Type'])||
            contentTypes[contentType]
        },
        method
    }
    if(method==='get'){
        newOptions.params=data;
    }
    if(method!=='get' && method!=='head'){
        newOptions.data=data;
        if(data instanceof FormData){
            newOptions.headers={
                'x-requested-with':'XMLHttpRequest',
                'cache-control':'no-cache',
            }
        }else if(newOptions.headers['Content-Type']===contentTypes.urlencoded){
            newOptions.data=qs.stringify(data);
        }else{
            Object.keys(data).forEach((item)=>{
                if(data[item]===null ||
                    data[item]===undefined 
                    ){
                        delete data[item]
                        
                    }
            })
        }
    }
 
    //移除起始部分 / 所有请求url走相对路径
    axios.interceptors.request.use((request)=>{
        if(localStorage.getItem('TOKEN')){
            request.headers['Authorization']=localStorage.getItem('TOKEN')
        }
        // request.url=request.url.replace(/^\//,'');
            
        return request;
    })

    return axios({
        url:finalUrl,
        ...newOptions
    }).then(res=>{
        const data=res.data;
        if(data.code ==='200'){
            return Promise.resolve(data.data);
        }else{
            return Promise.reject(
                ElMessage({
                    message:data.message||'发生错误',
                    type:'error'
                })
            )
            
        }
    }).catch((error)=>{
        
        return Promise.reject(error);
    })

}


export const upload=(file,options)=>{

    const formData=new FormData();
    formData.append('file',file);//添加文件
    formData.append('form',JSON.stringify(options));//添加其他参数
    let config={
        url:'/api/index/upload',
        method:"post",
        data:formData,
        Headers:{
            'Content-Type':contentTypes[file],
            Accept: 'application/json',
        },
    }
    axios.interceptors.request.use((request)=>{
        request.url=request.url.replace(/^\//,'');
            request.headers['Authorization']=localStorage.getItem('TOKEN')
        
        return request;
    })
   
    return axios(config).then(res=>{
        const data=res.data;
        if(data.code==='200'){
            return Promise.resolve(data);
        }else{
            return Promise.reject(
                ElMessage({
                    message:data.message||'上传失败',
                    type:'error'
                })
            )
        }
    }).catch((error)=>{
       
        return Promise.reject(error);
    })
    //发送请求
   
}

