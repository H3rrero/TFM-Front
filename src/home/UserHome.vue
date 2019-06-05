<template>
    <div>
       <app-breadcrumbs class="user-background"></app-breadcrumbs>
        <div class="user-container">
            <div class="users">
                <div class="users-item" v-for="project in projects" :key="project.id">
                   <div class="users-item-title" >
                        <p >{{project.name}}</p>
                    </div>
                    <div  class="users-body" v-on:click="openProjectHome(project)">
                        <p >{{project.description}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

 import { projectService } from '../_services/project.service';
 import { userProjectService } from '../_services/userProject.service';
export default {
    data(){
       return{ 
        projects:[],
        user: {},
       }
    },
    created () {
        this.getProjectsActive();
    },
    methods: {
       getProjectsActive: function () {
           console.log("user");
           console.log(JSON.parse(localStorage.getItem('user')));
           this.user =  JSON.parse(localStorage.getItem('user'));
           console.log("user");
           console.log(this.user);
           this.projects = [];
            userProjectService.getProjectByUser(this.user.id).then(projectss=>{
                projectss.forEach(element => {
                    if(!element.deleted){
                        this.projects.push(element);
                    }
                });
            })
        },
         openProjectHome:function (project) {
             localStorage.setItem('navOn', true);
             this.$root.$emit('eventing', project);
            this.$router.push(`/kanban/${project.id}`);
        },
    }
};
</script>
<style scoped>

.user-container{
    display: flex;
    flex-direction: row;
    height: 100%;
}
.users{
    background-color: white;
    border: 2px solid var(--man-color);
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
    background-color: var(--man-color);
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
    background-color: var(--man-color);
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

p{
    font-family: 'Roboto', sans-serif;
    margin-bottom: 2px;
}
</style>