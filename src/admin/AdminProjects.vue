<template>
    <div>
        <app-breadcrumbs class="admin-background"></app-breadcrumbs>
        <div class="user-container" v-if="haveData">
            <div class="projects ">
                <div class="projects-item" v-for="project in projects" :key="project.id">
                   <div class="projects-item-title " >
                        <p >{{project.name}}</p>
                        <div>
                            <span v-on:click="getDataProject(project)" title="Deshabilitar projecto" >
                                <i class="fas fa-trash-alt"></i>
                            </span>
                        </div>
                    </div>
                    <div  class="projects-body" v-on:click="openProjectHome(project)">
                        <p >{{project.description}}</p>
                    </div>
                </div>
                <div class="projects-item" v-for="project in inactiveProjects" :key="project.id">
                   <div class="projects-deleted-item-title" >
                        <p >{{project.name}}</p>
                        <div>
                            <span v-on:click="restoreProject(project)" title="Habilitar el projecto" >
                               <i class="fas fa-trash-restore"></i>
                            </span>
                        </div>
                    </div>
                    <div  class="projects-deleted-body" v-on:click="openProjectHome(project)">
                        <p >{{project.description}}</p>
                    </div>
                </div>
                 <div class="projects-item" title="Añadir un nuevo proyecto" >
                    <button class="addPhase " v-on:click="openNewProject()">+</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

 import { projectService } from '../_services/project.service';
 import { userService} from '../_services/user.service';
 import { taskService } from '../_services/task.service';
export default {
    data(){
       return{ 
        projects:[],
        haveData:false,
        inactiveProjects:[]
       }
    },
    created () {
        this.getProjectsActive();
        this.getProjectsInActive();
    },
    methods: {
       getProjectsActive: function () {
           this.projects = [];
           console.log("hola");
            projectService.getAll().then(
            projectss=>{
                this.haveData = true;
            projectss.forEach(element => {
                if(!element.deleted){
                    this.projects.push(element);
                }
            });
            }
       );
        },
        getProjectsInActive: function () {
           this.inactiveProjects = [];
            projectService.getAll().then(
            projectss=>{
            projectss.forEach(element => {
                if(element.deleted){
                    this.inactiveProjects.push(element);
                }
            });
            }
       );
        },
        getDataProject:function (project) {
               userService.getByProject(project.id).then(users=>{
                    if(users.length > 0){
                        this.deleteProject(project);
                    } else {
                        taskService.getByProject(project.id).then(tasks=>{
                            if(tasks.length > 0){
                                this.deleteProject(project);
                            }else{
                                this.deleteProject(project);
                            }
                        });
                    }
                });
        },
         openNewProject:function (id) {
            this.$router.push('/createproject');
        },
         openProjectHome:function (project) {
            this.$router.push('/manprojects/'+project.id+'/'+project.name);
        },
        deleteProject:function (project) {
            

            if(this.haveData){
                project.deleted = true;
                projectService.update(project).then(project=>{
                    this.getProjectsActive();
                    this.getProjectsInActive();
                });
            }else{
                projectService.remove(project.id).then(projectss=>{
                 this.getProjectsActive();
                 this.getProjectsInActive();
                });
            }
        },
        restoreProject:function (project) {
            project.deleted = false;
            projectService.update(project).then(project=>{
                 this.getProjectsActive();
                 this.getProjectsInActive();
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
.projects{
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
.projects-item{
    background-color: white;
    color: white;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    height: 200px;
    margin-left: 10px;
    margin-bottom: 10px;
    min-height: 60px;
    width: 250px;
}

.projects-item:hover{
    -webkit-transform: scale(1.03,1.03);
        -ms-transform: scale(1.03,1.03);
            transform: scale(1.03,1.03);
    -webkit-transition:  0.3s ease-out;
    -o-transition:  0.3s ease-out;
    transition:  0.3s ease-out;
}
.projects-item-title{
    background-color: var(--admin-color);
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
.projects-deleted-item-title{
    background-color: #D52525;
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
.projects-item-title > div > span{
    cursor: pointer;
    font-size: 1em;
    margin-left: 7px;
    margin-right: 7px;
}
.projects-deleted-item-title > div > span{
    cursor: pointer;
    font-size: 1em;
    margin-left: 7px;
    margin-right: 7px;
}
.projects-body{
    background-color: var(--admin-color);
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
    cursor: pointer;
}
.projects-deleted-body{
    background-color: #D52525;
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
    cursor: pointer;
}
.projects-body > p{
    color: white;
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
</style>