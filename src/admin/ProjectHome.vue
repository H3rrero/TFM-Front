<template>
<div>
    <app-breadcrumbs class="admin-background"></app-breadcrumbs>
<div class="container-state">
    <div v-on:click="openManUsers()" >
        <state :rol="'admin'" :image="'src/img/gestionusuario.png'" :title="'Gestion de usuarios del proyecto'"></state>
    </div>
    <div v-on:click="openStatesHome()" >
        <state :rol="'admin'" :image="'src/img/estados.PNG'" :title="'Gestion de estados del proyecto'"></state>
    </div> 
</div>
</div>
</template>
<script>

 import { projectService } from '../_services/project.service';
 import { userService } from '../_services/user.service';
 import { userProjectService } from '../_services/userProject.service';
export default {
    data(){
       return{ 
        selectProject:this.$route.params.id,
        nameProject:this.$route.params.name,
       }
    },
    methods: {
        openManUsers:function (project) {
            this.$router.push('/manusers/'+this.selectProject+'/'+this.nameProject);
        },
        openStatesHome:function (project) {
            this.$router.push('/manstates/'+this.selectProject+'/'+this.nameProject);
        },
    }
};
</script>
<style scoped>
.container-state{
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
}
.container-state a{
    text-decoration: none;
}
@media only screen and (max-width: 980px) {
    .container-state{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
        -ms-flex-wrap: nowrap;
            flex-wrap: nowrap;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        margin: 0 auto;
        width: 100%;
    }
}
</style>