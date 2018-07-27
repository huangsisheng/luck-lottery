import Vue from 'vue'
import Router from 'vue-router'
import Gift from "@/components/gift"
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      component:Gift
    }
  ]
})
