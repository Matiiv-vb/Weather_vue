import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/saved",
    name: "saved",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Saved.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
