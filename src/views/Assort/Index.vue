<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-25 22:20:44
 * @FilePath: \blog-vue\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->


<template>
    <div class="common-content">
        <div class="tag-header">
          <el-input v-model="searchStr" placeholder="Please input" class="search">
            <template #append>
              <el-button  ><el-icon><Search /></el-icon></el-button>
            </template>
          </el-input>
          <div style="margin-top:8px;width: 80%;">
            <h2 style="display:inline">标签：</h2>
            <a   :class="`tag ${!this.$store.state.checkedTag.length?active:null}`" key="all" v-on:click="tagClick"><span>
              全部
            </span>
          </a>
            <a  v-for="{name,key} in this.$store.state.tagList" :class="`tag ${key==this.$store.state.checkedTag?active:null}`" :key="key" v-on:click="tagClick(key)"><span>
              {{
                name
            }}
            </span>
          </a>
          
          </div>
        </div>
        <div class="tag-content">
          <div
      class="content_item"
      v-for="{ title, preface, tags, author, createTime, id } in articleList"
      :key="id"
    >
      <el-card class="box-card">
        <h1 class="card-title">{{ title }}</h1>
        <div class="des">
          {{ preface }}
        </div>
        <div class="footer">
          <div class="footer-info">
            <div class="author">
              <el-icon><Avatar /></el-icon>
              <el-link>{{ author }}</el-link>
              <!-- <a >{{author}}</a> -->
            </div>
            <el-divider direction="vertical" />
            <div class="author">
              <el-icon><Clock /></el-icon>
              <span>{{ formatTime(createTime) }}</span>
            </div>
            <el-divider direction="vertical" />
            <div class="author">
              <el-icon><CollectionTag /></el-icon>
              <a class="tag" v-for="(item, index) in tags" :key="index" v-on:click="tagClick(item)">{{
                this.$store.state.tagMap[item]
              }}</a>
            </div>
          </div>
        </div>
      </el-card>
    </div>
        </div>
    </div>
  </template>
  
  <script  >
  import { defineComponent } from 'vue';
  import {format} from '@/untils/utils';
  import {useStore} from 'vuex';
  import {
  Avatar,
  Clock,
  CollectionTag,
  DArrowRight,Search
} from "@element-plus/icons-vue";
  import { article } from "../mock";
  // import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
  
  export default defineComponent({
    name: 'Assort',
    components:{
      Search,
      Avatar,
    Clock,
    CollectionTag,
    DArrowRight,
    },
    data:()=>{
      return {
        checkedTag:"",
        active:"active",
        searchStr:"",
        articleList: [],
      }
    },
    async created(){
      const {articleList,checkedTag}=this.$store.state;
     this.tagClick(checkedTag)
    },
    methods:{
      formatTime(str){
      return format(parseInt(str))
    },
      tagClick(key){
        let tagKey="";
        if(key.length){
          this.articleList = this.$store.state.articleList.filter(item=>item.tags.includes(key));
          tagKey=key;
        }else{
          this.articleList = this.$store.state.articleList;
        }
        this.$store.commit("setState",{
          name:"checkedTag",
          data:key
        })
      },
      onArticleClick(name, id) {
      this.$router.push({
        path: "/article/" + name,
        params: { name: name, id: id },
      });
    },
    }
  
  });
  </script>
  
  <style lang="less" scoped>
.common-content{
  margin-left: 100px;
  width: calc(100% - 200px);
  border-radius: 4px;
.tag-header{
  padding-bottom: 8px;
  width: 100%;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 4px;
    .search{
      width: 80%;
      margin-top: 16px;
    }
    .tag {
      color: #017e66;
      background-color: rgba(1, 126, 102, 0.08);
      display: inline-block;
      margin: 0 12px;
      padding: 0 12px;
      line-height: 32px;
      font-size: 18px;
      text-decoration: none !important;
      cursor: pointer;
      margin-top: 8px;
      font-weight: 600;
    }
    .active{
      color: white;
      background: #09ae8f
  }
      
    }
    .tag-list{
      margin-top: 8px;
      gap: 16px;
    }
    .tag:hover{
      color: white;
      background-color:#09ae8f
    }
 }
 .tag-content{
  width: 100%;
    .content_item {
      margin-top: 8px;
      width: 48%;
      display: inline-block;
      .box-card {
        width: 100%;
        .el-card__body {
          padding: var(--el-card-padding);
          display: flex;
          flex-direction: column;
          padding: 8px;
        }
        .card-title {
          height: 36px;
          width: 100%;
          text-align: start;
          font-size: 20px;
          font-weight: 900;
          display: block;
        }
        .des {
          height: 100px;
          text-align: start;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          font-size: 0.9em;
          line-height: 1.7em;
        }
        .footer {
          height: 68px;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          display: flex;
          .footer-info {
            height: 68px;
            display: flex;
            flex-direction: row;
            align-items: center;
            .author {
              display: flex;
              align-items: center;
              margin-left: 8px;
              gap: 8px;
              .tag {
                color: #017e66;
                background-color: rgba(1, 126, 102, 0.08);
                display: inline-block;
                margin: 0 5px;
                padding: 0 6px;
                line-height: 22px;
                font-size: 13px;
                text-decoration: none !important;
                cursor: pointer;
              }
              .tag:hover {
                background-color: #09ae8f;
              }
            }
            .author a {
              color: #9eabb3;
              text-decoration: none;
            }
            .author a:hover{
              color:#4b575f
            }
            .author span {
              color: #9eabb3;
              text-decoration: none;
            }
            
          }
          .to-detail {
            color: #9eabb3;
            text-decoration: none;
          }
          .to-detail:hover{
            color:#4b575f
          }
        }
      }
    }
    .content_item:nth-child(2n){
      float: right;
    }
  }
 
 
  
  </style>
  