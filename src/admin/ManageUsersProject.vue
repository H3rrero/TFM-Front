<template>
    <div >
        <app-breadcrumbs class="admin-background"></app-breadcrumbs>
        <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage"></loading>
        <div class="user-container">
             <div class="mask" v-if="show || spinner" v-on:click="hideMenu();"></div>
            <drop @dragover="asignedUser(-1)"  class="unassigned-task"   >
                 <div class="title-task-data">
                    <select   v-model="projectSelected">
                        <option value="-1">Usuarios sin proyecto</option>
                        <option v-for="project in projects" :key="project.id" :value="project.id">{{project.name}}</option>
                    </select>
                    
                </div>
                <div class="add-user" title="añadir usuario" v-on:click="openNewUser()">
                    <div class="add-user-title">
                        <p>+</p>
                    </div>
                </div>
                <div v-for="user in usersProject[projectSelected]" :key="user.id">
                    <drag @dragend="handleDrop"  :transfer-data="user" >
                         <user v-if="user.rol!='admin'" :user="user" v-on:show-data="showMenu(user,projectSelected)"></user>  
                    </drag>
                </div>
            </drop>
            <drop @dragover="asignedUser(selectProject)" class="users ">
                <div class="users-item" v-for="user in users" :key="user.id">
                    <drag @dragend="handleDrop"  :transfer-data="user" class="users-item-drag">
                   <div class="users-item-title"  v-bind:class="{ 'users-item-title-admin': user.rol == 'manager','users-item-title-normal': user.rol != 'manager'}" >
                        <p >{{user.username}}</p>
                        <div>
                            <span v-on:click="deleteUser(user)" title="deshabilitar usuario" >
                                <i class="fas fa-trash-alt"></i>
                            </span>
                        </div>
                    </div>
                    <div  class="users-body"  v-bind:class="{ 'users-body-admin': user.rol == 'manager','users-body-normal': user.rol != 'manager'}" v-on:click="showMenu(user,selectProject)">
                        <div class="information">
                            <div class="icon">
                                <span style="font-size: 1em;">
                                    <i class="far fa-user-circle"></i>
                                </span> 
                            </div>
                            <div class="name">
                                <p>{{user.firstname + " " + user.lastname}}</p>
                            </div>
                        </div>
                        <div class="information second">
                            <div class="icon">
                                <span style="font-size: 1em;">
                                   <i class="fas fa-sitemap"></i>
                                </span> 
                            </div>
                            <div class="name">
                                <p>{{user.rol}}</p>
                            </div>
                        </div>
                        <div class="information second">
                            <div class="icon">
                                <span style="font-size: 1em;">
                                   <i class="fas fa-project-diagram"></i>
                                </span> 
                            </div>
                            <div class="name">
                                <p>{{nameProject}}</p>
                            </div>
                        </div>
                    </div>
                    </drag>
                </div>
                 <div class="users-item" title="Añadir un nuevo usuario al proyecto" >
                    <button class="addPhase" v-on:click="openNewUser()">+</button>
                </div>
            </drop>
            <transition name="slide-fade">
                <userdetail v-if="show" :myUser="userSelected" :myProject="projectSend" v-on:start-spinner="startSpinner()" v-on:stop-spinner="stopSpinner()"></userdetail>  
            </transition>  
        </div>
    </div>
</template>

<script>

 import { projectService } from '../_services/project.service';
 import { userService } from '../_services/user.service';
 import { userProjectService } from '../_services/userProject.service';
  import Vue from 'vue';
 // Import component
 import Loading from 'vue-loading-overlay';
 // Init plugin
Vue.use(Loading);
export default {
    data(){
       return{ 
        projectAsignedId:-1,
        users:[],
        projectSelected:-1,
        selectProject:this.$route.params.id,
        nameProject:this.$route.params.name,
        show:false,
        userSelected:{},
        projectSend:"",
        projects:[],
        haveDataProjects:false,
        usersProject:{},
        isLoading: false,
        fullPage: true,
        spinner:false,
       }
    },
    created () {
        this.getUsersActive();
        this.getProjects();
    },
    components: {
            Loading
        },
    methods: {
       getUsersActive: function () {
           this.users = [];
           this.usersProject = {};
           this.haveDataProjects = false;
            userProjectService.getUserWithoutProject().then(
            userss=>{
                this.usersProject[-1]= userss;
                    
            }
       );
          userProjectService.getUserByProject(this.selectProject).then(
            userss=>{
                   this.isLoading = false;
                this.spinner = false; 
                this.show = false;    
                 setTimeout(() => {
                     this.haveDataProjects = true;
                 }, 300);
                userss.forEach(element => {
                    if(!element.deleted && element.rol!='admin'){
                        this.users.push(element);
                    }
                });
            }
       );
        },
        getUsersInActive: function () {
           this.users = [];
          userProjectService.getUserByProject(this.selectProject).then(
            userss=>{
            userss.forEach(element => {
                if(element.deleted && element.rol!='admin'){
                    this.users.push(element);
                }
            });
            }
       );
        },
        getProjects: function () {
            this.usersProject = {};
            this.haveDataProjects = false;
            this.projects = [];
           projectService.getAll().then(
            projectss=>{
                this.haveData = true;
                projectss.forEach(element => {
                    if(!element.deleted){
                        this.projects.push(element);
                        this.getUsersByProject(element.id);
                    }
                });
            }
       );
        },
         openNewUser:function (id) {
            this.$router.push('/createuserproject/'+this.selectProject);
        },
        deleteUser:function (user) {
            let projectId = this.selectProject;
            user.projectId = -1;
            this.isLoading = true;
            this.spinner = true;
            userService.update(user).then(user=>{
                userProjectService.deleteUserAndProject(user.id, projectId);
                this.getUsersActive();
                this.getProjects();
            });
        }
        ,handleDrop(data, event) {
                var projectIdOld = data.projectId;
                data.projectId = this.projectAsignedId;
                
                userService.update(data).then(user=>{
                    this.isLoading = true;
                    this.spinner = true;
                    userProjectService.getByUserAndProject(data.id, this.projectAsignedId).then(userProject=>{
                    console.log("userProject");
                    console.log(userProject);
                    if(userProject.message != null){
                        if(this.projectAsignedId == -1){
                            userProjectService.deleteUserAndProject(data.id,projectIdOld).then(data =>{
                                console.log("deleted");
                                console.log(data);
                                this.getUsersActive();
                                this.getProjects();
                            });
                        }else{
                        var userProj = {
                            user: data.id,
                            project:data.projectId
                        }
                        userProjectService.createUserProject(userProj).then(user=>{
                            this.getUsersActive();
                            this.getProjects();
                        });
                        
                        }
                    }else{
                        this.isLoading = false;
                        this.spinner = false;
                    }
                    


                    
                });
                    
                });
        }, asignedUser: function (id) {
            this.projectAsignedId = id;
        },showMenu: function (user,project) {
            this.show = true;
            this.userSelected = user;
            this.projectSend = project+"";
        },hideMenu: function () {
            if(this.show)
            this.show = false;
        },
        asignedUser: function (id) {
            this.projectAsignedId = id;
        },
        startSpinner: function () {
            this.isLoading = true;
            this.spinner = true;
        },
        stopSpinner: function () {
             this.getUsersActive();
            this.getProjects();
        },
        getUsersByProject: function (projectId) {
            userProjectService.getUserByProject(projectId).then(
            userss=>{
               if(userss.message == null)
                   this.usersProject[projectId]=  userss;
                else
                    this.usersProject[projectId]=  [];
                   
            }
       );
        },
    }
};
</script>
<style scoped>
.unassigned-task{
    background-color: var(--admin-color);
    border: 2px solid white;
    border-radius: 0.5rem;
    margin-right: 10px;
    width: 20%;
}
.add-user{
    background-color: white;
    border-radius: 0.5rem;
    color: var(--admin-color);
    cursor: pointer;
    margin: 0 auto;
    margin-top: 8px;
    text-align: center;
    width: 95%;
}
.add-user-title{
    padding: 2%;
    font-size: 35px;
}
.title-task-data{
    border-bottom: 1px solid #6B6FCE;
    color: white;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-weight: 700;
    line-height: 50px;
    margin: 0 auto;
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
    vertical-align: middle;
}
.information{
    color: white;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    margin-left: 10px;
}
.second{
     margin-top: 10px;
}
.name{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    font-size: 1em;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin-left: 10px;
}
.mask{
    background-color: #3D3A3F;
    height: 100%;
    opacity: 0.8;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 5;
}
.user-container{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    height: 100%;
}
.users{
    background-color: white;
    border: 2px solid var(--admin-color);
    border-radius: 0.5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin: 0 auto;
    margin-right: 10px;
    padding: 1rem;
    width: 100%;
}
.users-item{
    background-color: white;
    color: #6B6FCE;
    cursor: move;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    margin-left: 10px;
    margin-bottom: 10px;
    min-height: 60px;
    width: 300px;
}
.users-item-drag{
    background-color: white;
    color: #6B6FCE;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    height: 100%;
    min-height: 60px;
    width: 300px;
}
.users-item:hover{
    -webkit-transform: scale(1.03,1.03);
        -ms-transform: scale(1.03,1.03);
            transform: scale(1.03,1.03);
    -webkit-transition:  0.3s ease-out;
    -o-transition:  0.3s ease-out;
    transition:  0.3s ease-out;
}
.users-item-title{
    border-bottom: 1px solid white;
    color: white;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    font-family: 'Roboto', sans-serif;
    height: 20px;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    padding: 0.3rem;
    text-align: center;
}
.users-item-title-admin{
 background-color: #138A00;
}
.users-body-admin{
 background-color: #138A00;
}
.users-item-title-normal{
 background-color: var(--admin-color);
}
.users-body-normal{
 background-color: var(--admin-color);
}
.users-item-title > div > span{
    cursor: pointer;
    font-size: 1em;
    margin-left: 7px;
    margin-right: 7px;
}
.users-body{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    height: 100%;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    padding-bottom: 10px;
    text-align: center;
}
.addPhase{
    background-color: var(--admin-color);
    color: white;
    cursor:pointer;
    font-size: 80px;
    height: 100%;
}
p{
    font-family: 'Roboto', sans-serif;
    margin-bottom: 2px;
}
 select{
    background-color: var(--admin-color);
    border: 2px solid white;
    border-radius: 5px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    color: white;
    height: 35px;
    margin: 0 auto;
    margin-top: 10px;
    padding: 0 15px;
}
.slide-fade-enter-active {
  -webkit-transition: all 2.3s ease;
  -o-transition: all 2.3s ease;
  transition: all 2.3s ease;
}
.slide-fade-leave-active {
    -webkit-transition: all 2.3s ease;
    -o-transition: all 2.3s ease;
    transition: all 2.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  -webkit-transform: translateX(100%);
      -ms-transform: translateX(100%);
          transform: translateX(100%);
 
}
.vld-overlay {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  align-items: center;
  display: none;
  justify-content: center;
  overflow: hidden;
  z-index: 1
}

.vld-overlay.is-active {
  display: flex
}

.vld-overlay.is-full-page {
  z-index: 999;
  position: fixed
}

.vld-overlay .vld-background {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background: #fff;
  opacity: 0.5
}

.vld-overlay .vld-icon, .vld-parent {
  position: relative
}
</style>