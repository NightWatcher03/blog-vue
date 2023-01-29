<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-27 20:49:51
 * @FilePath: \blog-vue\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="admin-content">
    <el-form :model="form" label-width="120px" class="user-form">
      <div class="avator">
        <span class="avator-label">头像</span>

        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          action="/api/index/upload"
          :on-preview="handlePreview"
          :on-success="handleSuccess"
          :limit="1"
          :on-exceed="handleExceed"
          :on-error="handleError"
          :headers="uploadHeader"
          name="file"
        >
          <el-avatar
            v-if="form.headerUrl"
            class="avatar-item"
            style="margin-left: 8px"
            :size="80"
            :src="form.headerUrl"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
      <el-form-item label="标题及名称">
        <el-input v-model="form.webName" />
      </el-form-item>
      <el-form-item label="右侧栏签名">
        <el-input
          v-model="form.siderSaying"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item label="日记签名">
        <el-input
          v-model="form.diarySaying"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="请输入"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { computed, reactive,on } from "vue";
import {useStore} from 'vuex';
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { upload } from "@/untils/request";
import {updateWebInfo,getWebInfo} from '@/system/api';

export default {
  components: { Plus },
  data: () => {
    return {};
  },
  created(){
  },
  setup(props) {
   
    const {state,dispatch} = useStore();
    const info=computed(()=>state.siteInfo);
    const form = reactive(info);
    const uploadHeader=reactive({
      Authorization: localStorage.getItem("TOKEN"),
    })
    const onSubmit = () => {
      updateWebInfo(form).then(res=>{
        dispatch("getInfo")
        ElMessage({
          message: "修改成功",
          type: "success",
        });
      })
    };
    const handlePreview = (e) => {
      console.log("e", e);
    };
    const handleSuccess = (res) => {
      if (res.code == "200") {
        form.headerUrl = res.url;
        ElMessage({
          message: "上传成功",
          type: "success",
        });
      } else {
        ElMessage({
          message: "上传失败",
          type: "error",
        });
      }
    };
    const handleError = (err) => {
      console.log("Err", err);
    };
    return {
      form,
      uploadHeader,
      onSubmit,
      handlePreview,
      handleSuccess,
    };
  },
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
  .avator {
    display: flex;
    flex-direction: row;
    gap: 8px;
    /* justify-content: center; */
    align-items: center;
    height: 108px;
    .avator-label {
      width: 106px;
      text-align: end;
    }
  }
  .avatar-uploader-icon {
    width: 80px;
    height: 80px;
    border: 1px solid;
    border-radius: 50%;
  }
  .user-form {
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    width: 60%;
  }
}
</style>
