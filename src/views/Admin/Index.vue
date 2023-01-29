<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-25 22:21:27
 * @FilePath: \blog-vue\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="common-content">
    <el-tabs
      type="border-card"
      tab-position="left"
      v-model="checkedTab"
      stretch="true"
      style="min-height: 600px"
    >
      <el-tab-pane label="User" name="user">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Avatar /></el-icon>
            <span>用户</span>
          </span>
        </template>
        <User />
      </el-tab-pane>
      <el-tab-pane label="Create" name="create">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Promotion /></el-icon>
            <span>发布</span>
          </span>
        </template>
        <Create  />
      </el-tab-pane>
      <el-tab-pane label="Setting" name="setting">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Setting /></el-icon>
            <span>管理</span>
          </span>
        </template>
        <ArticleSetting :checkTab="checkTab" />
      </el-tab-pane>
      <el-tab-pane label="Other" name="other">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><MoreFilled /></el-icon>
            <span>其他</span>
          </span>
        </template>
        <Other
      /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  Avatar,
  Promotion,
  Setting,
  MoreFilled,
} from "@element-plus/icons-vue";

import User from "./components/User.vue";
import ArticleSetting from "./components/Setting.vue";
import Other from "./components/Other.vue";
import Create from "./components/Create.vue";

export default defineComponent({
  name: "Admin",
  components: {
    Avatar,
    Promotion,
    Setting,
    MoreFilled,
    User,
    ArticleSetting,
    Other,
    Create,
  },
  data: () => {
    return {
      checkedTab: "user",
    };
  },
  methods: {
    checkTab(name) {
      this.checkedTab = name;
    },
  },
});
</script>

<style lang="less" scoped>
.common-content {
  margin-left: 100px;
  padding: 8px;
  width: calc(100% - 200px);
  background: white;
  border-radius: 4px;
  /deep/.el-tabs--left .el-tabs__header.is-left {
    float: left;
    margin-bottom: 0;
    margin-right: 10px;
    height: 600px;
    .el-tabs__nav.is-left {
      float: none;
      display: flex;
      flex-direction: column;
      .el-tabs__item.is-left {
        border: 1px solid transparent;
        margin: -1px 0 -1px -1px;
        height: 60px !important;
      }
      .custom-tabs-label {
        display: flex;
        gap: 8px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
    }
  }
  /deep/.el-tabs__content {
    padding: 15px;
    height: 100%;
  }
}
</style>
