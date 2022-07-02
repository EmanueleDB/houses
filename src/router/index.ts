import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Houses from "../components/Houses.vue";
import About from "../components/About.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "houses",
    component: Houses,
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
