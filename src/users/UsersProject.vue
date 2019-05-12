<template>
    <div>
        <app-breadcrumbs></app-breadcrumbs>
        <div class="user-container">
              <div  class="users">
                <div class="users-item" v-for="user in users" :key="user.id">
                    <div  class="users-item-drag">
                        <div class="users-item-title"  v-bind:class="{ 'users-item-title-admin': user.rol == 'manager' && !user.deleted,'users-item-title-normal': user.rol != 'manager' && !user.deleted,'users-item-title-deleted': user.deleted}" >
                            <p >{{user.username}}</p>
                            <div>
                                <span v-if="!user.deleted" v-on:click="deleteUser(user)" title="deshabilitar usuario" >
                                    <i class="fas fa-trash-alt"></i>
                                </span>
                                <span v-if="user.deleted" v-on:click="restoreUser(user)" title="habilitar usuario" >
                                     <i class="fas fa-trash-restore"></i>
                                </span>
                            </div>
                        </div>
                        <div  class="users-body"  v-bind:class="{ 'users-body-admin': user.rol == 'manager' && !user.deleted,'users-body-normal': user.rol != 'manager' && !user.deleted,'users-body-deleted': user.deleted}" >
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

 import { projectService } from '../_services/project.service';
 import { userService } from '../_services/user.service';
export default {
    data(){
       return{ 
        users:[],
        usersDeleted:[],
        selectProject:this.$route.params.id,
        nameProject:this.$route.params.name,
        projects:[],
       }
    },
    created () {
        this.getUsers();
        this.getProjects();
    },
    methods: {
       getUsers: function () {
           this.users = [];
          userService.getAll().then(
            userss=>{
            userss.forEach(element => {
                if(element.rol!='admin' && element.projectId == this.selectProject){
                    this.users.push(element);
                }
            });
            }
       );
        },
         getProjects: function () {
           projectService.getAll().then(
            projectss=>{
                this.projects = projectss;
            }
       );
        },
        deleteUser:function (user) {
            user.projectId = -1;
            userService.update(user).then(user=>{
                this.getUsers();
            });
        },restoreUser:function (user) {
            user.deleted = false;
            userService.update(user).then(user=>{
                this.getUsers();
            });
        }
    }
};
</script>
<style scoped>
.unassigned-task{
    background-color: #333399;
    border: 2px solid white;
    border-radius: 1rem;
    margin-right: 10px;
    width: 20%;
}
.add-user{
    background-color: white;
    border-radius: 1rem;
    color: #333399;
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
    display: flex;
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    margin: 0 auto;
    margin-left: 10px;
    margin-right: 10px;
    vertical-align: middle;
}
.information{
    color: white;
    display: flex;
    flex-direction: row;
    margin-left: 10px;
}
.second{
     margin-top: 10px;
}
.name{
    display: flex;
    flex-direction: column;
    font-size: 1em;
    justify-content: center;
    margin-left: 10px;
}
.mask{
    background-color: #3D3A3F;
    height: 100%;
    opacity: 0.8;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 5;
}
.user-container{
    display: flex;
    flex-direction: row;
    height: 100%;
}
.users{
    background-color: white;
    border: 2px solid #333399;
    border-radius: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-bottom: 10px;
    min-height: 60px;
    width: 300px;
}
.users-item-drag{
    background-color: white;
    color: #6B6FCE;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 60px;
    width: 300px;
}
.users-item:hover{
    transform: scale(1.03,1.03);
    transition:  0.3s ease-out;
}
.users-item-title{
    border-bottom: 1px solid white;
    color: white;
    display: flex;
    flex-direction: row;
    font-family: 'Roboto', sans-serif;
    height: 20px;
    justify-content: space-between;
    padding: 0.3rem;
    text-align: center;
}
.users-item-title-admin{
 background-color: #138A00;
}
.users-item-title-deleted{
 background-color: #D52525;
}
.users-body-admin{
 background-color: #138A00;
}
.users-body-deleted{
 background-color: #D52525;
}
.users-item-title-normal{
 background-color: #333399;
}
.users-body-normal{
 background-color: #333399;
}
.users-item-title > div > span{
    cursor: pointer;
    font-size: 1em;
    margin-left: 7px;
    margin-right: 7px;
}
.users-body{
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding-bottom: 10px;
    text-align: center;
}
.addPhase{
    background-color: #333399;
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
    background-color: #333399;
    border: 2px solid white;
    border-radius: 5px;
    box-sizing: border-box;
    color: white;
    height: 35px;
    margin: 0 auto;
    margin-top: 10px;
    padding: 0 15px;
}
.slide-fade-enter-active {
  transition: all 2.3s ease;
}
.slide-fade-leave-active {
    transition: all 2.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(100%);
 
}
</style>