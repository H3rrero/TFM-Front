<template>
<div class="container-state">
    <app-breadcrumbs v-bind:class="{ 'user-background': user.rol=='user','man-background': user.rol=='manager' }" ></app-breadcrumbs>
    <div v-on:click="currentPage('gantt')">
        <state :rol="user.rol" :image="'src/img/gantt.png'" :title="'Diagrama de Gantt'"></state>
    </div>
    <div v-on:click="currentPage('burndown')" >
        <state :rol="user.rol" :image="'src/img/vg.png'" :title="'Diagrama valor ganado'"></state>
    </div>
    <div v-on:click="currentPage('burndownSprint')" >
        <state :rol="user.rol"  :image="'src/img/vg.png'" :title="'Diagrama valor ganado por sprint'"></state>
    </div>
    <div v-on:click="currentPage('hoursChart')" >
        <state :rol="user.rol"  :image="'src/img/horas.PNG'" :title="'Diagrama horas y usuarios'"></state>
    </div>
    <div v-on:click="currentPage('hoursSprint')" >
        <state  :rol="user.rol" :image="'src/img/horas.PNG'" :title="'Diagrama horas y usuarios'"></state>
    </div>
</div>

</template>
<script>
import { phaseService } from '../_services/phase.service';
export default {
    data(){
       return{ 
        selectProject:this.$route.params.id,
        phase:"",
        user:JSON.parse(localStorage.getItem('user'))
       }
    }, created () {
        this.getPhases();
    },
    methods:{
        getPhases: function () {
          phaseService.getByProject(this.selectProject).then(
            fases=>{
            if(fases.error== null){
                this.phase=fases[0].id;
            }
            }
       );
        },
        currentPage: function (page) {
           
          if(page == 'gantt'){
              this.$router.push(`/gantt/${this.selectProject}`);
          }
          else if(page == 'burndown'){
               this.$router.push(`/burndown/${this.selectProject}`);
          }
          else if(page == 'burndownSprint'){
               this.$router.push(`/burndownSprint/${this.phase}/${this.selectProject}`);
          }else if(page == 'hoursChart'){
               this.$router.push(`/hoursChart/${this.selectProject}`);
          }else if(page == 'hoursSprint'){
               this.$router.push(`/hoursSprint/${this.phase}/${this.selectProject}`);
          }
        },
    }
}
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