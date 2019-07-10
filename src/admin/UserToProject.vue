<template>
    <div v-if="haveDataProjects">
        <app-breadcrumbs class="admin-background"></app-breadcrumbs>
        <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage"></loading>
        <div class="task-container">
            <div class="mask" v-if="show || spinner" v-on:click="hideMenu();"></div>
            <drop @dragover="asignedUser(-1)"  class="unassigned-task "  v-if="haveData" >
                 <div class="title-task-data">
                   <select  v-model="projectSelected">
                        <option value="-1">Usuarios sin proyecto</option>
                        <option v-for="project in projects" :key="project.id" :value="project.id">{{project.name}}</option>
                    </select>
                    <span   v-on:click="showList()" title="Mostrar lista de usuarios">
                        <i class="fas fa-list"></i>
                    </span> 
                </div>
                <div class="add-user " title="añadir usuario" v-on:click="openNewUser()">
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

            <div class="programmers " >
                <div class="programmers-item"  v-for="project in projectsDeleted" :key="project.id">
                    <div class="programmers-item-title " v-if="!project.deleted">
                        {{project.name}}
                    </div>
                    <drop @dragover="asignedUser(project.id)" @dragleave="projectOld(project.id)" class="programmers-item-task "  v-if="!project.deleted">
                        <div v-for="user in usersProject[project.id]" :key="user.id">
                            <drag  @dragend="handleDrop"  :transfer-data="user" v-if="user.rol!='admin'">
                                 <user  :user="user" v-on:show-data="showMenu(user,project.id)"></user>
                            </drag>
                        </div>
                    </drop>
                </div>
            </div>
                
            <transition name="slide-fade">
                <userdetail v-if="show" :myUser="userSelected" :myProject="projectSend" v-on:start-spinner="startSpinner()" v-on:stop-spinner="stopSpinner()"></userdetail>  
            </transition>  
        </div>
    </div>
</template>

<script>

 import { projectService } from '../_services/project.service';
 import { userService} from '../_services/user.service';
 import { userProjectService } from '../_services/userProject.service';
 import Vue from 'vue';
 // Import component
 import Loading from 'vue-loading-overlay';
 // Init plugin
Vue.use(Loading);
export default {
    data(){
       return{ 
        users:[],
        projects:[],
        projectsDeleted:[],
        projectSend:"",
        projectSelected:-1,
        projectIdOld:"",
        show:false,
        count:0,
        currentUser: JSON.parse(localStorage.getItem('user')),
        userSelected:{},
        haveData: false,
        haveDataProjects:false,
        usersProject:{},
        isLoading: false,
        fullPage: true,
        spinner:false,
       }
    },
    components: {
            Loading
        },
    created () {
        this.getUsers();
        this.getProjects();
    },
    methods: {
         getUsers: function () {
          userProjectService.getUserWithoutProject().then(
            userss=>{
                this.usersProject[-1]= userss;
                    
            }
       );
        },
         getProjects: function () {
            this.usersProject = {};
            this.projectsDeleted = [];
            this.haveDataProjects = false;
           projectService.getAll().then(
            projectss=>{
                this.projects = projectss;
                this.haveData = true;
                this.isLoading = false;
                this.spinner = false;
                projectss.forEach(element => {
                    if(!element.deleted){
                        this.projectsDeleted.push(element);
                        this.getUsersByProject(element.id);
                    }
                });
            }
       );
        },
        showMenu: function (user,project) {
            this.show = true;
            this.userSelected = user;
            this.projectSend = project+"";
        },
        hideMenu: function () {
            if(this.show)
            this.show = false;
        },
        handleDrop(data, event) {
                data.projectId = this.projectAsignedId;
                data.rol = "user";
                userService.update(data).then(user=>{
                    this.isLoading = true;
                    this.spinner = true;
                userProjectService.getByUserAndProject(data.id, this.projectAsignedId).then(userProject=>{
                        console.log("userProject.message");
                        console.log(userProject.message);
                    if(userProject.message != undefined){
                        if(this.projectAsignedId == -1){
                            console.log("saber que id ha llegado");
                            console.log(this.projectIdOld);
                            userProjectService.deleteUserAndProject(data.id,this.projectIdOld).then(data=>{
                                this.count = 0;
                                this.getUsers();
                                this.getProjects();
                            }); 
                            
                        }else{
                        var userProj = {
                            user: data.id,
                            project:data.projectId
                        }
                        userProjectService.createUserProject(userProj).then(data=>{
                            this.count = 0;
                            this.getUsers();
                            this.getProjects();
                        });
                        
                        }
                    }else{
                        this.isLoading = false;
                        this.spinner = false;
                        this.count = 0;
                    }
                });
            });
        },
        asignedUser: function (id) {
            this.projectAsignedId = id;
        },
        projectOld: function (id) {
            this.count++;
            if(this.count<3){
                this.projectIdOld = id;
                console.log("this.projectIdOld ");
                console.log(this.projectIdOld );
            }
        },
        openNewUser:function () {
            this.$router.push('/createuser/-1');
        },
        showList: function () {
            this.$router.push('/userslist');
        },
        startSpinner: function () {
            this.isLoading = true;
            this.spinner = true;
        },
        stopSpinner: function () {
            this.getUsers();
            this.getProjects();
        },
         getUsersByProject: function (projectId) {
            userProjectService.getUserByProject(projectId).then(
            userss=>{
               if(userss.message == null)
                   this.usersProject[projectId]=  userss;
                else
                    this.usersProject[projectId]=  [];
                if(this.usersProject[this.projectsDeleted[this.projectsDeleted.length-1].id ]!= undefined)
                    setTimeout(() => {
                        this.haveDataProjects = true;
                    }, 300);
            }
       );
        },
    }
};
</script>
<style scoped>
.task-container{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    height: 100%;
}
.unassigned-task{
    background-color: var(--admin-color);
    border: 2px solid white;
    border-radius: 0.5rem;
    margin-right: 10px;
    width: 20%;
}
.title-task-data{
    border-bottom: 1px solid #6B6FCE;
    color: white;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    margin: 0 auto;
    margin-left: 10px;
    margin-right: 10px;
    vertical-align: middle;
}
.title-task-data > span{
    margin-left: auto;
    cursor: pointer;
}
.programmers{
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
    width: 80%;
}
.programmers-item{
    background-color: white;
    color: #6B6FCE;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    margin-left: 10px;
    margin-bottom: 10px;
    min-height: 50px;
    width: 300px;
}
.programmers-item:hover{
    -webkit-transform: scale(1.03,1.03);
        -ms-transform: scale(1.03,1.03);
            transform: scale(1.03,1.03);
    -webkit-transition:  0.3s ease-out;
    -o-transition:  0.3s ease-out;
    transition:  0.3s ease-out;
}
.programmers-item-title{
    background-color: var(--admin-color);
    border-bottom: 1px solid white;
    color: white;
    font-family: 'Roboto', sans-serif;
    height: 20px;
    padding: 0.3rem;
    text-align: center;
}
.programmers-item-task{
    background-color: var(--admin-color);
    height: 90%;
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
.add-user{
    color: var(--admin-color);
    background-color: white;
    border-radius: 0.5rem;
    cursor: pointer;
    margin: 0 auto;
    margin-top: 8px;
    text-align: center;
    width: 95%;
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

.add-user-title{
    padding: 2%;
    font-size: 35px;
}
.notification{
    margin-left: 40%;
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