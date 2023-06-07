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
  history: createWebHistory("/Weather_vue/"),
  routes,
});
export default router;
