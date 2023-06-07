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

const base =
  process.env.NODE_ENV === "production"
    ? "https://matiiv-vb.github.io/Weather_vue/"
    : "/";
const router = createRouter({
  history: createWebHistory(base),
  routes,
});
export default router;
