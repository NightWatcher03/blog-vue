<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2023-01-03 18:55:09
 * @FilePath: \blog-vue\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="sider">
    <div class="author-card">
      <div class="author-avatar">
        <div class="avatar-backgroud"></div>
        <el-avatar @dblclick="openLogin" class="avatar-item" :size="80" :src="this.$store.state.siteInfo.headerUrl" />
        <div class="avatar-blog-name">{{this.$store.state.siteInfo.webName}}</div>
      </div>
      <el-divider class="line" />
      <div class="author-sentence">
        <p>{{this.$store.state.siteInfo.siderSaying}}</p>
      </div>
      <el-divider class="line" />
      <div class="site-data">
        <div><span>文章:</span><span class="count">{{this.$store.state.articleList.length}}</span></div>
        <el-divider direction="vertical" />
        <el-divider direction="vertical" />
        <div><span>访客:</span><span class="count">{{this.$store.state.siteInfo.visitorCount}}</span></div>
      </div>
   
      <!-- <el-divider /> -->
      <!-- <div class="url-list">github|掘金</div> -->
    </div>
    <div class="tag-card">
      <el-card  style="width:100%">
          <div class="card-header">
            <el-icon><List /></el-icon>
            <span>标签</span>
          </div>
          <el-divider  />
          <div>
            <a class="tag" v-for="{name,key} in this.$store.state.tagList" :key="key"><span>
              {{
                name
              }}
            </span>
          <!-- <span>{{"("+count+")"}}</span> -->
          </a>
          </div>

          
      </el-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ElMessage } from 'element-plus'
import { Avatar,Clock,CollectionTag,DArrowRight,List } from "@element-plus/icons-vue";

export default defineComponent({
  components:{
    CollectionTag,List,
  },
  name: "Sider",
  data: () => {
    return {
      activeIndex: "1",
      tags:[{name:"JavaScript",count:10},{name:"语言基础",count:10},{name:"笔记",count:10},{name:"笔记2",count:10},{name:"笔记4",count:10}],
      avatarUrl: require("../../public/image/psb.png"),
    };
  },

  methods: {
    handleSelect(key, path) {
      this.activeIndex = key;
    },
    openLogin(){
      const {isLogin,userId,token}=this.$store.state.userInfo
      if(isLogin){
        ElMessage({
    message: '管理员已登陆',
    type: 'warning',
  })
      }else{
        let visible={
        ...this.$store.state.visible,
        loginVisible:true
      }
      this.$store.commit("setVisible",visible);
      }
      
    }
  },
});
</script>

<style lang="less" scoped>
.sider {
  width: 26%;
  margin-right: 40px;
  min-height: 342px;
  .line{
    width: 80%;
  }

  .author-card {
   
    width: 100%;
    border-radius: 2px;
    background: white;
    padding-bottom: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-card__body {
      padding: 0 !important;
    }

    .author-avatar {
      height: 260px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: white;
      width: 100%;
 
      .avatar-backgroud {
        height: 120px;
        background: wheat;
        background: url("../../public/image/backgroud.png");
    width: 100%;
      }
      .avatar-item {
        border: 6px solid;
        border: 6px solid;
        position: relative;
        bottom: 40px;
      }
      .avatar-blog-name {
        text-align: center;
        background: #126dc7;
        width: 200px;
        color: white;
        font-size: 20px;
        font-weight: 900;
        line-height: 2;
        margin-top: 16px;
        opacity: 0.8;
        position: relative;
    bottom: 40px;
    
      }
    }
    .site-data{
      display: flex;
    flex-direction: row;
    justify-content: center;
    .count{
      font-weight: 700;
      margin-left: 8px;
    }
    }
  }
  .tag-card {
    margin-top: 32px;
    min-height: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .tag-content{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .card-header{
      text-align: start;
      font-weight: 600;
      display: flex;
      align-items: center;
    }
    .tag {
      color: #017e66;
background-color: rgba(1, 126, 102, .08);
display: inline-block;
margin: 0 5px;
padding: 0 6px;
line-height: 22px;
font-size: 13px;
text-decoration: none !important;
cursor: pointer;
margin-top: 8px;
    }
    .tag:hover{
      background-color:#09ae8f
    }
  }
}
</style>
