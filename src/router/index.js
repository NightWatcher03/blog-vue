/*
 * @Author: NightWathcer03 1638831678@qq.com
 * @Date: 2022-10-30 18:14:39
 * @LastEditors: NightWathcer03 1638831678@qq.com
 * @LastEditTime: 2022-12-17 22:16:39
 * @FilePath: \blog-vue\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from 'vue-router';
import Article from '../views/Article/Index.vue';
import Content from '../views/Home/Content.vue';
import Assort from '../views/Assort/Index.vue';
import Message from '../views/Message/Index.vue';
import Diary from '../views/Diary/Index.vue';
import Admin from  '../views/Admin/Index.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect:'/home'
    // component: Content,
  },
  {
    path:'/home',
    name:"content",
    component:Content,
  },
  {
    path:'/article/:name',
    name:"article",
    component:Article,
  },
  {
    path:'/assort/',
    name:"assort",
    component:Assort,
  },
  {
    path:'/message',
    name:"message",
    component:Message,
  },
  {
    path:'/diary',
    name:"diary",
    component:Diary,
  },
  {
    path:'/admin',
    name:"admin",
    component:Admin,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
