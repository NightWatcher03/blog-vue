<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-28 23:00:40
 * @FilePath: \blog-vue\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="admin-content">
    <md-editor @upload-img="onUploadImg" v-model="info.content" />
    <div class="btns">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-upload
        auto-upload="false"
        v-model:file-list="fileList"
        :headers="uploadHeader"
        class="upload-demo"
        action="/api/index/upload"
        :on-success="handleSuccess"
        :limit="1"
        :on-error="unToken"
        name="file"
      >
        <el-button type="success">上传md文件</el-button>
      </el-upload>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
    >
      <div class="form">
        <div class="form-item">
          <span>标题:</span>
          <el-input
            style="width: 240px"
            v-model="info.title"
            placeholder="请输入文章标题"
          />
        </div>
        <div class="form-item" style="margin-top: 16px">
          <span>标签:</span>
          <el-select
            v-model="info.tags"
            multiple
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in this.$store.state.tagList"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            />
          </el-select>
        </div>
        <div class="form-item" style="margin-top: 16px">
          <span>时间:</span>
          <el-date-picker
            v-model="info.createTime"
            style="width: 240px"
            type="datetime"
            placeholder="Select date and time"
          />
        </div>
        <div class="form-item" style="margin-top: 16px">
          <el-input
            v-model="info.preface"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="请输入文章简介"
          />
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onConfirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive,computed } from "vue";
import { useStore } from "vuex";
import MdEditor from "md-editor-v3";
import { addArticle, updateArticle } from "@/system/api";
import {upload} from '@/untils/request';
import "md-editor-v3/lib/style.css";

const dialogVisible = ref(false);
const { dispatch,state } = useStore();
let article = computed(() => {return state.checkedArticle})

const info = reactive(article);
const uploadHeader = reactive({
  Authorization: localStorage.getItem("TOKEN")
});
const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        upload(file).then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );

  callback(res.map((item) => item.url));
};

const onSubmit = () => {
  dialogVisible.value = true;
};

const onConfirm = () => {
  const params=info.value;
  debugger;
  if (params.id) {
    updateArticle({
      ...params,
      createTime: params.createTime.getTime().toString(),
    }).then((res) => {
      ElMessage({
        type: "success",
        message: "修改成功",
      });
    });
  } else {
    addArticle({
      ...params,
      createTime: params.createTime.getTime().toString(),
    })
      .then((res) => {
        ElMessage({
          type: "success",
          message: "发布成功",
        });
      })
      .catch((err) => {
        ElMessage({
          type: "error",
          message: err,
        });
      });
  }
  dispatch("getArticles");
  dialogVisible.value = false;
};
const handleSuccess = (res) => {
  info.content = res.data;
};
</script>

<style lang="less" scoped>
.admin-content {
  width: 100%;
  border: 1px solid;
  height: 560px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  .btns {
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    gap: 32px;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .form-item {
      display: flex;
      flex-direction: row;
      gap: 8px;
      span {
        width: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
