<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-24 15:12:33
 * @FilePath: \blog-vue\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->


<template>
    <div class="common-content">
      <el-timeline>
        <el-timeline-item  placement="top">
            <h3>{{`共计发表${this.$store.state.articleList.length}篇,继续加油！`}}</h3>
        </el-timeline-item>
        <el-timeline-item v-for="{ mTime,arr,key} in this.articleList" 
        :key="key" :timestamp="mTime" placement="top">
          <el-card style="margin-top:8px" v-for="{ title ,author, createTime, id } in arr " :key="id"  >
            <div class="author">
              <el-link style="argin-left: 16px;" @click="onArticleClick(title,id)"><h4>{{title}}</h4></el-link>
            </div>
            <div class="footer-info">
              <div class="author">
                <el-icon><Avatar /></el-icon>
                <el-link>{{ author }}</el-link>
              </div>
              <div class="author">
                <el-icon><Clock /></el-icon>
                <span>{{ formatTime(createTime) }}</span>
              </div>
            </div>
            
          </el-card>
        </el-timeline-item>

      </el-timeline>
    </div>
  </template>
  
  <script >
  import { defineComponent } from 'vue';
  import { article } from "../mock";
  import {format} from '@/untils/utils';
  import {
  Avatar,
  Clock,
  CollectionTag,
  DArrowRight,
} from "@element-plus/icons-vue";

  // import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
  
  export default defineComponent({
    name: 'Message',
    components:{
      Avatar,
  Clock,
  CollectionTag,
  DArrowRight,
    },
    data:()=>{
      return {
        articleList:[]
      }
    },
     created() {
    if(this.$store.state.articleList.length){
      this.initArticle(this.$store.state.articleList)
    }
    },
    watch:{
      "$store.state.articleList"(newVal,oldVal){
        this.initArticle(newVal)
      }
    },
    methods:{
      initArticle(articles){
        let mArr=[];
    let list = articles.sort((a,b)=>parseInt(a.createTime)-parseInt(b.createTime)).map((item,index)=>{
      let mTime=format(parseInt(item.createTime),"mTime");
      mArr.push(mTime);
      return {
        ...item,
        mTime:mTime
      }
    });
    let finalList=[];
    [...new Set(mArr)].forEach(item=>{
      let arr=[];
      list.forEach(it=>{
        if(it.mTime==item){
          arr.push(it)
        }
      })
      finalList.push({
        mTime:item,
        arr:arr
      })
    })

    this.articleList=finalList;
      },
      onArticleClick(name, id) {
      this.$router.push({
        path: "/article/" + id,
      });
    },
      formatTime(str){
      return format(parseInt(str))
    },

    }
  
  });
  </script>
  
  <style lang="less" scoped>
.common-content{
  margin-left: 100px;
padding: 8px;
width: calc(100% - 200px);
background: white;
border-radius: 4px;

/deep/ .el-timeline-item__timestamp.is-top {
  margin-bottom: 8px;
  padding-top: 4px;
  font-size: 16px;
  color: black;
  font-weight: 600;
}
.footer-info {
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .author {
    display: flex;
    align-items: center;
    margin-left: 8px;
    gap: 8px;
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
 }
  
  </style>
  