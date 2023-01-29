/*
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-12-01 23:13:54
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-25 21:29:22
 * @FilePath: \blog-vue\src\system\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {useRequest} from "@/untils/request";


//登入
export const adminLogin=(params)=>useRequest('users/login',params,'post');

export const checkUser=()=>useRequest("index/checkUser");


//基本信息
export const updateWebInfo=(params)=>useRequest('index/setWebInfo',params,'post');

export const getWebInfo=()=>useRequest('admin/getWebInfo');



//----------文章

//获取文章列表
export const getArticleList=(params)=>useRequest('admin/articleList',params);

//文章详情
export const getArticleDetail=(params)=>useRequest('admin/articleDetail',params,'post');

//新增文章
export const addArticle=(params)=>useRequest('index/addArticle',params,'post');
export const updateArticle=(params)=>useRequest('index/updateArticle',params,'post');
export const deleteArticle=(params)=>useRequest('index/delArticle',params,'post');
//-----标签c
export const getTagList=()=>useRequest('admin/tagList');
export const  setTagList=(params)=>useRequest('index/setTag',params,'post');
export const delTag=(params)=>useRequest('index/delTag',params,'post');

//----日记
export const getDiaryList=(params)=>useRequest('admin/diaryList',params);
export const getDiary=(params)=>useRequest('admin/getDiary',params,'post');
export const updateDiary=(params)=>useRequest('index/upDateDiary',params,'post');
export const delDiary=(params)=>useRequest('index/delDiary',params,'post')