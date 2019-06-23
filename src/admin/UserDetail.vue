<template>
    <div class="container-task-data" > 
        <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :is-full-page="fullPage"></loading> 
        <div class="title-task-data">
            <p>{{this.myUser.firstname + " " + this.myUser.lastname}}</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>Usuario:</p>
                 <div class="item-text-data">
                    <div>
                        <p>{{myUser.username}}</p>
                    </div>
                </div>
            </div>
             <div class="item-task-data">
                <p>Cambiar proyecto:</p>
                 <select class="admin-border"  v-model="project" >
                     <option value="-1">Eliminar del proyecto</option>
                    <option v-for="project in projects" :key="project.id" :value="project.id">{{project.name}}</option>
                </select>
            </div>
            <div class="item-task-data">
                <p>* Rol:</p>
                <select  v-model="myUser.rol" >
                    <option value="manager">Jefe de proyecto</option>
                    <option value="user">Programador</option>
                </select>
            </div>
            <div class="item-task-data">
                <p>{{result}}</p>
            </div>
            <div class="item-button-data">
                <a class="button" v-on:click="changeProject()">Actualizar usuario</a>
                
            </div>
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
    props: {
   myUser: Object,
   myProject:String
  },
    data(){
       return{ 
       projects:[],
       project:-1,
       result:"",
       isLoading: false,
       fullPage: true,
       spinner:false,
       }
    },
    components: {
            Loading
        },
    created () {
        this.getProjects();
    },
    methods:{
        getProjects: function () {
           projectService.getAll().then(
            projectss=>{
                this.projects = projectss;
            }
       );
        },
        changeProject() {
                this.myUser.projectId = this.project;
                userService.update(this.myUser).then(user=>{
                userProjectService.getByUserAndProject(this.myUser.id, this.project).then(userProject=>{
                     this.$emit('start-spinner');
                    if(userProject.message != undefined){
                        if(this.project == -1){
                            userProjectService.deleteUserAndProject(this.myUser.id,this.myProject).then(data=>{
                               this.$emit('stop-spinner');
                                this.result = "usuario actualizado";
                            });
                            
                        }else{
                        var userProj = {
                            user: this.myUser.id,
                            project:this.myUser.projectId
                        }
                        userProjectService.createUserProject(userProj).then(data=>{
                            this.$emit('stop-spinner');
                             this.result = "usuario actualizado";
                        });
                        
                        }
                    }else{
                        this.$emit('stop-spinner');
                    }
                });
            });
        },
    }
};
</script>
<style scoped>
.button {
    border: 2px solid var(--admin-color);
    border-radius: 0.3em;
    color: var(--admin-color);
    display: inline-block;
    font-size: 17px;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.75em 2em;
    position: relative;
    text-align: center;
    text-decoration: none;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    width: 50% !important;
}
.button:hover {
  background-color: var(--admin-color);
  border-bottom: 4px solid var(--admin-color);
  color: #fff;
}
.container-task-data{
    background-color: #eee;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    margin:0;
    overflow: auto;
    position: absolute;
    right: 0;
    top:0;
    width: 500px;
    z-index: 99;
}
.title-task-data{
    border-bottom: 1px solid #6B6FCE;
    color: var(--admin-color);
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    vertical-align: middle;
}
.form-task-data{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
}
.item-task-data{  
    margin-top: 10px;
    margin: 0 auto;
    width: 95%;
}
.item-button-data{  
    margin: 0 auto;
    margin-top: 40px;
    width: 95%;
}
.item-text-data{  
    margin: 0 auto;
    width: 95%;

}
.item-text-data > div{
    border: 2px solid var(--admin-color);
    border-radius: 5px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    height: 35px;
    margin: 10px 0;
    padding: 0 15px;
}
.item-text-data > div >p{
    margin-top: 7px;
}
.item-textarea-data{  
    width: 95%;
    margin: 0 auto;
    margin-top: 10px;

}
.item-textarea-data > div{
    border: 2px solid var(--admin-color);
    border-radius: 5px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    height: 100%;
    margin: 10px 0;
    padding: 0 15px;
}
.item-textarea-data > div >p{
    margin-top: 7px;
}
.item-task-data *{
   width: 100%;
}
.item-button-data{  
    margin: 0 auto;
    margin-top: 40px;
    width: 95%;
}
.dates{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
}
.dateini{
    margin-right: 10px;
}
.left{
    margin-left: 5px;
}
input, select, textarea{
    border: 2px solid var(--admin-color);
    border-radius: 5px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    height: 35px;
    margin: 10px 0;
    padding: 0 15px;
}
p{
    font-family: 'Roboto', sans-serif;
    margin-bottom: 2px;
}
@media only screen and (max-width: 980px) {
    .container-task-data{
        width: 80%;
    }
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