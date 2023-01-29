<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-27 20:51:11
 * @FilePath: \blog-vue\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <div class="editor">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="hanledChanged"
      />
   
  </div>
</template>

<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  components: { Editor, Toolbar },
  data:()=>{
    return {
      dialogVisible:false,
      diaryTitle:""

    }
  },
  methods:{
   
  },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = ref("<p>hello</p>");

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      // setTimeout(() => {
      //     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
      // }, 1500)
    });
    const toolbarConfig = {};
    const editorConfig = { placeholder: "请输入内容..." };
    editorConfig.MENU_CONF["uploadImage"] = {
      fieldName: "your-custom-name",

      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 1 * 1024 * 1024, // 1M

      // 最多可上传几个文件，默认为 100
      maxNumberOfFiles: 10,

      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: [],

      // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
      meta: {
        token: "xxx",
        otherKey: "yyy",
      },

      // 将 meta 拼接到 url 参数中，默认 false
      metaWithUrl: false,

      // 自定义增加 http  header
      headers: {
        Authorization: localStorage.getItem("TOKEN")
      },

      // 跨域是否传递 cookie ，默认为 false
      withCredentials: true,

      // 超时时间，默认为 10 秒
      timeout: 5 * 1000, // 5 秒
      // // 上传之前触发
      // onBeforeUpload(file: File) { // TS 语法
      onBeforeUpload(file) {
        debugger;
        // JS 语法
        // file 选中的文件，格式如 { key: file }
        return file;

        // 可以 return
        // 1. return file 或者 new 一个 file ，接下来将上传
        // 2. return false ，不上传这个 file
      },

      // 上传进度的回调函数
      // onProgress(progress: number) {  // TS 语法
      onProgress(progress) {
        // JS 语法
        // progress 是 0-100 的数字
        console.log("progress", progress);
      },

      // 单个文件上传成功之后
      // onSuccess(file: File, res: any) {  // TS 语法
      onSuccess(file, res) {
        // JS 语法
        console.log(`${file.name} 上传成功`, res);
      },

      // 单个文件上传失败
      // onFailed(file: File, res: any) {   // TS 语法
      onFailed(file, res) {
        // JS 语法
        console.log(`${file.name} 上传失败`, res);
      },

      // // 上传错误，或者触发 timeout 超时
      // onError(file: File, err: any, res: any) {  // TS 语法
      onError(file, err, res) {
        // JS 语法
        console.log(`${file.name} 上传出错`, err, res);
      },
    };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    const hanledChanged = (e) => {
    };

    return {
      editorRef,
      valueHtml,
      mode: "default", // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      hanledChanged,
    };
  },
};
</script>

<style lang="less" scoped>


  .editor {
    width: 88%;
    border: 1px solid;
    border-radius: 4px;
    padding: 8px;
    background: white;
  }

</style>
