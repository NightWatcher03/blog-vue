/*
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-25 22:19:38
 * @FilePath: \blog-vue\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createStore } from 'vuex'
import {getArticleList,getTagList,getWebInfo,getDiaryList} from '@/system/api';

export default createStore({
  state: {
    userInfo: {
      isLogin: false,
      userId: null,
      userName: null,
    },
    siteInfo: {
      id: "",
      webName: "",
      headerUrl: null,
      siderSaying: "",
      diarySaying: "",
      visitorCount: 0,
      otherUrls: [],
    },
    visible: {
      loginVisible: false
    },
    tagList:[],
    tagMap:{},
    checkedTag:"",
    articleList:[],
    checkedArticle:{
      author:"守夜人",
      content:"hello world",
      title:"",
      createTime:"",
      tags:[],
      preface:"",
      id:""
    },
    diaryList:[],
    checkedDiary:{
      id:"",
      createTime:"",
      content:"<p>hello</p>",
      title:""
    }
  },
  getters: {
  },
  mutations: {
    setVisible(state, visible) {
      state.visible = visible;
    },
    setState(state,info){
      const {name,data}=info;
      state[name]=data;
    },
  },
  actions: {
    //网站基本信息
    getInfo(context,params){
      getWebInfo().then(res=>{
        context.commit("setState",{
          name:"siteInfo",
          data: {
              diarySaying: res.diarySaying,
          headerUrl: res.headerUrl,
          otherUrls: res.otherUrls,
          siderSaying: res.siderSaying,
          visitorCount: res.visitorCount,
          webName: res.webName,
          id: res._id,
            }
        })
      })
    },

    //文章列表
    getArticles(context,params){
      getArticleList(params).then(res=>{
        context.commit('setState',{
          name:"articleList",
          data:res.map(item=>{
            return {
              id:item._id,
              title:item.title,
      author:item.author,
      createTime:item.createTime,
      tags:item.tags,
      preface:item.preface,
            }
          })
        })
      })
      
    },

    //标签
    getTags(context,params){
      getTagList().then(res=>{
        let obj={};
        let list=res.map(item=>{
          obj[item.key]=item.name;
          return {
            id:item._id,
            key:item.key,
            name:item.name,
            createTime:new Date(parseInt(item.createTime))
          }
        })
        context.commit("setState",{
          name:"tagList",
          data:list
        })
        context.commit("setState",{
          name:"tagMap",
          data:obj
        })
      })
    },

    //日记
    getDiary(context,params){
      getDiaryList().then(res=>{
        context.commit("setState",{
          name:"diaryList",
          data:res.map(item=>{
            return {
                title:item.title,
        author:item.author,
        createTime:item.createTime,
        content:item.content,
        id:item._id,
        isOpen:false
              }
          })
        })
        
      })
    }
  },
  modules: {
  }
})
