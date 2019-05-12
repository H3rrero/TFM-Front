import Vue from 'vue';
import Router from 'vue-router';

import KanbanPage from '../home/KanbanPage'
import LoginPage from '../login/LoginPage'
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
import CreateUser from '../admin/CreateUser'
import AdminProjects from '../admin/AdminProjects'
import CreateProject from '../admin/CreateProject'
import AllUsers from '../admin/AllUsers'
import AllTasks from '../tasks/AllTasks'
import UserToProject from '../admin/UserToProject'
import UserHome from '../home/UserHome'
import UsersProject from '../users/UsersProject'
import Profile from '../users/Profile'
import ProjectData from '../project/ProjectData'

Vue.use(Router);

export const router = new Router({
  mode: 'hash',
  base: '/TFM-Front/',
  routes: [
    { path: '/kanban/:id',name:'kamban', component: KanbanPage, meta: {breadcrumb:{label: 'Kamban',parent:'userhome'}}},
    { path: '/tasks', component: TasksPage,name:'tasks', meta: {breadcrumb:{label: 'Asignar tareas',parent:'userhome'}}},,
    { path: '/sprints',name:'sprints' ,component: SprintPage, meta: {breadcrumb:{label: 'Gestionar fases',parent:'userhome'}}},
    { path: '/login', component: LoginPage},
    { path: '/gantt', component:  GanttState, meta: {breadcrumb:{label: 'Gantt',parent:'state'}}},
    { path: '/burndown', component:  BurndownState, meta: {breadcrumb:{label: 'Diagrama Burndown',parent:'state'}}},
    { path: '/burndownSprint/:id', component:  BurndownSprint,meta: {breadcrumb:{label: 'Burndown por fase',parent:'state'}}},
    { path: '/state',name:'state', component:  ProjectState, meta: {breadcrumb:{label: 'Estado del proyecto',parent:'userhome'}}},
    { path: '/newTask/:idPhase', component:  CreateTask, meta: {breadcrumb:{label: 'Crear tarea',parent:'kamban'}}},
    { path: '/newPhase', component:  CreatePhase, meta: {breadcrumb:{label: 'Nueva fase',parent:'sprints'}}},
    { path: '/admin',name:'adminhome', component:  AdminHome, meta: {breadcrumb: 'Pagina de inicio'}},
    { path: '/projects',name:'projects', component:  AdminProjects,  meta: {breadcrumb:{label: 'Gestión de proyectos',parent:'adminhome'}}},
    { path: '/manusers/:id/:name', component:  ManageUsersProject, name:'manusers',meta: {breadcrumb:{label: 'Gestion de usuarios del proyecto',parent:'projects'}}},
    { path: '/disableusers/:id/:name', component:  UsersProject, name:'disableusers',meta: {breadcrumb:{label: 'Usuarios',parent:'userhome'}}},
    { path: '/createuser/:id', component:  CreateUser, meta: {breadcrumb:{label: 'Crear usuario',parent:'usersproject'}}},
    { path: '/createuserproject/:id', component:  CreateUser, meta: {breadcrumb:{label: 'Crear usuario',parent:'manusers'}}},
    { path: '/createproject', component:  CreateProject, meta: {breadcrumb:{label: 'crear proyecto',parent:'projects'}}},
    { path: '/userslist', component:  AllUsers, meta: {breadcrumb:{label: 'listado de usuarios',parent:'usersproject'}}},
    { path: '/taskslist', component:  AllTasks, meta: {breadcrumb:{label: 'estado de las tareas',parent:'tasks'}}},
    { path: '/usersproject',name:'usersproject', component:  UserToProject, meta: {breadcrumb:{label: 'gestión de usuarios',parent:'adminhome'}}},
    { path: '/userhome', name:'userhome', component:  UserHome, meta: {breadcrumb: 'Tus proyectos'}},
    { path: '/profile', component:  Profile, meta: {breadcrumb: 'perfil'}},
    { path: '/projectdata/:id', component:  ProjectData, meta: {breadcrumb:{label: 'Datos del proyecto',parent:'userhome'}}},
    
    // otherwise redirect to home
    { path: '*', redirect: '/admin' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const adminPages = ['admin','manusers','createuser','projectsadmin','createproject','projects',
                      'manageusers','userslist','usersproject','addprogrammer','addmanager','createuserproject'];
  const managerPages = ['sprints','disableusers','projectdata'];
  
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