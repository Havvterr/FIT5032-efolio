import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessRejectedView from '../views/AccessRejectedView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/access-rejected',
        name: 'AccessRejected',
        component: AccessRejectedView
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfileView,
        meta: { requiresAuth: true } // 需要认证的页面
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 导航守卫：检查用户是否已登录
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

    // 如果路由需要认证且用户未登录，则重定向到拒绝访问页面
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/access-rejected')
    } else {
        next()
    }
})

export default router
