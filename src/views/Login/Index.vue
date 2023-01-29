<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-12 14:10:53
 * @FilePath: \blog-vue\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <el-dialog
    v-model="dialogVisible"
    title="管理员登入"
    width="30%"
    :before-close="onCancel"
  >
    <div class="form">
      <div class="form-item">
        <span>账号:</span>
        <el-input
          style="width: 240px"
          v-model="userInfo.userName"
          placeholder="请输入管理员账号"
        />
      </div>
      <div class="form-item" style="margin-top: 16px">
        <span>密码:</span>
        <el-input
          style="width: 240px"
          v-model="userInfo.password"
          type="password"
          show-password
          placeholder="请输入密码"
        />
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onOk"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { adminLogin } from "@/system/api.js";
import { EnCrypt, DeCrypt } from "@/untils/secret/index";
import { ElMessage } from "element-plus";
import {} from "@element-plus/icons-vue";

export default defineComponent({
  components: {},
  name: "Login",
  watch: {
    "$store.state.visible.loginVisible"(newVal, oldVal) {
      this.dialogVisible = newVal;
    },
  },
  data: () => {
    return {
      dialogVisible: false,
      userInfo: {
        userName: "",
        password: "",
      },
    };
  },
  computed() {},
  methods: {
    onCancel() {
      let visible = {
        ...this.$store.state.visible,
        loginVisible: false,
      };
      this.$store.commit("setVisible", visible);
    },
    onOk() {
      const { password, userName } = this.userInfo;
      if (!password.length || !userName.length) {
        ElMessage({
          message: "有必填项未填",
          type: "error",
        });
      } else {
        const secretPassword = EnCrypt(this.userInfo.password);
        adminLogin({
          userName: userName,
          password: secretPassword,
        }).then((res) => {
          ElMessage({
            message: "登入成功",
            type: "sucess",
          });
          this.$store.commit("setVisible", {
            ...this.$store.state.visible,
            loginVisible: false,
          });
          this.$store.commit("setState", {
        name:"userInfo",
        data:{
            isLogin: true,
            userId: res._id,
            userName: res.name,
          }
      });

         
          window.localStorage.setItem('TOKEN',"Bearer "+res.token);
          window.localStorage.setItem('userName',res.name);
          window.localStorage.setItem('userId',res._id);
        });
      }
    },
  },
});
</script>

<style lang="less" scoped>
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
</style>
