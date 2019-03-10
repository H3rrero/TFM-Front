<template>
    <div class="filter-kamban">
        <div class="filter">
            <button class="mytask-bt" title="filtrar por tus tareas asignadas" v-bind:class="{ 'mytaskbt-selected': isActive }" v-on:click="showTaskCurrentUser()">Mis tareas</button>
            <button class="mytask-bt" title="filtrar por tareas retrasadas" v-bind:class="{ 'mytaskbt-selected': isActiveR }" v-on:click="showTaskRetard()">Retrasadas</button>
            <input type="text" title="filtrar por titulo o descripcion" class="mytask-input" v-model="taskTitle" >
            <select  class="filter-user" title="Filtar or usuario asignado" v-model="selectUser" v-on:change="showTaskSelectedUser()" >
                    <option value="-1" selected>Todas</option>
                    <option v-on:click="showTaskSelectedUser(user.id)"  v-for="user in userss" :key="user.id" :value="user.id">{{user.firstname +" "+user.lastname}}</option>
            </select>
            <select  class="filter-user" title="filtrar por fase" v-model="selectPhase" v-on:change="getCurrentPhases()" >
                    <option value="-1" selected>Actual</option>
                    <option   v-for="phase in phasesKb" :key="phase.id" :value="phase.id">{{phase.name}}</option>
            </select>
        </div>
        <div class="container-kanban" v-if="haveData"  >
            <div class="mask" v-if="show || showH" v-on:click="hideMenu();hideMenuH()"></div>
            <div class="tasks">
                <drop @dragover="changePhase(state.name)" class="item" v-for="state in states" :key="state.id">
                    <div class="text-container">
                            <p>{{state.name}}</p>
                        </div>
                        <div class="task-container">
                            <div v-for="task in tasks" :key="task.id">
                                <drag @dragend="handleDrop" :transfer-data="task" >
                                    <div class="task" v-bind:class="{ 'task-retard': retard.includes(task.id) }" v-if="task.state == state.name && !task.deleted &&showTaskfilter(task.id) && (isActive ? usersId.includes(task.userId):true)&&(isActiveS ? usersId.includes(task.userId):true)&& isCurrent(task.phase) && (isActiveR ? retard.includes(task.id):true )" >
                                        <div class="task-title">
                                            <p>{{task.title}}</p>
                                            <span   v-on:click="showMenu(task)" title="editar la tarea">
                                                <i class="fas fa-edit"></i>
                                            </span> 
                                            <span v-on:click="showHours(task)" title="imputar horas en la tarea">
                                                <i class="far fa-clock"></i>
                                            </span>
                                            <span class="trash" title="quitar tarea del kamban"  v-on:click="deletedTask(task)" v-if="state.name=='Terminada'">
                                                <i class="fas fa-eye-slash"></i>
                                            </span> 
                                        </div>
                                        <div class="task-body">
                                            <div class="assigned">
                                                <div class="icon">
                                                    <span style="font-size: 1em;">
                                                        <i class="far fa-user-circle"></i>
                                                    </span> 
                                                </div>
                                                <div class="name">
                                                    <p>{{task.assigned}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </drag>
                            </div>
                        </div>
                </drop>
            </div>
            <transition name="slide-fade">
                <taskdata v-if="show" :myTask="sendTask"></taskdata>  
            </transition>
            <transition name="fade">
                <changehours v-if="showH" :myTask="sendTask"></changehours>  
            </transition>
        </div>
    </div>
</template>

<script>

 import { stateService } from '../_services/states.service';
 import { taskService } from '../_services/task.service';
 import { userService} from '../_services/user.service';
 import { phaseService } from '../_services/phase.service';
export default {
    data(){
       return{ 
        currentUser: JSON.parse(localStorage.getItem('user')),
        selectUser: -1,
        tasks:[],
        states:[],
        retard:[],
        phasesKb:[],
        currentPhases:[],
        selectPhase:-1,
        taskTitle:"",
        haveData: false,
        show :false,
        showH:false,
        isActive:false,
        isActiveR:false,
        isActiveA:false,
        isActiveS:false,
        sendTask: {},
        usersId:[],
        userss:[],
        state:""
       }
    },
    computed: {
    },
    created () {
        this.getSeries();
        this.getUsers();
        this.getStates();
        this.getPhases();
    },
    methods: {
       getSeries: function () {
          taskService.getAll().then(
            taskss=>{
              this.updateData(taskss);
               this.haveData = true;
            }
       );
        },
        updateTask: function (task) {
            taskService.changeTask(task).then(
                resp => {
                    this.result = "La tarea ha sido actualizada.";
                }
            );
        },
        getStates: function () {
          stateService.getAll().then(
            elements=>{
              this.states = elements;
            }
       );
        },
        getPhases: function () {
          phaseService.getAll().then(
            fases=>{
            this.phasesKb=fases;
             this.getCurrentPhases();
            }
       );
        },
         getUsers: function () {
          userService.getAll().then(
            users=>{
                users.forEach(element => {
                    this.usersId.push(element.id);
                    this.userss = users;
                });
             
            }
       );
        },
        getCurrentPhases:function () {
           if(this.$route.params.id == -1 && this.selectPhase ==-1){
                this.currentPhases = [];
                this.phasesKb.forEach(phase => {
                let end= Date.UTC(parseFloat(phase.yearf),parseFloat(phase.monthf),parseFloat(phase.dayf));
                let start= Date.UTC(parseFloat(phase.yeari),parseFloat(phase.monthi),parseFloat(phase.dayi));
                let date = new Date();

                if(end>=date && start<date){
                    this.currentPhases.push(phase.id)
                }
                });
            }else if(this.selectPhase !=-1){
                this.currentPhases = [];
                this.currentPhases.push(this.selectPhase);
            }else{
                this.currentPhases = [];
                this.currentPhases.push(parseInt(this.$route.params.id));
                this.$route.params.id = -1;
            }
        },
        isCurrent: function (phaseId){
           return (this.currentPhases.includes(phaseId)) ? true : false;
        },
        updateData: function (taskss) {
            this.haveData = true;
            this.tasks = taskss;
            this.tasks.forEach(element => {
                let dateTask = new Date(element.dateF);
                let date = new Date();
               if(dateTask < date && element.state != "Terminada"){
                    this.retard.push(element.id);
                    }
            });
      
        },
        showMenu: function (task) {
            this.show = true;
            this.sendTask = task;
        },
        showHours: function (task) {
            this.showH = true;
            this.sendTask = task;
        },
        deletedTask: function (task) {
            task.deleted=true;
            this.updateTask(task);
        },
        handleDrop(data, event) {
            data.state = this.state;
            this.updateTask(data);
        },
        changePhase: function (state) {
            this.state = state;
        },
        hideMenu: function () {
            if(this.show)
            this.show = false;
        },
        hideMenuH: function () {
            if(this.showH)
            this.showH = false;
        },
        showTaskfilter:function (id) {
            var ret = false;
          if(this.taskTitle == ""){
              return true;
          } else{
              this.tasks.forEach(element => {
                if(element.id == id && (element.title.toUpperCase().includes(this.taskTitle.toUpperCase()) 
                || element.assigned.toUpperCase().includes(this.taskTitle.toUpperCase()))){
                    ret = true;
                }
              });
              return ret;
          }
        },
        showTaskCurrentUser: function () {
            this.isActive = !this.isActive;
            this.isActiveA = false;   
            this.isActiveR = false;
            this.isActiveS = false;
            this.selectUser = -1;
            if(this.isActive)
                this.usersId = [this.currentUser.id];
            else
                this.showAllTask();       
        },
        showTaskSelectedUser: function () {
            this.isActiveR = false;
            this.isActiveA = false;   
            this.isActive = false;
            this.isActiveS = !this.isActiveS;
            console.log(this.selectUser);
            if(this.selectUser < 0){
                this.showAllTask(); 
            }
            else{
                this.usersId = [this.selectUser];
                console.log(this.usersId);
            }
        },
        showTaskRetard: function () {
            this.isActiveR = !this.isActiveR;
            this.isActiveA = false;   
            this.isActive = false;
            this.isActiveS = false;
        },
        showAllTask:function () {
            this.isActiveA = !this.isActiveA;
            userService.getAll().then(
            users=>{
                users.forEach(element => {
                    this.usersId.push(element.id);
                    this.userss = users;
                });
             
            }
       );
        }

    }
};
</script>
<style scoped>
.mytask-bt{
    background-color: white;
    border: none;
    border-radius: 1rem;
    color: #333399;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    margin-left: 10px;
    transition: background-color 1s ease;
    transition: color 1.2s ease;
}
.mytask-input{
     background-color: white;
    border: none;
    border-radius: 1rem;
    padding-left: 5px;
    color: #333399;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    margin-left: 10px;
    transition: background-color 1s ease;
    transition: color 1.2s ease;
}
.mytask-input:hover{
    background-color: #333399;
    color: white;
}
.mytaskbt-selected{
    background-color: #333399;
    color: white;
}
.filter-user{
    border: none;
    border-radius: 5px;
    box-sizing: border-box;
    color: #333399;
    font-family: 'Roboto', sans-serif;
    margin-left: 10px;
    padding: 0 15px;
    transition: background-color 1s ease;
    transition: color 1.2s ease;
}
.filter-user:hover{
    background-color:#333399;
    color: white;
}
.mytask-bt:hover{
    background-color: #333399;
    color: white;
}
.filter-kamban{
    display: flex;
    flex-direction:column;
}
.filter{
    background-color: #D8E1FF;
    border: 2px solid #333399;
    border-radius: 1rem;
    display: flex;
    flex-direction: row;
    height: 35px;
    margin: 0 auto;
    padding: 0.5rem;
    width: 87%;
}
.container-kanban{
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    margin: 0 auto;
    margin-top: 10px;
    width: 95%;
}
.tasks{
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    margin: 0 auto;
    width: 95%;
    z-index: 1;
}
.item{
    background-color: white;
    border: 2px solid #333399;
    border-radius: 1rem;
    color: #333399;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: 10px;
}
.item:hover{
    border-color: #17DA17;

}
.text-container{
    border-top: 1px solid #EDEDED;
    font-weight: 700;
    line-height: 50px;
    text-align: center;
    text-transform: none;
    vertical-align: middle;
}
a{
    text-decoration: none;
}
.task{
    background-color: #333399;
    border-radius: 1rem;
    color: white;
    cursor: move;
    margin: 0 auto;
    margin-top: 8px;
    width: 97%;
}
.task-retard{
    background-color: #FF4646;
}
.task:hover{
    transition:  0.5s ease-out;
    transform: scale(1.1,1.1);
}
.task-title{
    border-bottom: 1px solid black;
    display: flex;
    padding: 2%;

}
.task-title > p{
    text-align: center;
    width: 80%;
}
.task-title > span{
    cursor: auto;
    cursor: pointer;
    font-size: 1em;
    margin-left: 7px;
}
.trash{
    margin-right: 5px;
}
.task-body{
    display: flex;
    margin-top: 10px;
    flex-direction: column;
    justify-content: center;
}
.assigned{
    display: flex;
    flex-direction: row;
    margin-left: 10px;
}
.time{
    display: flex;
    flex-direction: row;
    margin-top: 30px;

}
.name{
    display: flex;
    flex-direction: column;
    font-size: 1em;
    justify-content: center;
    margin-left: 10px;
}
.mask{
    background-color: #3D3A3F;
    height: 100%;
    opacity: 0.8;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 5;
}
.slide-fade-enter-active {
  transition: all 2.3s ease;
}
.slide-fade-leave-active {
    transition: all 2.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(100%);
 
}
p{
    font-family: 'Roboto', sans-serif;
    margin-bottom: 2px;
}
@media only screen and (max-width: 980px) {
    .task{
         height: 100px;
    }
}
</style>