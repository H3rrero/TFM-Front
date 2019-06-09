import Vue from 'vue';
import Router from 'vue-router';

import KanbanPage from '../home/KanbanPage'
import LoginPage from '../login/LoginPage'
import RestorePass from '../login/RestorePassword'
import GanttState from '../projectState/GanttState'
import HoursState from '../projectState/HoursState'
import HoursSprint from '../projectState/HoursSprint'
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
import ProjectHome from '../admin/ProjectHome'
import ChangeStates from '../admin/ChangeStates'
import CreateState from '../admin/CreateState'


Vue.use(Router);

export const router = new Router({
  mode: 'hash',
  base: '/TFM-Front/',
  routes: [
    { path: '/kanban/:id',name:'kamban', component: KanbanPage, meta: {breadcrumb:{label: 'Kamban',parent:'userhome'}}},
    { path: '/tasks/:id', component: TasksPage,name:'tasks', meta: {breadcrumb:{label: 'Asignar tareas',parent:'userhome'}}},,
    { path: '/sprints/:id',name:'sprints' ,component: SprintPage, meta: {breadcrumb:{label: 'Gestionar fases',parent:'userhome'}}},
    { path: '/login', name:'login', component: LoginPage},
    { path: '/forgottenpass',name:"forgottenpass", component: RestorePass, meta: {breadcrumb:{label: 'Recuperar contraseña',parent:'login'}}},
    { path: '/hoursChart/:id', component:  HoursState, meta: {breadcrumb:{label: 'Horas',parent:'state'}}},
    { path: '/hoursSprint/:id/:idProject', component:  HoursSprint, meta: {breadcrumb:{label: 'Horas por sprint',parent:'state'}}},
    { path: '/gantt/:id', component:  GanttState, meta: {breadcrumb:{label: 'Gantt',parent:'state'}}},
    { path: '/burndown/:id', component:  BurndownState, meta: {breadcrumb:{label: 'Diagrama Burndown',parent:'state'}}},
    { path: '/burndownSprint/:id/:idProject', component:  BurndownSprint,meta: {breadcrumb:{label: 'Burndown por fase',parent:'state'}}},
    { path: '/state/:id',name:'state', component:  ProjectState, meta: {breadcrumb:{label: 'Estado del proyecto',parent:'userhome'}}},
    { path: '/newTask/:idPhase/:idProject', component:  CreateTask, meta: {breadcrumb:{label: 'Crear tarea',parent:'kamban'}}},
    { path: '/newPhase/:id', component:  CreatePhase, meta: {breadcrumb:{label: 'Nueva fase',parent:'sprints'}}},
    { path: '/admin',name:'adminhome', component:  AdminHome, meta: {breadcrumb: 'Pagina de inicio'}},
    { path: '/projects',name:'projects', component:  AdminProjects,  meta: {breadcrumb:{label: 'Gestión de proyectos',parent:'adminhome'}}},
    { path: '/manusers/:id/:name', component:  ManageUsersProject, name:'manusers',meta: {breadcrumb:{label: 'Gestion de usuarios del proyecto',parent:'projecthome'}}},
    { path: '/manstates/:id/:name', component:  ChangeStates, name:'manstates',meta: {breadcrumb:{label: 'Gestion de estados del proyecto',parent:'projecthome'}}},
    { path: '/manprojects/:id/:name', component:  ProjectHome, name:'projecthome',meta: {breadcrumb:{label: 'Gestion del projecto',parent:'projects'}}},
    { path: '/disableusers/:id/:name', component:  UsersProject, name:'disableusers',meta: {breadcrumb:{label: 'Usuarios',parent:'userhome'}}},
    { path: '/createuser/:id', component:  CreateUser, meta: {breadcrumb:{label: 'Crear usuario',parent:'usersproject'}}},
    { path: '/createuserproject/:id', component:  CreateUser, meta: {breadcrumb:{label: 'Crear usuario',parent:'manusers'}}},
    { path: '/createproject', component:  CreateProject, meta: {breadcrumb:{label: 'Crear proyecto',parent:'projects'}}},
    { path: '/userslist', component:  AllUsers, meta: {breadcrumb:{label: 'Listado de usuarios',parent:'usersproject'}}},
    { path: '/taskslist', component:  AllTasks, meta: {breadcrumb:{label: 'Estado de las tareas',parent:'tasks'}}},
    { path: '/usersproject',name:'usersproject', component:  UserToProject, meta: {breadcrumb:{label: 'Gestión de usuarios',parent:'adminhome'}}},
    { path: '/userhome', name:'userhome', component:  UserHome, meta: {breadcrumb: 'Tus proyectos'}},
    { path: '/profile', component:  Profile, meta: {breadcrumb: 'Perfil'}},
    { path: '/projectdata/:id', component:  ProjectData, meta: {breadcrumb:{label: 'Datos del proyecto',parent:'userhome'}}},
    { path: '/createstate/:id/:order', component:  CreateState, name:'createState',meta: {breadcrumb:{label: 'Crear estado',parent:'manstates'}}},
    
    // otherwise redirect to home
    { path: '*', redirect: '/admin' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register','/forgottenpass'];
  const adminPages = ['admin','manusers','createuser','projectsadmin','createproject','projects',
                      'manageusers','userslist','usersproject','addprogrammer','addmanager',
                      'createuserproject','manprojects','manstates','createstate'];
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