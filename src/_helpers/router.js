import Vue from 'vue';
import Router from 'vue-router';

import KanbanPage from '../home/KanbanPage'
import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'
import GanttState from '../projectState/GanttState'
import ProjectState from '../projectState/ProjectState'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/kanban', component: KanbanPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/gantt', component:  GanttState},
    { path: '/state', component:  ProjectState},

    // otherwise redirect to home
    { path: '*', redirect: '/kanban' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})