import { createRouter, createWebHistory } from 'vue-router'
import About from "@/components/About.vue"
import Design from "@/components/Design.vue"
import FullStack from "@/components/FullStack.vue"
import Home from "@/components/Home.vue"
import Photo from "@/components/Photo.vue"
import UX from "@/components/UX.vue"
import Video from "@/components/Video.vue"

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/webdev',
      name: 'Web Development',
      component: FullStack,
    },
    {
      path: '/ux',
      name: 'UX',
      component: UX,
    },
    {
      path: '/design',
      name: 'Design',
      component: Design,
    },
    {
      path: '/photography',
      name: 'Photography',
      component: Photo,
    },
    {
      path: '/videography',
      name: 'Video',
      component: Video,
    },
    {
      path: '/About',
      name: 'About',
      component: About,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      return { top: 0 }
    }
  })
  
export default router