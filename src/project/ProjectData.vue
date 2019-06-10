<template>
<div>
    <app-breadcrumbs v-bind:class="{ 'user-background': currentUser.rol=='user','man-background': currentUser.rol=='manager' }" ></app-breadcrumbs>
    <div class="container-task-data" >  
        <div class="title-task-data">
            <p>Datos del proyecto</p>
           
                     <download-csv
                    :data   = "json_data"
                    name    = "filename.csv">
                    <span>
                        <i class="fas fa-file-csv"></i>
                    </span>
                </download-csv>

        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>Nombre:</p>
                <div class="item-text-data">
                    <div>
                        <p>{{myProject.name}}</p>
                    </div>
                </div>
                </div>
            <div class="item-task-data">
                <p>Descripción:</p>
                <input v-model="myProject.description">
                <p v-if="validar && (myProject.description == undefined|| myProject.description.trim()=='')"
                 v-bind:class="{ 'error': (myProject.description == undefined|| myProject.description.trim()=='')}" >* El campo descripción es obligatorio</p>
            </div>
            <div class="item-task-data">
                 <div class="dates">
                    <div class="dateini">
                       <p>* Horas planificadas:</p>
                        <input value="0"  v-model="myProject.planHours" type="number">  
                        <p v-if="validar && (myProject.planHours == undefined|| myProject.planHours < 1)" v-bind:class="{ 'error': 
                        (myProject.planHours == undefined|| myProject.planHours < 1)}" >El campo horas planificadas tiene que tener mínimo 1 hora.</p>  
                    </div>
                </div>
            </div>
            <div class="item-task-data">
                 <div class="dates">
                    <div class="dateini">
                       <p>* Fecha inicio:</p>
                        <datetime v-model="myProject.fechaInicio"></datetime>
                    </div>
                </div>
            </div>
            <div class="item-task-data">
                 <div class="dates">
                    <div class="dateini">
                       <p>* Fecha fin:</p>
                        <datetime v-model="myProject.fechaFin"></datetime> 
                        <p v-if="new Date(myProject.fechaFin) < new Date(myProject.fechaInicio) ||
                        new Date(myProject.fechaFin) < new Date()" v-bind:class="{ 'error': 
                        new Date(myProject.fechaFin) < new Date(myProject.fechaInicio) ||
                        new Date(myProject.fechaFin) < new Date()}"> La fecha de fin debe ser posterior a la de inicio y a la fecha actual.</p>
                    </div>
                </div>
            </div>
            <div class="item-task-data">
                <p v-if="projectUpdated" v-bind:class="{ 'correct':projectUpdated}">El proyecto se ha actualizado correctamente</p>
            </div>
            <div class="item-button-data">
                <a class="button" v-on:click="updateProject()">Modificar proyecto.</a>
                
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
       validar : false,
       projectUpdated:false,
       currentUser:JSON.parse(localStorage.getItem('user')),
       selectProject:this.$route.params.id,
       myProject:{},
       json_data: [  ]
       }
    },
    created () {
        this.getProjects();
    },
    methods:{
        validate:function(){
           if(this.myProject.name == undefined||
            this.myProject.name.trim() == ""||
            this.myProject.description == undefined||
            this.myProject.description.trim() == ""||
            this.myProject.planHours == undefined||
            this.myProject.planHours < 1) {
                return false;
           }else{
                return true;
           }
        },
         getProjects: function () {
           projectService.getAll().then(
            projectss=>{
               projectss.forEach(element => {
                   if(element.id == this.selectProject){
                       this.myProject = element;
                       this.json_data.push(this.myProject);
                   }
               });
            }
        );
        },
        updateProject:function () {
            if(this.validate()){
                this.projectUpdated = true;
                this.validar = false;
                projectService.update(this.myProject);
                    
            }else{
                this.validar =true;
            }
        }
    }
};
</script>
<style scoped>

.button {
    border: 2px solid var(--man-color);
    border-radius: 0.3em;
    color: var(--man-color);
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
  background-color: var(--man-color);
  border-bottom: 4px solid var(--man-color);
  color: #fff;
}
.container-task-data{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    width: 50%;
    margin: 0 auto;
    background-color: white;
    border: 2px solid var(--man-color);
    border-radius: 0.5rem;
    margin-top: 20px;
}
.error{
    color: red;
    margin-bottom: 10px;
}
.correct{
    color: green;
    margin-bottom: 10px;
}
.title-task-data{
    border-bottom: 1px solid #6B6FCE;
    color: var(--man-color);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    vertical-align: middle;
    margin-bottom: 5px;
}
.title-task-data > p{
    margin: 0 auto;
}
.title-task-data >* > span{
    cursor: pointer;
    font-size: 1.5em;
    margin-right: 10px;
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
    border: 2px solid var(--man-color);
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
    border: 2px solid var(--man-color);
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
input, select, textarea{
    border: 2px solid var(--man-color);
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
        width: 100%;
    }
    .dates{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
    }
}
</style>