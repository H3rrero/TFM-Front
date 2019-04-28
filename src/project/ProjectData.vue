<template>
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
                <input v-model="myProject.name">
                <p v-if="validar && (myProject.name == undefined|| myProject.name.trim()=='')"
                 v-bind:class="{ 'error': (myProject.name == undefined|| myProject.name.trim()=='')}" >* El campo nombre es obligatorio</p>
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
                <p v-if="projectUpdated" v-bind:class="{ 'correct':projectUpdated}">El proyecto se ha actualizado correctamente</p>
            </div>
            <div class="item-button-data">
                <a class="button" v-on:click="updateProject()">Modificar proyecto.</a>
                
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
                   console.log(element);
                   console.log(this.selectProject);
                   if(element.id == this.selectProject){
                       this.myProject = element;
                       this.json_data.push(this.myProject);
                       console.log(this.myProject)
                   }
               });
            }
        );
        },
        updateProject:function () {
            if(this.validate()){
                console.log("bieeen");
                this.projectUpdated = true;
                this.validar = false;
                projectService.update(this.myProject);
                    
            }else{
                this.validar =true;
                console.log("maaaaallll");
            }
        }
    }
};
</script>
<style scoped>

.button {
    border: 2px solid #333399;
    border-radius: 0.3em;
    color: #333399;
    display: inline-block;
    font-size: 17px;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.75em 2em;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    width: 50% !important;
}
.button:before {
  background-color: rgba(255, 255, 255, 0.5);
  content: "";
  height: 100%;
  display: block;
  left: -4.5em;
  position: absolute;
  top: 0;
  transform: skewX(-45deg) translateX(0);
  transition: none;
  width: 3em;
}
.button:hover {
  background-color: #2194e0;
  border-bottom: 4px solid #333399;
  color: #fff;
}
.button:hover:before {
  transform: skewX(-45deg) translateX(13.5em);
  transition: all 0.5s ease-in-out;
}
.container-task-data{
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    background-color: white;
    border: 2px solid #333399;
    border-radius: 1rem;
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
    color: #333399;
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
    display: flex;
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
    border: 2px solid #333399;
    border-radius: 5px;
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
    border: 2px solid #333399;
    border-radius: 5px;
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
    display: flex;
    flex-direction: row;
}
.dateini{
    margin-right: 10px;
}
input, select, textarea{
    border: 2px solid #333399;
    border-radius: 5px;
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
        display: flex;
        flex-direction: column;
    }
}
</style>