<template>
<div>
    <app-breadcrumbs class="admin-background"></app-breadcrumbs>
    <div class="container-task-data" > 
        <div class="title-task-data">
            <p>Introduce los datos del proyecto</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>* Nombre del proyecto:</p>
                <input v-model="myProject.name">
                <p v-if="validar && (myProject.name == undefined|| myProject.name.trim()=='')"
                 v-bind:class="{ 'error': (myProject.name == undefined|| myProject.name.trim()=='')}" >* El campo nombre es obligatorio</p>
            </div>
             <div class="item-task-data">
                <p>* Descripción del proyecto:</p>
                <input v-model="myProject.description">
                <p v-if="validar && (myProject.description == undefined|| myProject.description.trim()=='')"
                 v-bind:class="{ 'error': (myProject.description == undefined|| myProject.description.trim()=='')}" >* El campo descripción es obligatorio</p>
            </div> 
            <div class="item-task-data">
                 <div class="dates">
                    <div class="dateini">
                       <p>* Fecha inicio:</p>
                        <datetime class="admin-border-2" v-model="myProject.fechaInicio"></datetime>
                    </div>
                </div>
            </div>
            <div class="item-task-data">
                 <div class="dates">
                    <div class="dateini">
                       <p>* Fecha fin:</p>
                        <datetime v-model="myProject.fechaFin"></datetime> 
                        <p v-if="validar &&(new Date(myProject.fechaFin) < new Date(myProject.fechaInicio) ||
                        new Date(myProject.fechaFin) < new Date() ||
                        new Date(myProject.fechaInicio) < new Date())" v-bind:class="{ 'error': 
                        new Date(myProject.fechaFin) < new Date(myProject.fechaInicio) ||
                        new Date(myProject.fechaFin) < new Date()||
                        new Date(myProject.fechaInicio) < new Date()
                        }"> Las fechas de inicio y fin deben ser posteriores a la fecha actual.</p>
                        <p v-if="validar &&(myProject.fechaFin == '' ||
                                myProject.fechaInicio == '')" v-bind:class="{ 'error': 
                                myProject.fechaFin == '' ||
                                myProject.fechaInicio == ''
                        }"
                        >Los campos fecha de inicio y fecha de fin son obligatorios.</p>
                    </div>
                </div>
            </div>      
            <div class="item-task-data">
                <p v-if="projectCreated" v-bind:class="{ 'correct':projectCreated}">El projecto se ha añadido correctamente</p>
            </div>
            <div class="item-button-data">
                <a class="button" v-on:click="createUser()">Añadir projecto</a>
                
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
       projectCreated:false,
       myProject:{
        name:"",
        description:"",
        planHours:0,
        fechaInicio:'',
        fechaFin:'',
        deleted:false
        },
       }
    },
    methods:{
        validate:function(){
           if(this.myProject.name == undefined||
            this.myProject.name.trim() == ""||
            this.myProject.description == undefined||
            this.myProject.description.trim() == ""||
            new Date(this.myProject.fechaFin) < new Date()||
            new Date(this.myProject.fechaInicio) < new Date() ||
            new Date(this.myProject.fechaFin) < new Date(this.myProject.fechaInicio)||
            this.myProject.fechaFin == '' ||
            this.myProject.fechaInicio == ''
            ) {
                return false;
           }else{
                return true;
           }
        },
        createUser:function () {
            if(this.validate()){
                this.projectCreated = true;
                this.validar = false;
                projectService.createProject(this.myProject);
                this.$router.push(`/projects`);  
            }else{
                this.validar =true;
            }
        }
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
    background-color: white;
    border: 2px solid var(--admin-color);
    border-radius: 0.5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    margin: 0 auto;
    margin-top: 20px;
    width: 50%;
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
    color: var(--admin-color);
    font-weight: 700;
    line-height: 50px;
    margin-bottom: 5px;
    text-align: center;
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
    margin: 0 auto;
    margin-top: 10px;
    width: 95%;
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