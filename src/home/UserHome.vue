<template>
    <div>
       <app-breadcrumbs v-bind:class="{ 'user-background': user.rol=='user','man-background': user.rol=='manager' }" ></app-breadcrumbs>
        <div class="user-container">
            <div class="users" v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }"> 
                <div class="users-item" v-for="project in projects" :key="project.id">
                   <div class="users-item-title" v-bind:class="{ 'user-background': user.rol=='user',' man-background': user.rol=='manager' }">
                        <p >{{project.name}}</p>
                    </div>
                    <div  class="users-body"  v-bind:class="{ 'user-background': user.rol=='user',' man-background': user.rol=='manager' }" v-on:click="openProjectHome(project)">
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