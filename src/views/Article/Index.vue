<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-11-01 22:13:28
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2023-01-03 22:19:43
 * @FilePath: \blog-vue\src\views\Article\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->


<template>
    <div  class="article">
      <div class="content">
        <div id="article" ref="content" v-highlight class="markdown-body article-content" v-html="article"></div>
        <ListSider :nodes="nodes"/>
      </div>
     
        <!-- <div class="footer">
          <div class="footer-item"><a href="">上一篇</a></div>
          <div class="footer-item"><a href="">上一篇</a></div>
        </div> -->
    </div>
  </template>
  
  <script >
  import { defineComponent } from 'vue';
  import md from '@/assets/promise.md';
  import ListSider from '@/components/Article-Sider.vue';
  import 'highlight.js/styles/github.css';
  import highlight from 'highlight.js';
  import {getArticleDetail} from '@/system/api';

  const marked=require('marked').marked;
  export default defineComponent({
    name: 'Article',
    components:{
      ListSider
    },
    data:()=>{
      return {
        article:null,
        nodes:[]
      }
    },
    methods:{
      
    },
    created(){
      let curId=this.$route.params.name;
     getArticleDetail({id:curId}).then(res=>{
        let content=marked(res.content)
        this.article=content;
        setTimeout(()=>{
        this.setList();
      },100)
      })
      
      
    },
    mounted(){
    
    },
    methods:{
      setList(){
        let res=[];
        let strs=["h1","h2","h3","h4","h5","h6"];
        for(let i=0;i<strs.length;i++){
          let nodes=this.$refs.content.getElementsByTagName(strs[i]);
          if(nodes.length){
            res.push({
              type:nodes[0].localName,
              value:nodes[0].innerText
            });
          }
        }
        console.log(res);
        this.nodes=res;

      }
    }
  
  });
  </script>
  
  <style lang="less" scoped>
.article{
  margin-left: 60px;
  border-radius: 4px;
  .content{
    display: flex;
    .article-content{
      padding: 16px;
      width: 980px;
      border-radius: 4px;
    }
  }

.footer{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .footer-item{
    height: 60px;
    border: 1px solid;
  }
}
 }
  
  </style>
  