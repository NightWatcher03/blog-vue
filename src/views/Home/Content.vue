<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-29 11:40:20
 * @FilePath: \blog-vue\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="content">
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
              <a class="tag" v-for="(item, index) in tags" :key="index" @click="tagClick(item)">{{
                this.$store.state.tagMap[item]
              }}</a>
            </div>
          </div>
          <el-link class="to-detail" @click="onArticleClick(title, id)"
            ><span>阅读全文</span> <el-icon><DArrowRight /></el-icon
          ></el-link>
        </div>
      </el-card>
    </div>
    <div class="footer">
      <el-pagination background layout="prev, pager, next"
      :current-page="currentPage"
      :page-size=10
      @current-change="onCurrentChange(index)"
      :total="articleList.length" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { article } from "../mock";
import {useStore} from 'vuex';
import {format} from '@/untils/utils';
import {
  Avatar,
  Clock,
  CollectionTag,
  DArrowRight,
} from "@element-plus/icons-vue";
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: "Content",
  components: {
    Avatar,
    Clock,
    CollectionTag,
    DArrowRight,
    useStore
  },
  data: () => {
    return {
      activeIndex: "1",
      // articleList: [],
      currentPage:1,
    };
  },
  computed:{
    articleList(){
      
      return this.$store.state.articleList.slice((this.currentPage-1)*10,this.currentPage*10);
    }
  },
  methods: {
    handleSelect(key, path) {
      this.activeIndex = key;
    },
    formatTime(str){
      return format(parseInt(str))
    },
    onCurrentChange(index){
      const {articleList}=this.$store.state;
      this.articleList=articleList.slice((index-1)*10,index*10);
    },
    onArticleClick(name, id) {
      this.$router.push({
        path: "/article/" + id,
      });
    },
    tagClick(key){
      this.$store.commit("setState",{
        name:"checkedTag",
        data:key
      })
      // this.$store.commit("setState",{
      //   name:"navKey",
      //   data:"/assort"
      // })
      this.$router.push({
        path: "/assort",
      });
    }
  },
});
</script>

<style lang="less" scoped>
.content {
  margin-left: 100px;
  .content_item {
    margin-top: 8px;
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
  .footer {
    height: 100px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
