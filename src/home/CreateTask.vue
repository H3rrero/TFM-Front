<template>
<div>
    <app-breadcrumbs></app-breadcrumbs>
    <div class="container-task-data" >  
        <div class="title-task-data">
            <p>Introduce los datos de la tarea</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>* Titulo:</p>
                <input v-model="myTask.title">
                <p v-if="validar && (myTask.title == undefined|| myTask.title.trim()=='')"
                 v-bind:class="{ 'error': (myTask.title == undefined|| myTask.title.trim()=='')}" >* El campo titulo es obligatorio</p>
            </div>
            <div class="item-task-data">
                <p>Asignar tarea:</p>
                 <select  v-model="myTask.userId"  v-if="user.rol=='manager'">
                     <option value="-1" selected>No asignar</option>
                    <option v-for="user in userss" :key="user.id" :value="user.id">{{user.firstname +" "+user.lastname}}</option>
                </select>
                <select  v-model="myTask.userId"  v-if="user.rol=='user'">
                     <option value="-1" selected>No asignar</option>
                     <option :value="user.id" selected>{{user.firstname + " "+ user.lastname}}</option>
                </select>
            </div>
            <div class="item-task-data">
                <p>Descripción:</p>
                <textarea-autosize v-model="myTask.description" placeholder="add multiple lines"></textarea-autosize>
            </div>
            <div class="item-task-data">
                <div class="dates">
                    <div class="dateini">
                        <p>* Fecha Inicio:</p>
                        <datetime v-model="myTask.dateI"></datetime>
                    </div>
                    <div class="dateend">
                        <p>* Fecha Fin:</p>
                        <datetime v-model="myTask.dateF"></datetime>
                    </div>
                </div>
                <p v-if="validar && (myTask.dateI == undefined|| myTask.dateF == undefined 
                || this.myTask.dateI.trim() == '' || this.myTask.dateF.trim() == '')" v-bind:class="{ 'error': 
                (myTask.dateI == undefined|| myTask.dateF == undefined|| 
                this.myTask.dateI.trim() == '' || this.myTask.dateF.trim() == '')}" >Los campos fecha de inicio y fecha de fin son obligatorios.</p>
                <p v-if="new Date(this.myTask.dateF) < new Date(this.myTask.dateI) ||
                new Date(this.myTask.dateI) < new Date()" v-bind:class="{ 'error': 
                new Date(this.myTask.dateF) < new Date(this.myTask.dateI) ||
                new Date(this.myTask.dateI) < new Date()}"> La fecha de fin debe ser posterior a la de inicio, y la fecha de inicio debe ser posterior al día actual.</p>
            </div>
            <div class="item-task-data">
                 <div class="dates">
                    <div class="dateini">
                       <p>* Horas planificadas:</p>
                        <input value="0"  v-model="myTask.planHours" type="number">  
                        <p v-if="validar && (myTask.planHours == undefined|| myTask.planHours < 1)" v-bind:class="{ 'error': 
                        (myTask.planHours == undefined|| myTask.planHours < 1)}" >El campo horas planificadas tiene que tener mínimo 1 hora.</p>  
                    </div>
                </div>
            </div>
            <div class="item-task-data">
                <p>Dejar comentario:</p>
                <input v-model="coment">
            </div>
            <div class="item-task-data">
                <p v-if="taskCreated" v-bind:class="{ 'correct':taskCreated}">La tarea se ha añadido correctamente, la puedes encontrar en la pestaña sprints</p>
            </div>
            <div class="item-button-data">
                <a class="button" v-on:click="createTask()">Añadir tarea</a>
                
            </div>
        </div>
    </div>
</div>
</template>

<script>

 import { taskService } from '../_services/task.service';
 import { userService} from '../_services/user.service';
export default {
    data(){
       return{ 
       haveData: false,
       userss:[],
       user:{},
       coment:"",
       validar : false,
       taskCreated:false,
       myTask:{
        title:"",
        description:"",
        userId:-1,
        assigned:"",
        coments:[],
        phase:parseInt(this.$route.params.idPhase),
        hours:0,
        planHours:0,
        state:'sin asignar'},
       }
    },
    created () {
        this.getUsers();
    },
    methods:{
        getUsers: function () {
          this.user =  JSON.parse(localStorage.getItem('user'));
          userService.getAll().then(
            users=>{
                users.forEach(element => {
                    this.userss = users;
                });
             
            }
       );
        },
        validate:function(){
            let start = new Date(this.myTask.dateI);
            let end = new Date(this.myTask.dateF);
            console.log("start < new Date() ");
            console.log(start < new Date() );
            console.log(start);
            console.log(new Date() );
           if(this.myTask.title == undefined||
            this.myTask.title.trim() == ""||
            this.myTask.userId == undefined||
            this.myTask.description == undefined||
            this.myTask.dateI == undefined||
            this.myTask.dateI.trim() == ""||
            this.myTask.dateF.trim() == ""||
            end < start ||
            start < new Date() ||
            this.myTask.dateF == undefined||
            this.myTask.planHours == undefined||
            this.myTask.planHours < 1 ||
            this.coment == undefined) {
                return false;
           }else{
                return true;
           }
        },
        createTask:function () {
            if(this.validate()){
                this.taskCreated = true;
                this.validar = false;
                if(this.myTask.userId != -1){
                    userService.getById(this.myTask.userId).then(
                        user =>{
                            this.myTask.assigned = user.firstname +" "+user.lastname;
                            this.myTask.state="Backlog";
                            this.myTask.coments.push(this.coment);
                            taskService.createTask(this.myTask);
                        }
                    );
                }else{
                    this.myTask.coments.push(this.coment);
                    taskService.createTask(this.myTask);
                }
            }else{
                this.validar =true;
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