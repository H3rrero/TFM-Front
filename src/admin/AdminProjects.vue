<template>
    <div>
        <div class="user-container">
            <div class="users">
                <div class="users-item" v-for="project in projects" :key="project.id">
                   <div class="users-item-title" >
                        <p >{{project.name}}</p>
                        <div>
                            <span v-on:click="deleteProject(project)" title="eliminar projecto" >
                                <i class="fas fa-trash-alt"></i>
                            </span>
                        </div>
                    </div>
                    <div  class="users-body" v-on:click="openProjectHome(project)">
                        <p >{{project.description}}</p>
                    </div>
                </div>
                 <div class="users-item" title="Añadir un nuevo proyecto" >
                    <button class="addPhase" v-on:click="openNewProject()">+</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

 import { projectService } from '../_services/project.service';
export default {
    data(){
       return{ 
        projects:[],
 
       }
    },
    created () {
        this.getProjectsActive();
    },
    methods: {
       getProjectsActive: function () {
           this.projects = [];
            projectService.getAll().then(
            projectss=>{
            projectss.forEach(element => {
                if(!element.deleted){
                    this.projects.push(element);
                }
            });
            }
       );
        },
        getProjectsInActive: function () {
           this.projects = [];
            projectService.getAll().then(
            projectss=>{
            projectss.forEach(element => {
                if(element.deleted){
                    this.projects.push(element);
                }
            });
            }
       );
        },
         openNewProject:function (id) {
            this.$router.push('/createproject');
        },
         openProjectHome:function (project) {
            this.$router.push('/projectsadmin/'+project.id+'/'+project.name);
        },
        deleteProject:function (project) {
            project.deleted = true;
            projectService.update(project).then(project=>{
                 this.getProjectsActive();
            });
           
        },
        showDeleteProject:function () {
            this.getProjectsInActive();
            this.$router.go();
        },
    }
};
</script>
<style scoped>
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
    display: flex;
    flex-direction: column;
    height: 200px;
    margin-left: 10px;
    margin-bottom: 10px;
    min-height: 60px;
    width: 250px;
}

.users-item:hover{
    transform: scale(1.03,1.03);
    transition:  0.3s ease-out;
}
.users-item-title{
    background-color: #333399;
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
.users-item-title > div > span{
    cursor: pointer;
    font-size: 1em;
    margin-left: 7px;
    margin-right: 7px;
}
.users-body{
    background-color: #333399;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding-bottom: 10px;
    text-align: center;
    cursor: pointer;
}
.users-body > p{
    color: white;
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
</style>