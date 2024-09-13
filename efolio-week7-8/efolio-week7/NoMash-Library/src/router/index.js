import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import FirebaseSigninView from '@/views/FirebaseSigninView.vue';
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue';
import AdminDashboardView from '@/views/AdminDashboardView.vue';
import { getAuth } from 'firebase/auth';

const routes = [
  { path: '/', name: 'About', component: AboutView },
  { path: '/home', name: 'Home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView },
  { path: '/FireRegister', name: 'FireRegister', component: FirebaseRegisterView },
  { path: '/admin-dashboard', name: 'AdminDashboard', component: AdminDashboardView, meta: { requiresAuth: true, requiresAdmin: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (to.meta.requiresAuth) {
    if (user) {
      if (to.meta.requiresAdmin) {
        if (user.uid === 'e757Gk3U5VM2sjdwQ8f65f0Xdag1') {
          next();
        } else {
          next('/');
        }
      } else {
        next();
      }
    } else {
      next('/FireLogin');
    }
  } else {
    next();
  }
});

export default router;