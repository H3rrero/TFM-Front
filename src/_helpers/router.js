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
import SprintPage from '../sprints/SprintPage'
import CreateTask from '../home/CreateTask'
import CreatePhase from '../sprints/CreatePhase'
import AdminHome from '../admin/AdminHome'
import ManageUsersProject from '../admin/ManageUsersProject'
import ManageUsers from '../admin/ManageUsers'
import CreateUser from '../admin/CreateUser'
import AdminProjects from '../admin/AdminProjects'
import ManageProjects from '../admin/ManageProjects'
import CreateProject from '../admin/CreateProject'
import AllUsers from '../admin/AllUsers'
import AddProgrammer from '../admin/AddProgrammer'
import Addmanager from '../admin/Addmanager'
import UserToProject from '../admin/UserToProject'
import UserHome from '../home/UserHome'

Vue.use(Router);

export const router = new Router({
  mode: 'hash',
  base: '/TFM-Front/',
  routes: [
    { path: '/kanban/:id', component: KanbanPage },
    { path: '/tasks', component: TasksPage },
    { path: '/sprints', component: SprintPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/gantt', component:  GanttState},
    { path: '/burndown', component:  BurndownState},
    { path: '/burndownSprint/:id', component:  BurndownSprint},
    { path: '/state', component:  ProjectState},
    { path: '/newTask/:idPhase', component:  CreateTask},
    { path: '/newPhase', component:  CreatePhase},
    { path: '/admin', component:  AdminHome},
    { path: '/projects', component:  AdminProjects},
    { path: '/projectsadmin/:id/:name', component:  ManageProjects},
    { path: '/manusers/:id/:name', component:  ManageUsersProject, name:'manusers'},   
    { path: '/manageusers', component:  ManageUsers}, 
    { path: '/createuser/:id', component:  CreateUser}, 
    { path: '/createproject', component:  CreateProject}, 
    { path: '/userslist', component:  AllUsers},
    { path: '/addprogrammer/:id', component:  AddProgrammer, name:'addprogrammer'},
    { path: '/addmanager/:id', component:  Addmanager, name:'addmanager'},
    { path: '/usersproject', component:  UserToProject},
    { path: '/userhome', component:  UserHome},
    
    // otherwise redirect to home
    { path: '*', redirect: '/admin' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const adminPages = ['admin','manusers','createuser','projectsadmin','createproject','projects',
                      'manageusers','userslist','usersproject','addprogrammer','addmanager'];
  const managerPages = ['sprints'];
  
  const authRequired = !publicPages.includes(to.path);
  const managerRequired = managerPages.includes(to.path.split("/")[1]);
  const adminRequired = adminPages.includes(to.path.split("/")[1]);
  const loggedIn = localStorage.getItem('user'); 
  const user = JSON.parse(localStorage.getItem('user'));

  if (authRequired && !loggedIn ) {
    return next('/login');
  }else if(!authRequired){
    next();
  }else if(loggedIn){
    if(user.rol =='user' || user.rol =='manager'){
      if(adminRequired){
        return next('/userhome');
      }else if(user.rol=='user' && managerRequired){
        return next('/userhome');
      }else{
        next();
      }
    }
    if(user.rol =='admin'){
      if(!adminRequired){
          return next('/admin');
      }else{
        next();
      }
    }
}

 
})