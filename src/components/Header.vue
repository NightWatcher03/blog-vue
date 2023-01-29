<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-19 10:37:36
 * @FilePath: \blog-vue\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->


<template>

          <div class="title"><h1>{{this.$store.state.siteInfo.webName}}</h1></div>
          <el-menu
          :default-active="$route.path"
          class="menu"
          mode="horizontal"
          :select="handleSelect"
          router
        >
          <el-menu-item class="menu-item" index="/home" route="">守夜人</el-menu-item>
          <el-menu-item class="menu-item" index="/assort">标签</el-menu-item>
          <el-menu-item class="menu-item" index="/message">归档</el-menu-item>
          <el-menu-item class="menu-item" index="/diary">随心记</el-menu-item>
          <el-menu-item class="menu-item" index="/admin" v-if="this.$store.state.userInfo.isLogin">管理</el-menu-item>
        </el-menu>
  </template>
  
  <script >
  import { defineComponent } from 'vue';
  // import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
  
  export default defineComponent({
    name: 'Header',
    watch:{
      "$store.state.userInfo.isLogin" (newVal,oldVal){
        this.isAdmin=newVal;
      },
    },
    data:()=>{
      return {
        isAdmin:false,
      }
    },
    created(){
      this.isAdmin=this.$store.state.userInfo.isLogin;
    },
    methods:{
    }
  
  });
  </script>
  
  <style lang="less" scoped>
      .menu{
        width: 500px;
        opacity: 0.7;
        background: none;
        border: none;
        .menu-item{
          color: #FFF;
          font-size: 18px;
          font-weight: 800;
          background: none !important;
        }
      }
      .title{
        font-size: 22px;
    line-height: 22px;
        text-align: center;
        width: 210px;
        background: #126dc7;
        opacity: 0.8;
        color: #FFF;
        margin-left: 150px;
        border-radius: 2px;
        font-family: STXingkai;
      }  
  </style>
  