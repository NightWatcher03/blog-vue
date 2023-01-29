<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2023-01-03 18:52:38
 * @FilePath: \blog-vue\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app" class="common-layout">
    <el-container class="container">
      <el-header class="header">
        <Header />
      </el-header>
      <el-main class="main">
        <div class="main-content" style="flex: 1">
          <router-view />
        </div>

        <Sider v-show="isShowSider" />
        
      </el-main>
      <Login />
    </el-container>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import "element-plus/dist/index.css";
import "highlight.js/styles/github.css";
import Sider from "@/components/Sider.vue";
import Header from "@/components/Header.vue";
import Login from "./views/Login/Index.vue";

import {useStore} from 'vuex'
import {checkUser } from "@/system/api";
import "github-markdown-css";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Sider,
    Login,
  },
  data: () => {
    return {
      activeIndex: "",
      isAdmin: true,
      isShowSider: false,
      timer:null,
    };
  },
  methods:{
    
  },
  mounted() {
    const {dispatch}=useStore();

    const token = window.localStorage.getItem("TOKEN");
    if(token){
      this.$store.commit("setState", {
        name:"userInfo",
        data:{
          isLogin: true,
        userId: window.localStorage.getItem("userId"),
        userName: null,
        }
      });
      this.timer=setInterval(()=>{
        checkStatus()
      },1000*5*60)
    }
    //检查token是否过期
    const checkStatus=()=>{
      checkUser().then(res=>{
      }).catch(err=>{
        ElMessage({
        message:'用户过期,请重新登入',
        type:'error'
    });
    clearInterval(this.timer);
    this.$router.push({
        path: "/home"
      });
    this.$store.commit("setState", {
        name:"userInfo",
        data:{
          isLogin: false,
        userId: null,
        userName: null,
        }
      });
      window.localStorage.clear();
      })
      
    
    }
    dispatch("getInfo")
    dispatch("getArticles");
    dispatch("getTags");
  },
  watch: {
    $route(to, from) {
      this.checkRoute(to.path);
    },
  },

  methods: {
    handleSelect(key, path) {
      this.$store.dispatch("setState",{
        name:"navKey",
        data:key,
      })
    },
    checkRoute(url) {
      //检查路由控制右侧栏的显隐
     
      if (url == "/home") {
        // debugger;
        this.isShowSider = true;
      } else {
        this.isShowSider = false;
      }
    },
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .common-layout {
    display: flex;
    flex-direction: column;
    .container {
      .header {
        height: 72px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .header {
          height: 72px;
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .title {
          width: 210px;
          background: #126dc7;
          opacity: 0.8;
          color: #fff;
          margin-left: 150px;
          border-radius: 2px;
        }
      }
      .main {
        height: auto;
        width: 100%;
        display: flex;
        flex-direction: row;

        gap: 100px;
        justify-content: center;
      }
    }
  }
  a::after {
    display: none !important;
  }
}
body {
  display: block;
  margin: 0;
  padding: 0;

  /* 设定背景图片 */
  background-image: url("../public/image/naruto.jpeg");
  /* 让图片不重覆排列 */
  background-repeat: no-repeat;
  /* 固定背景图片位置 */
  background-attachment: fixed;
  /* 设定背景图片在右下角 */
  background-size: contain;
  background-size: cover;
}
</style>
