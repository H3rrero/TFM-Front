<template>
    <div class="container-task-data" >  
        <div class="title-task-data">
            <p>{{this.myTask.title}}</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>Reasignar tarea:</p>
                 <select  v-model="myTask.userId" v-on:change="showTaskSelectedUser()" v-if="user.rol=='manager'" >
                    <option v-for="user in userss" :key="user.id" :value="user.id">{{user.firstname +" "+user.lastname}}</option>
                </select>
                <select  v-model="myTask.userId" v-on:change="showTaskSelectedUser()" v-if="user.rol=='user'" >
                    <option :value="myTask.userId" selected>{{myTask.assigned}}</option>
                    <option :value="user.id" >{{user.firstname + " "+ user.lastname}}</option>
                </select>
            </div>
             <div class="item-task-data">
                <p>Cambiar estado:</p>
                 <select  v-model="myTask.state" >
                    <option v-for="state in states" :key="state.id" :value="state.name">{{state.name}}</option>
                </select>
            </div>
            <div class="item-task-data">
                <p>Descripción:</p>
                <textarea-autosize v-model="myTask.description" placeholder="add multiple lines"></textarea-autosize>
            </div>
            <div class="item-task-data">
                <div class="dates">
                    <div class="dateini">
                        <p>Fecha Inicio:</p>
                        <datetime v-model="myTask.dateI"></datetime>
                    </div>
                    <div class="dateend">
                        <p>Fecha Fin:</p>
                        <datetime v-model="myTask.dateF"></datetime>
                    </div>
                </div>
                 <p v-if="new Date(this.myTask.dateF) < new Date(this.myTask.dateI) ||
                new Date(this.myTask.dateI) < new Date()" v-bind:class="{ 'error': 
                new Date(this.myTask.dateF) < new Date(this.myTask.dateI) ||
                new Date(this.myTask.dateI) < new Date()}"> La fecha de fin debe ser posterior a la de inicio, y la fecha de inicio debe ser posterior al día actual.</p>
            </div>
            <div class="item-task-data">
                <p>Horas planificadas:</p>
                <div class="item-text-data">
                    <div>
                        <p>{{myTask.planHours}}</p>
                    </div>
                </div>
            </div>
            <div class="item-task-data">
                 <div class="dates">
                    <div class="dateini">
                       <p>Añadir horas dedicadas:</p>
                        <input value="0"  v-model="hours" type="number">    
                    </div>
                    <div class="item-text-data">
                        <span>Horas dedicadas totales:</span>
                        <div>
                            <p>{{myTask.hours}}</p>
                        </div>
                    </div>
                </div>
               
            </div>

            <div class="item-task-data" v-if="user.rol=='manager'|| myTask.userId == user.id">
                <p>Dejar comentario:</p>
                <textarea-autosize v-model="coment"></textarea-autosize>
            </div>
            <div class="item-textarea-data">
                <span>Comentarios:</span>
                <div>
                    <p v-for="coment in  this.myTask.coments" :key="coment.id">{{coment}}</p>
                </div>
            </div>
            <div class="item-button-data">
                <p>{{result}}</p>
                <a class="button" v-on:click="updateTask()">Actualizar tarea</a>
                
            </div>
        </div>
    </div>
</template>

<script>

 import { taskService } from '../_services/task.service';
 import { userService} from '../_services/user.service';
 import { stateService } from '../_services/states.service';
export default {
    props: {
   myTask: Object,
   user:Object
  },
    data(){
       return{ 
       valid:false,
       haveData: false,
       result: "",
       hours:0,
       coment:"",
       userss:[],
       states:[],
       }
    },
    created () {
         console.log( this.myTask.userId );
          console.log( this.user);
        console.log(" myTask.userId == user.userId");
        console.log( this.myTask.userId == this.user.userId);
        this.getUsers();
        this.getStates();
    },
    methods:{
        updateTask: function () {
            if(this.validate()){
                this.valid=false;
                if(isNaN(parseInt(this.hours)))
                    this.hours = 0;
                if(this.myTask.state == 'sin asignar' && this.myTask.userId !=-1)
                    this.myTask.state="Backlog";
                this.myTask.hours = parseInt(this.myTask.hours) + parseInt(this.hours);
                this.myTask.coments.push(this.coment);
                taskService.changeTask(this.myTask).then(
                    resp => {
                        this.$emit('update-task');
                        this.result = "La tarea ha sido actualizada.";
                    }
                );
            }else{
                this.valid = true;
                this.result = "Campos erroneos.";
            }
        },
        validate:function(){
            let start = new Date(this.myTask.dateI);
            let end = new Date(this.myTask.dateF);
           
           if(
            this.myTask.dateI == undefined||
            this.myTask.dateI.trim() == ""||
            this.myTask.dateF.trim() == ""||
            end < start ||
            start < new Date()) {
                return false;
           }else{
                return true;
           }
        },
        getStates: function () {
            console.log("this.myTask");
            console.log(this.myTask)
          stateService.getAll().then(
            elements=>{
              this.states = elements;
            }
       );
        },
        getUsers: function () {
          console.log("getUsers");
          console.log(this.user);
          console.log(this.myTask);
          userService.getAll().then(
            users=>{
                users.forEach(element => {
                    this.userss = users;
                });
             
            }
       );
        },
        showTaskSelectedUser: function () {
           this.userss.forEach(element => {
               if(element.id == this.myTask.userId){
                   this.myTask.assigned = element.firstname +" "+element.lastname
               }
           });
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
  background-color: #333399;
  border-bottom: 4px solid #333399;
  color: #fff;
}
.button:hover:before {
  transform: skewX(-45deg) translateX(13.5em);
  transition: all 0.5s ease-in-out;
}
.container-task-data{
    background-color: #eee;
    display: flex;
    height: 100%;
    flex-direction: column;
    margin:0;
    overflow: auto;
    position: absolute;
    right: 0;
    top:0;
    width: 500px;
    z-index: 99;
}
.title-task-data{
    border-bottom: 1px solid #6B6FCE;
    color: #333399;
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    vertical-align: middle;
}
.form-task-data{
    display: flex;
    flex-direction: column;
}
.error{
    color: red;
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
        width: 80%;
    }
}
</style>