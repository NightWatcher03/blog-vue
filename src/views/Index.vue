<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-11 22:37:55
 * @FilePath: \blog-vue\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->


<template>
  <div class="common-layout">
    <el-container class="container">
      <el-header class="header">
        <div class="title"><h1>守夜人'Blog</h1></div>
        <el-menu
        :default-active="activeIndex"
        class="menu"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item class="menu-item" index="1" route="">首页</el-menu-item>
        <el-menu-item class="menu-item" index="2">归纳</el-menu-item>
        <el-menu-item class="menu-item" index="3">留言</el-menu-item>
        <el-menu-item class="menu-item" index="4">随心记</el-menu-item>
        <el-menu-item class="menu-item" v-if="isAdmin" index="5">管理</el-menu-item>
      </el-menu>
    </el-header>
      <el-main class="main">
        <div class="mian-content" style="flex:1">
          
          <Content/>
        </div>
      
      <Sider/>
      </el-main>
      <Login/>
    </el-container>
  </div>
</template>

<script >
import { defineComponent } from 'vue';
import Content from './Home/Content.vue';
import Sider from'./Home/Sider.vue';
import Login from './Login/Index.vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components:{
    Content,
    Sider,
    Login
  },
  data:()=>{
    return {
      activeIndex:"",
      isAdmin:true
    }
  },
  methods:{
    handleSelect(key,path){
      this.activeIndex=key;
    }
  }

});
</script>

<style lang="less" scoped>
.common-layout{
  display: flex;
  flex-direction: column;
  .container{

    .header{
    height: 72px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .menu{
      width: 500px;
      opacity: 0.7;
      background: none;
      border: none;
      .menu-item{
        color: #FFF;
        font-size: 18px;
        font-weight: 800;
      }
    }
    .title{
      width: 210px;
      background: #126dc7;
      opacity: 0.8;
      color: #FFF;
      margin-left: 150px;
      border-radius: 2px;
    }
    }
    .main{
      height: auto;
      width: 100%;
      display: flex;
      flex-direction: row;
      padding-left: 100px;
    gap: 100px;
    }
  }
}

</style>
