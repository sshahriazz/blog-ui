import { createWebHistory, createRouter } from "vue-router";

import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import DashBoard from "../views/DashBoard.vue";
import AddPost from "../views/AddPost.vue";
import UpdatePost from "../views/UpdatePost.vue";
import Comments from "../views/Comments.vue";
import Home from "../views/Home.vue";
import UserInfo from "../views/UserInfo.vue";
import UserProfile from "../views/UserProfile.vue";
import CommentsWithPost from "../views/CommentsWithPost.vue";

export const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "about",
    path: "/login",
    component: Login,
  },
  {
    name: "register",
    path: "/register",
    component: Register,
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: DashBoard
  },
  {
      name: 'addpost',
      path: '/addpost',
      component: AddPost
  },
  {
      name: 'updatepost',
      path: '/updatepost/:id',
      component: UpdatePost
  },
  {
      name: 'comments',
      path: '/comments/:id',
      component: Comments
  },
  {
      name: 'users',
      path: '/users',
      component: UserInfo
  },
    {
        name: 'userprofile',
        path: '/userprofile/:id',
        component: UserProfile
    },
    {
        name: 'postcomment',
        path: '/postcomment/:id',
        component: CommentsWithPost
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
