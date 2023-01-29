<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2023-01-03 23:02:44
 * @FilePath: \blog-vue\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div class="list">
        <el-card id="sider" style="width:100%">
            <div v-html="nodes"></div>
        </el-card>
    </div>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  import {  } from "@element-plus/icons-vue";
  
  export default defineComponent({
    components:{

    },
    props:["nodes"],
    data: () => {
      return {
        
      };
    },

    computed:{
        nodes(){
            return this.$props.nodes;
        }
    },
    mounted(){
        console.log("nodesa",this.$props);

    },
    created(){
        // console.log("nodes",nodes);
        console.log("nodes",this.$props.nodes);
    },
    methods: {
     
    },
  });
  </script>
  
  <style lang="less" scoped>
  .list{
    width: 380px;
    /* display: flex; */
    margin-left: 32px;
  }
  </style>
  