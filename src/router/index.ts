import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../components/Home/Home.vue";
import About from "../components/About.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
