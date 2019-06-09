<template>
<div>
    <app-breadcrumbs v-bind:class="{ 'user-background': currentUser.rol=='user','man-background': currentUser.rol=='manager' }" ></app-breadcrumbs>
    <div class="container-task-data" v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }">  
        <div class="title-task-data" v-bind:class="{ 'user-color': user.rol=='user',' man-color': user.rol=='manager' }">
            <p>Introduce los datos de la tarea</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>* Titulo:</p>
                <input v-model="myTask.title" v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }">
                <p v-if="validar && (myTask.title == undefined|| myTask.title.trim()=='')"
                 v-bind:class="{ 'error': (myTask.title == undefined|| myTask.title.trim()=='')}" >* El campo titulo es obligatorio</p>
            </div>
            <div class="item-task-data">
                <p>Asignar tarea:</p>
                 <select  v-model="myTask.userId"  v-if="user.rol=='manager'" v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }">
                     <option value="-1" selected>No asignar</option>
                    <option v-for="user in userss" :key="user.id" :value="user.id">{{user.firstname +" "+user.lastname}}</option>
                </select>
                <select  v-model="myTask.userId"  v-if="user.rol=='user'" v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }">
                     <option value="-1" selected>No asignar</option>
                     <option :value="user.id" selected>{{user.firstname + " "+ user.lastname}}</option>
                </select>
            </div>
            <div class="item-task-data">
                <p>Descripción:</p>
                <textarea-autosize v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }" v-model="myTask.description" placeholder="add multiple lines"></textarea-autosize>
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
                        <input v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }" value="0"  v-model="myTask.planHours" type="number">  
                        <p v-if="validar && (myTask.planHours == undefined|| myTask.planHours < 1)" v-bind:class="{ 'error': 
                        (myTask.planHours == undefined|| myTask.planHours < 1)}" >El campo horas planificadas tiene que tener mínimo 1 hora.</p>  
                    </div>
                </div>
            </div>
            <div class="item-task-data">
                <p>Dejar comentario:</p>
                <input v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }" v-model="coment">
            </div>
            <div class="item-task-data">
                <p v-if="taskCreated" v-bind:class="{ 'correct':taskCreated}">La tarea se ha añadido correctamente, la puedes encontrar en la pestaña sprints</p>
            </div>
            <div class="item-button-data">
                <a class="button" v-bind:class="{ 'user-border user-color': user.rol=='user',' man-border man-color': user.rol=='manager' }" v-on:click="createTask()">Añadir tarea</a>
                
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
       currentUser:JSON.parse(localStorage.getItem('user')),
       taskCreated:false,
       myTask:{
        title:"",
        description:"",
        userId:-1,
        projectId:this.$route.params.idProject,
        assigned:"",
        coments:[],
        phase:this.$route.params.idPhase,
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
          userService.getByProject(this.myTask.projectId).then(
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
                            this.myTask.assigned = user[0].firstname +" "+user[0].lastname;
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
    border-radius: 0.3em;
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