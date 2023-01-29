<!--
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-28 23:02:58
 * @FilePath: \blog-vue\src\views\Home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="admin-content">
    <el-table
      :data="tableData"
      class="form-content"
      style="width: 100%"
      height="518px"
    >
      <el-table-column fixed prop="id" label="id" width="240" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="author" label="作者" width="100" />
      <el-table-column prop="createTime" label="更新时间" />
      <el-table-column prop="tags" label="标签" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.row.title, scope.row.id)"
            >修改</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="form-footer">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="20"
        @current-change="onCurrentChange(index)"
        :total="this.$store.state.articleList.length"
      />
      <div class="footer.btnList">
        <el-button type="primary" @click="tagVisible = true" plain
          >标签管理</el-button
        >
        <el-button type="success" @click="diaryVisible = true" plain
          >日记管理</el-button
        >
        <el-button type="warning" plain>本站有关</el-button>
      </div>
    </div>
    <el-dialog
      v-model="tagVisible"
      title="标签管理"
      class="modal"
      style="width: 60%"
    >
      <el-table
        :data="this.$store.state.tagList"
        class="modal-form"
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="220"> </el-table-column>
        <el-table-column prop="name" label="标签名" width="140">
          <template #default="scope">
            <el-input v-model="scope.row.name" placeholder="Please input" />
          </template>
        </el-table-column>
        <el-table-column prop="key" label="Key" width="140">
          <template #default="scope">
            <el-input v-model="scope.row.key" placeholder="Please input" />
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="更新时间" width="260">
          <template #default="scope">
            <el-date-picker
              v-model="scope.row.createTime"
              type="datetime"
              placeholder="Select date and time"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="tagDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="success" @click="addTag" plain>新增</el-button>
          <el-button @click="tagVisible = false">取消</el-button>
          <el-button type="primary" @click="tagSubmit"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="diaryVisible" title="日记管理" width="900px">
      <el-table :data="diaryList" class="modal-form" style="width: 100%">
        <el-table-column prop="id" label="ID" width="240"> </el-table-column>
        <el-table-column prop="title" label="标题" width="180">
          <template #default="scope">
            <el-input v-model="scope.row.title" placeholder="Please input" />
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="更新时间">
          <template #default="scope">
            <el-date-picker
              v-model="scope.row.createTime"
              style="width: 240px"
              type="datetime"
              placeholder="Select date and time"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="scope">
            <el-button size="small" type="primary" @click="toDiary(scope.row.id)"
              >修改</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="diaryDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="diaryVisible = false">取消</el-button>
          <el-button type="primary" @click="diarySubmit"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { SuccessFilled, WarningFilled } from "@element-plus/icons-vue";
import { format } from "@/untils/utils";
import { useStore } from "vuex";
import { setTagList, delTag, delDiary, deleteArticle,getArticleDetail,getDiary } from "@/system/api";
export default {
  name: "Setting",
  components: {
    SuccessFilled,
    WarningFilled,
  },
  props: {
    checkTab: {
      type: Function,
    },
  },
  computed:{
    tableData(){
      return this.$store.state.articleList.map(item=>{
        return {
          ...item,
          createTime:format(parseInt(item.createTime))
        }
      }).slice((this.currentPage - 1) * 10, this.currentPage * 20);
    },
    diaryList(){
      return this.$store.state.diaryList.map((item) => {
      return {
        ...item,
        createTime: format(parseInt(item.createTime)),
      };
    });
    }
  },

  data: () => {
    return {
      tagVisible: false,
      diaryVisible: false,
      tableData: [],
      diaryList: [],
      currentPage: 1,
    };
  },
  methods: {
    onCurrentChange(index){
      this.articleList=this.$store.state.articleList.map((item) => {
          return {
            ...item,
            createTime: format(parseInt(item.createTime)),
          };
        })
        .slice((index - 1) * 10, index * 20);
    },
    formatTime(str) {
      return format(parseInt(str));
    },
    handleEdit(name, id) {
      getArticleDetail({id:id}).then(res=>{
        res['id']=res['_id'];
        delete res["_id"];
        delete res["__v"];
        this.$store.commit("setState",{
          name:"checkedArticle",
          data:{
            ...res,
            createTime: new Date(parseInt(res.createTime)),
          }
        })
        this.checkTab("create", id);
      })
      
    },
    handleDelete(info) {
      ElMessageBox.confirm("确认删除吗?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteArticle({ id: info }).then(() => {
            this.$store.dispatch("getArticles");
            ElMessage({
              type: "success",
              message: "删除完成",
            });
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消操作",
          });
        });
    },
    tagDelete(id) {
      delTag({ id: id })
        .then((res) => {
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        })
        .catch((err) => {
          throw err;
        });
    },
    addTag() {
      let list = this.$store.state.tagList;
      list.unshift({
        key: "add",
        name: "新增",
        createTime: new Date(),
      });
      this.$store.commit("setState", {
        name: "tagList",
        data: list,
      });
    },
    tagSubmit() {
      let list = this.$store.state.tagList;
      for (let i = 0; i < list.length; i++) {
        if (
          list.includes(
            (it) => it.key == list[i].key || it.name == list[i].name
          )
        ) {
          return ElMessage({
            type: "error",
            message: "保存失败,有重复key值或value值",
          });
        }
      }
      list.forEach((item) => {
        if (list.includes((it) => it.key == item.key || it.name == item.name)) {
          return ElMessage({
            type: "success",
            message: "保存成功",
          });
        }
      });
      setTagList(
        list.map((item) => {
          return {
            ...item,
            createTime: item.createTime.getTime().toString(),
          };
        })
      ).then((res) => {
        this.$store.dispatch("getTags");
        ElMessage({
          type: "success",
          message: "保存成功",
        });
      });
    },
    diaryDelete(info) {
      ElMessageBox.confirm("确认删除吗?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delDiary({ id: info }).then(() => {
            this.$store.dispatch("getDiary");
            ElMessage({
              type: "success",
              message: "删除完成",
            });
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消操作",
          });
        });
    },
    toDiary(id) {
      getDiary({id:id}).then(res=>{
        let diary=res;
        diary["id"]=diary["_id"];
        delete diary["_id"];
        delete diary["__v"];
        this.$store.commit("setState",{
          name:"checkedDiary",
          data:{
            ...diary,
            createTime: format(parseInt(diary.createTime)),
          }
        })
      })
      this.$router.push('/diary');
    },
    diarySubmit(info) {
      
    },
  },
};
</script>

<style lang="less" scoped>
.admin-content {
  width: 100%;
  .form-content {
    border: 1px solid;
    border-radius: 4px;
  }
  .form-footer {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .footer.btnList {
      margin-right: 8px;
    }
  }  .modal-form {
    height: 400px;
    overflow: auto;
    border: 1px solid;
    border-radius: 4px;
  }
}
</style>
