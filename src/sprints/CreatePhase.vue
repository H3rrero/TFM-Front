<template>
    <div class="container-task-data" >  
        <div class="title-task-data">
            <p>Introduce los datos de la fase</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>* Nombre:</p>
                <input v-model="myPhase.name">
                <p v-if="validar && (myPhase.name == undefined|| myPhase.name.trim()=='')"
                 v-bind:class="{ 'error': (myPhase.name == undefined|| myPhase.name.trim()=='')}" >* El campo nombre es obligatorio</p>
            </div>
            <div class="item-task-data">
                <div class="dates">
                    <div class="dateini">
                        <p>* Fecha Inicio:</p>
                        <datetime v-model="myPhase.dateI"></datetime>
                    </div>
                    <div class="dateend">
                        <p>* Fecha Fin:</p>
                        <datetime v-model="myPhase.dateF"></datetime>
                    </div>
                </div>
                <p v-if="validar && (myPhase.dateI == undefined|| myPhase.dateF == undefined 
                || this.myPhase.dateI.trim() == '' || this.myPhase.dateF.trim() == '')" v-bind:class="{ 'error': 
                (myPhase.dateI == undefined|| myPhase.dateF == undefined|| 
                this.myPhase.dateI.trim() == '' || this.myPhase.dateF.trim() == '')}" >Los campos fecha de inicio y fecha de fin son obligatorios.</p>
            </div>
            <div class="item-task-data">
                 <div class="dates">
                    <div class="dateini">
                       <p>* Horas planificadas:</p>
                        <input value="0"  v-model="myPhase.totalHours" type="number">  
                        <p v-if="validar && (myPhase.totalHours == undefined|| myPhase.totalHours < 1)" v-bind:class="{ 'error': 
                        (myPhase.totalHours == undefined|| myPhase.totalHours < 1)}" >El campo horas planificadas tiene que tener mínimo 1 hora.</p>  
                    </div>
                </div>
            </div>
            <div class="item-task-data">
                <p v-if="phaseCreated" v-bind:class="{ 'correct':phaseCreated}">La fase se ha añadido correctamente</p>
            </div>
            <div class="item-button-data">
                <a class="button" v-on:click="createPhase()">Añadir fase</a>
                
            </div>
        </div>
    </div>
</template>

<script>

 import { phaseService } from '../_services/phase.service';
export default {
    data(){
       return{ 
       validar : false,
       phaseCreated:false,
       myPhase:{
        name:"",
        proyectId:0,
        dateI:"",
        dateF:"",
        completed:0,
        hours:0,
        totalHours:1,
        completedHours:0},
       }
    },
    methods:{
        validate:function(){
            console.log(this.myPhase);
           if(this.myPhase.name == undefined||
            this.myPhase.name.trim() == ""||
            this.myPhase.dateI == undefined||
            this.myPhase.dateI.trim() == ""||
            this.myPhase.dateF.trim() == ""||
            this.myPhase.dateF == undefined||
            this.myPhase.totalHours == undefined||
            this.myPhase.totalHours < 1) {
                return false;
           }else{
                return true;
           }
        },
        createPhase:function () {
            if(this.validate()){
                console.log("bieeen");
                this.phaseCreated = true;
                this.validar = false;
                phaseService.createPhase(this.myPhase);
                    
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
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    vertical-align: middle;
        margin-bottom: 5px;
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