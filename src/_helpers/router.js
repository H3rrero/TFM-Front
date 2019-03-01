import Vue from 'vue';
import Router from 'vue-router';

import KanbanPage from '../home/KanbanPage'
import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'
import GanttState from '../projectState/GanttState'
import ProjectState from '../projectState/ProjectState'
import TasksPage from '../tasks/TasksPage'
import BurndownState from '../projectState/BurndownState'
import BurndownSprint from '../projectState/BurndownSprint'

Vue.use(Router);

export const router = new Router({
  mode: 'hash',
  base: '/TFM-Front/',
  routes: [
    { path: '/kanban', component: KanbanPage },
    { path: '/tasks', component: TasksPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/gantt', component:  GanttState},
    { path: '/burndown', component:  BurndownState},
    { path: '/burndownSprint', component:  BurndownSprint},
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