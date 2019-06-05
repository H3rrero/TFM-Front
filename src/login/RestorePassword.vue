<template>
<div>
    <app-breadcrumbs class="admin-background"></app-breadcrumbs>
    <restorestep1 v-if="step1" v-on:check-user="showStepTwo"></restorestep1>
    <restorestep2 v-if="step2" :data="sendData" v-on:answer-correct="showFinal"></restorestep2>
    <restorestep3 v-if="step3"></restorestep3>
</div>
</template>

<script>

 import { projectService } from '../_services/project.service';
export default {
    data(){
       return{ 
       step1 :true,
       step2:false,
       step3:false,
       sendData:{
           user:"",
           question:""
       },
       }
    },
    methods:{
        showStepTwo: function (data) {
            if(data.user != undefined && data.user != ""){
                this.sendData.user = data.user;
                this.sendData.question = data.question;
                this.step1 = false;
                this.step2 = true;
            }
        },
        showFinal: function () {
            this.step1 = false;
            this.step2 = false;
            this.step3 = true;
        }

    }
};
</script>
