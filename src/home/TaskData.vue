<template>
    <div class="container-task-data" >  
        <div class="title-task-data" v-bind:class="{ 'user-color': user.rol=='user','man-color': user.rol=='manager' }">
            <p>{{this.myTask.title}}</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>Reasignar tarea:</p>
                 <select v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }"  v-model="myTask.userId" v-on:change="showTaskSelectedUser()" v-if="user.rol=='manager'" >
                    <option v-for="user in userss" :key="user.id" :value="user.id">{{user.firstname +" "+user.lastname}}</option>
                </select>
                <select v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }" v-model="myTask.userId" v-on:change="showTaskSelectedUser()" v-if="user.rol=='user'" >
                    <option :value="myTask.userId" selected>{{myTask.assigned}}</option>
                    <option :value="user.id" >{{user.firstname + " "+ user.lastname}}</option>
                </select>
            </div>
             <div class="item-task-data">
                <p>Cambiar estado:</p>
                 <select v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }" v-model="myTask.state" >
                    <option v-for="state in states" :key="state.id" :value="state.name">{{state.name}}</option>
                </select>
            </div>
            <div class="item-task-data">
                <p>Descripción:</p>
                <textarea-autosize v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }" v-model="myTask.description" placeholder="add multiple lines"></textarea-autosize>
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
                    <div v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }">
                        <p>{{myTask.planHours}}</p>
                    </div>
                </div>
            </div>
            <div class="item-task-data">
                 <div class="dates">
                    <div class="dateini">
                       <p>Añadir horas dedicadas:</p>
                        <input v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }" value="0"  v-model="hours" type="number">    
                    </div>
                    <div class="item-text-data">
                        <span>Horas dedicadas totales:</span>
                        <div v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }">
                            <p>{{myTask.hours}}</p>
                        </div>
                    </div>
                </div>
               
            </div>

            <div class="item-task-data" v-if="user.rol=='manager'|| myTask.userId == user.id">
                <p>Dejar comentario:</p>
                <textarea-autosize v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }" v-model="coment"></textarea-autosize>
            </div>
            <div class="item-textarea-data">
                <span>Comentarios:</span>
                <div v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }">
                    <p v-for="coment in  this.myTask.coments" :key="coment.id">{{coment}}</p>
                </div>
            </div>
            <div class="item-button-data">
                <p>{{result}}</p>
                <a class="button" v-bind:class="{ 'user-border user-color': user.rol=='user',' man-border man-color': user.rol=='manager' }" v-on:click="updateTask()">Actualizar tarea</a>
                
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
       states:[]
       }
    },
    created () {
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
          stateService.getAll().then(
            elements=>{
              this.states = elements;
            }
       );
        },
        getUsers: function () {
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
 <style  scoped>

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
    background-color: #eee;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
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
    line-height: 50px;
    text-align: center;
    font-weight: 700;
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
        width: 80%;
    }
}
</style>