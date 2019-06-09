<template>
<div>
    <app-breadcrumbs class="user-background"></app-breadcrumbs>
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
        proyectId:this.$route.params.id,
        dateI:"",
        dateF:"",
        completed:0,
        hours:0,
        totalHours:1,
        completedHours:0
        },
       }
    },
    methods:{
        validate:function(){
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
                this.phaseCreated = true;
                this.validar = false;
                phaseService.createPhase(this.myPhase);
                    
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
    background-color: white;
    border: 2px solid var(--man-color);
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
    color: var(--man-color);
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