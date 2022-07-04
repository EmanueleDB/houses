import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import Home from "../components/Home/Home.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/house/:id",
    name: "listingDetails",
    component: () => import("../views/ListingDetails/ListingDetails.vue"),
    props: (route) => ({ ...route.params }),
  },
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
