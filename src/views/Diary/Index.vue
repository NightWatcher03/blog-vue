<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-25 22:20:38
 * @FilePath: \blog-vue\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="common-content">
    <div class="say">
      <div class="left_Icon">
        <h1>“</h1>
      </div>
      <div class="say_item">
        <h1>{{ this.$store.state.siteInfo.diarySaying }}</h1>
      </div>
      <div class="right_Icon">
        <h1>”</h1>
      </div>
    </div>
    <div class="box" v-if="this.$store.state.userInfo.isLogin">
      <div class="editor">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 500px; overflow-y: hidden"
          v-model="info.content"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
        />
      </div>
      <el-button class="submit" v-on:click="handleOpen" type="primary"
        >发布</el-button
      >
      <el-dialog
        v-model="dialogVisible"
        title="Tips"
        width="30%"
        :before-close="handleClose"
      >
        <div class="modal">
          <div class="modal-item">
            <span>文章标题:</span>
            <el-input
              style="width: 218px"
              v-model="info.title"
              placeholder="请输入文章标题"
            />
          </div>

          <div class="modal-item">
            <span>时间:</span>
            <el-date-picker
              v-model="info.createTime"
              style="width: 240px"
              type="datetime"
              placeholder="Select date and time"
            />
          </div>
        </div>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="onSubmit"> 保存 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <el-card
      class="box-card"
      v-for="{ id, content, title, createTime, isOpen } in this.$store.state
        .diaryList"
      :key="id"
    >
      <template #header>
        <div class="card-header">
          <div class="header-left">
            <h3>{{ title }}</h3>
            <div class="author">
              <el-icon><Clock /></el-icon>
              <span>{{ formatTime(createTime) }}</span>
            </div>
          </div>

          <el-button v-on:click="openDetail(id)" class="button" text
            >详情<el-icon v-if="isOpen"><ArrowDownBold /></el-icon
            ><el-icon v-else><ArrowLeftBold /></el-icon
          ></el-button>
        </div>
      </template>
      <div :class="`${isOpen ? styleOpen : styleClose}`" v-html="content"></div>
    </el-card>
  </div>
</template>

<script>
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  defineComponent,
  reactive,
  computed
} from "vue";
import {
  More,
  ArrowDownBold,
  ArrowLeftBold,
  Clock,
} from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { diary } from "../mock.js";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { updateDiary } from "@/system/api";
import { format } from "@/untils/utils";

export default defineComponent({
  name: "Diary",
  components: {
    More,
    Editor,
    Toolbar,
    ArrowDownBold,
    ArrowLeftBold,
    Editor,
    Clock,
  },
  data: () => {
    return {
      diaryList: [],
      styleOpen: "card-open",
      styleClose: "card-close",
    };
  },
  async created() {
    this.$store.dispatch("getDiary");
  },
  methods: {},
  setup() {
    const { dispatch, state } = useStore();
    const diary=computed(()=>state.checkedDiary);
    const info=reactive(diary);
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();
    const dialogVisible = ref(false);
    const handleClose = () => {
      dialogVisible.value = false;
    };
    const handleOpen = () => {
      dialogVisible.value = true;
    };

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      // setTimeout(() => {
      //     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
      // }, 1500)
    });
    const toolbarConfig = {};
    const editorConfig = { placeholder: "请输入内容..." };
    // editorConfig.MENU_CONF["uploadImage"] = {
    //   fieldName: "your-custom-name",

    //   // 单个文件的最大体积限制，默认为 2M
    //   maxFileSize: 1 * 1024 * 1024, // 1M

    //   // 最多可上传几个文件，默认为 100
    //   maxNumberOfFiles: 10,

    //   // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
    //   allowedFileTypes: ["image/*"],

    //   // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
    //   meta: {
    //     token: "xxx",
    //     otherKey: "yyy",
    //   },

    //   // 将 meta 拼接到 url 参数中，默认 false
    //   metaWithUrl: false,

    //   // 自定义增加 http  header
    //   headers: {
    //     Accept: "text/x-json",
    //     otherKey: "xxx",
    //   },

    //   // 跨域是否传递 cookie ，默认为 false
    //   withCredentials: true,

    //   // 超时时间，默认为 10 秒
    //   timeout: 5 * 1000, // 5 秒
    //   // // 上传之前触发
    //   // onBeforeUpload(file: File) { // TS 语法
    //   onBeforeUpload(file) {
    //     // JS 语法
    //     // file 选中的文件，格式如 { key: file }
    //     return file;

    //     // 可以 return
    //     // 1. return file 或者 new 一个 file ，接下来将上传
    //     // 2. return false ，不上传这个 file
    //   },

    //   // 上传进度的回调函数
    //   // onProgress(progress: number) {  // TS 语法
    //   onProgress(progress) {
    //     // JS 语法
    //     // progress 是 0-100 的数字
    //     console.log("progress", progress);
    //   },

    //   // 单个文件上传成功之后
    //   // onSuccess(file: File, res: any) {  // TS 语法
    //   onSuccess(file, res) {
    //     // JS 语法
    //     console.log(`${file.name} 上传成功`, res);
    //   },

    //   // 单个文件上传失败
    //   // onFailed(file: File, res: any) {   // TS 语法
    //   onFailed(file, res) {
    //     // JS 语法
    //     console.log(`${file.name} 上传失败`, res);
    //   },

    //   // // 上传错误，或者触发 timeout 超时
    //   // onError(file: File, err: any, res: any) {  // TS 语法
    //   onError(file, err, res) {
    //     // JS 语法
    //     console.log(`${file.name} 上传出错`, err, res);
    //   },
    // };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    const onSubmit = () => {
      updateDiary({
        ...info.value,
        createTime:info.value.createTime.getTime().toString(),
      }).then((res) => {
        if(info.id){
          ElMessage({
          type: "success",
          message: "修改成功",
        });
        }else{
          ElMessage({
          type: "success",
          message: "发布成功",
        });
        }
        dispatch("getDiary");
        dialogVisible.value = false;
      });
    };

    const formatTime = (str) => {
      return format(parseInt(str));
    };
    const openDetail = (id) => {
      let obj = state.diaryList.find((item) => item.id == id);
      obj["isOpen"] = !obj["isOpen"];
    };

    return {
      dialogVisible,
      editorRef,
      mode: "default", // 或 'simple'
      toolbarConfig,
      editorConfig,
      info,
      handleCreated,
      onSubmit,
      handleClose,
      handleOpen,
      formatTime,
      openDetail,
    };
  },
});
</script>

<style lang="less" scoped>
.common-content {
  margin-left: 100px;

  border-radius: 4px;
  width: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;

  .box {
    width: 100%;
    /* border: 1px solid; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: white;
    border-radius: 4px;
    padding: 8px;
    margin-top: 32px;
    .submit {
      margin-top: 32px;
      width: 120px;
    }
    .modal {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      .modal-item {
        display: flex;
        flex-direction: row;
        margin-top: 8px;
        span {
          width: 96px;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .box-card {
    margin-top: 32px;
    width: 100%;
    .card-header {
      display: flex;
      justify-content: space-between;
      line-height: 0;
      .header-left {
        display: flex;
        flex-direction: row;
        gap: 8px;
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
        .author a:hover {
          color: #4b575f;
        }
        .author span {
          color: #9eabb3;
          text-decoration: none;
        }
      }
      .button {
        width: 80px;
        border: 1px solid;
        .el-icon {
          width: 2em;
        }
      }
    }
    .card-close {
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
    .card-open {
      text-align: start;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      word-break: break-all;
      font-size: 0.9em;
      line-height: 1.7em;
    }
  }
  .say_item {
    font-family: STXingkai;
    /* width: 90%; */
    /* height: 60%; */
    line-height: 40px;
    /* margin-left: 4%; */
    text-align: center;
    color: black;
    font-size: 21px;
    font-family: STXingkai;
  }
  .say .left_Icon {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 30px;
    margin-left: 20px;
  }
  .say .right_Icon {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 30px;
    text-align: end;
    margin-right: 20px;
  }
  .say {
    width: 80%;

    box-shadow: 5px 5px 5px 5px #333232;
    border-radius: 1%;
    background-image: url("../../../public/image/naruto.jpeg");
    /* 让图片不重覆排列 */
    background-repeat: no-repeat;
    /* 固定背景图片位置 */
    background-attachment: fixed;
    /* 设定背景图片在右下角 */
    background-size: contain;
    background-size: cover;
  }
}
</style>
