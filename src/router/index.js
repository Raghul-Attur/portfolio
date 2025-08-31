import { createRouter, createWebHistory } from 'vue-router'
import About from "@/components/About.vue"
import Design from "@/components/Design.vue"
import FullStack from "@/components/FullStack.vue"
import Home from "@/components/Home.vue"
import Photo from "@/components/Photo.vue"
import UX from "@/components/UX.vue"
import Video from "@/components/Video.vue"
import UXDetailsPage from '@/components/UXDetailsPage.vue'

// ✅ Import your design project detail pages
import Preventika from '@/components/design/Preventika.vue'
import Phprojecct from '@/components/design/Phprojecct.vue'
import Villgro from '@/components/design/Villgro.vue'
import Chitram from '@/components/design/Chitram.vue'
import AyraMane from '@/components/design/AyraMane.vue'
import Locl from '@/components/design/Locl.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/ux/:id',
    name: 'UXProjectDetails',
    component: UXDetailsPage,
  },
  {
    path: '/dev',
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
    path: '/design/preventika',
    name: 'Preventika',
    component: Preventika,
  },
  {
    path: '/design/phprojecct',
    name: 'phProjecct',
    component: Phprojecct,
  },
  {
    path: '/design/Villgro',
    name: 'Villgro',
    component: Villgro,
  },
  {
    path: '/design/chitram',
    name: 'Chitram',
    component: Chitram,
  },
  {
    path: '/design/ayra-mane',
    name: 'Ayra Mane',
    component: AyraMane,
  },
  {
    path: '/design/locl',
    name: 'Lo.cl',
    component: Locl,
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
    return { top: 0, behavior: 'smooth' };
  }
});

export default router