<template>
    <div class="filter-kamban">
        <app-breadcrumbs v-bind:class="{ 'user-background': currentUser.rol=='user','man-background': currentUser.rol=='manager' }" ></app-breadcrumbs>
        <div class="filter" v-bind:class="{ 'user-border': currentUser.rol=='user','man-border': currentUser.rol=='manager'}" >
            <button class="mytask-bt" title="filtrar por tus tareas asignadas" v-bind:class="{ 'mytaskbt-selected': isActive,'user-color': currentUser.rol=='user','man-color': currentUser.rol=='manager'}" v-on:click="showTaskCurrentUser()">Mis tareas</button>
            <button class="mytask-bt" title="filtrar por tareas retrasadas" v-bind:class="{ 'mytaskbt-selected': isActiveR,'user-color': currentUser.rol=='user','man-color': currentUser.rol=='manager' }" v-on:click="showTaskRetard()">Retrasadas</button>
            <button class="mytask-bt" title="filtrar por tareas no asignadas" v-bind:class="{ 'mytaskbt-selected': isActiveNa,'user-color': currentUser.rol=='user','man-color': currentUser.rol=='manager' }" v-on:click="showTaskNonAssigned()">No asignadas</button>
            <input type="text" title="filtrar por titulo o descripcion" class="mytask-input" v-bind:class="{'user-color': currentUser.rol=='user','man-color': currentUser.rol=='manager'}" v-model="taskTitle" >
            <select  class="filter-user" title="Filtar or usuario asignado" v-model="selectUser" v-on:change="showTaskSelectedUser(selectUser)" >
                    <option value="-1" selected>Todas</option>
                    <option   v-for="user in userss" :key="user.id" :value="user.id">{{user.firstname +" "+user.lastname}}</option>
            </select>
            <select  class="filter-user" title="filtrar por fase" v-bind:class="{'user-color': currentUser.rol=='user','man-color': currentUser.rol=='manager'}" v-model="selectPhase" v-on:change="getCurrentPhases()" >
                    <option value="-1" selected>Actual</option>
                    <option   v-for="phase in phasesKb" :key="phase.id" :value="phase.id">{{phase.name}}</option>
            </select>
            <button class="newtask-bt plus" v-bind:class="{'user-background': currentUser.rol=='user','man-background': currentUser.rol=='manager'}" title="añadir nueva tarea" v-on:click="openNewTask()">
                <span>
                    <i class="fas fa-plus-circle"></i>
                </span>
            </button>
            <div class="current-phase" v-bind:class="{'user-color': currentUser.rol=='user','man-color': currentUser.rol=='manager'}" title="fase actual">
                <p>{{namePhase}}</p>
            </div>
            <span v-if="exclamation" title="tienes mensajes importantes" v-on:click="showMessagePage()">
                 <i class="fas fa-exclamation-circle"></i>
            </span>
        </div>
        <div class="container-kanban" v-if="haveData"  >
            <div class="mask" v-if="show || showH || showMessages || showNotification" v-on:click="hideMenu();hideMenuH();hideMenuM();hideMenuN();"></div>
            <div class="tasks">
                <drop @dragover="changePhase(state.name)" class="item"  v-bind:class="{ 'user-border user-color': currentUser.rol=='user','man-border man-color': currentUser.rol=='manager'}" v-for="state in states" :key="state.id">
                    <div class="text-container">
                            <p>{{state.name}}</p>
                        </div>
                        <div class="task-container">
                            <div v-for="task in tasks" :key="task.id">
                                <drag @dragend="handleDrop" :transfer-data="task" >
                                    <div class="task" v-bind:class="{ 'task-retard': retard.includes(task.id),'user-background': currentUser.rol=='user','man-background': currentUser.rol=='manager' }" v-if="(task.state == state.name || checkBacklog(task.userId,state.name)) && !task.deleted &&showTaskfilter(task.id) && (isActive ? usersId.includes(task.userId):true)&&(isActiveS ? usersId.includes(task.userId):true)&& isCurrent(task.phase) && (isActiveR ? retard.includes(task.id):true ) && (isActiveNa ? nonAssigned.includes(task.id):true )" >
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
                <taskdata v-if="show" :myTask="sendTask" :user="currentUser" v-on:update-task="getSeries" ></taskdata>  
            </transition>
            <transition name="slide-fade">
                <messages v-if="showMessages" :message="message"></messages>  
            </transition>
            <transition name="fade">
                <notification v-if="showNotification" v-on:close-dialog="hideMenuN"  :message="'Par poder sacar una tarea del backlog tiene que estar asignada.'"></notification>  
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
  import { userProjectService } from '../_services/userProject.service';
export default {
    data(){
       return{ 
        currentUser: JSON.parse(localStorage.getItem('user')),
        selectUser: -1,
        selectProject:this.$route.params.id,
        tasks:[],
        states:[],
        retard:[],
        nonAssigned:[],
        phasesKb:[],
        currentPhases:[],
        namePhase:"",
        tasksMoved:[],
        tasksCreated:[],
        exclamation:false,
        selectPhase:-1,
        taskTitle:"",
        haveData: false,
        show :false,
        showH:false,
        isActive:false,
        isActiveR:false,
        isActiveNa:false,
        isActiveA:false,
        isActiveS:false,
        showMessages:false,
        showNotification:false,
        sendTask: {},
        message:{},
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
         taskService.getByProject(this.selectProject).then(
            taskss=>{
              this.updateData(taskss);
              this.getCurrentPhases();
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
          stateService.getByProject(this.selectProject).then(
            elements=>{
              this.states = elements;
            }
       );
        },
        getPhases: function () {
          phaseService.getByProject(this.selectProject).then(
            fases=>{
            this.phasesKb=fases;
             this.getCurrentPhases();
             this.checkState();
            }
       );
        },
        checkState:function () {
          this.phasesKb.forEach(element => {
              if(this.isFinish(element))
              taskService.getByPhaseAndProject(element.id,this.selectProject).then(
                  tasks =>{
                      tasks.forEach(task => {
                          if(task.state!="Terminada" && !task.finish){
                              this.tasksMoved.push(task.title);
                              task.finish = true;
                              taskService.changeTask(task);
                              task.state = "sin asignar";
                              task.phase = -1;
                              task.userId = -1;
                              this.tasksCreated.push(task);
                              this.exclamation=true;
                          }
                      });
                  }
              );
          });
          setTimeout(() => {
                          this.createTask(0)
                      }, 100);  
        },
        createTask:function(counter){
            if(this.tasksCreated[counter]!=undefined)
            taskService.createTask(this.tasksCreated[counter]).then(
                task =>{
                    if(this.tasksCreated[counter+1]!=undefined)
                    this.createTask(counter+1);
                }
            );
        },
        checkBacklog: function (userId, stateName) {
            if(this.isActiveNa){
                if(userId == -1 && stateName == "Backlog")
                    return true;
                else
                    return false;
            }
        },
        isFinish:function (phase) {
            let end= new Date(phase.dateF);
            let date = new Date();
            
            return end<date ? true : false;
        },
         getUsers: function () {
          userProjectService.getUserByProject(this.selectProject).then(
            users=>{
                console.log(users);
                users.forEach(element => {
                    if(element != null){
                        console.log(element);
                    this.usersId.push(element.id);
                    this.userss.push(element);
                    }
                });
             
            }
       );
        },
        openNewTask:function (id) {
            this.$router.push('/newTask/'+this.selectPhase+'/'+this.selectProject);
        },
        getCurrentPhases:function () {
           if(this.$route.params.id == -1 && this.selectPhase ==-1){
                this.currentPhases = [];
                this.phasesKb.forEach(phase => {
                let end= new Date(phase.dateF);
                let start= new Date(phase.dateI);
                let date = new Date();

                if(end>=date && start<date){
                    this.currentPhases.push(phase.id)
                    this.selectPhase = phase.id;
                    this.namePhase = phase.name;
                }
                });
            }else if(this.selectPhase !=-1){
                this.currentPhases = [];
                this.currentPhases.push(this.selectPhase);
                this.phasesKb.forEach(phase => {
                    if(phase.id == this.selectPhase){
                        this.namePhase = phase.name;
                    }
                });
            }else{
                this.currentPhases = [];
                this.currentPhases.push(parseInt(this.$route.params.id));
                this.phasesKb.forEach(phase => {
                    if(phase.id == this.$route.params.id){
                        this.namePhase = phase.name;
                    }
                });
                this.$route.params.id = -1;

            }
        },
        isCurrent: function (phaseId){
           return (this.currentPhases.includes(phaseId)) ? true : false;
        },
        updateData: function (taskss) {
            this.haveData = true;
            this.tasks = taskss;
            this.nonAssigned = [];
            this.tasks.forEach(element => {
                let dateTask = new Date(element.dateF);
                let date = new Date();
               if(dateTask < date && element.state != "Terminada"){
                    this.retard.push(element.id);
                    }
                if(element.userId == -1){
                    this.nonAssigned.push(element.id);
                }
            });
      
        },
        showMenu: function (task) {
            this.show = true;
            this.sendTask = task;
        },
        showMessagePage: function () {
          this.showMessages = true;  
          let title = "Tareas no acabadas"
          let messageBody = `Las siguientes tareas no han sido acabadas durante el sprint anterior y se han añadido al backlog:\n`
         this.tasksMoved.forEach(element => {
             messageBody = messageBody + `\n${element}`
         });
         this.message.title = title;
         this.message.body = messageBody;
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
            if(data.userId!=-1){
                data.state = this.state;
                this.updateTask(data);
            }else{
                this.showNotification = true;
            }
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
        hideMenuM: function () {
            if(this.showMessages)
            this.showMessages = false;
        },
        hideMenuN: function () {
            if(this.showNotification)
            this.showNotification = false;
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
            if(this.selectUser < 0){
                this.showAllTask(); 
            }
            else{
                this.usersId = [this.selectUser];
            }
        },
        showTaskRetard: function () {
            this.isActiveR = !this.isActiveR;
            this.isActiveA = false;   
            this.isActive = false;
            this.isActiveS = false;
        },
        showTaskNonAssigned: function () {
            this.isActiveNa = !this.isActiveNa;
            this.isActiveR = false;
            this.isActiveA = false;   
            this.isActive = false;
            this.isActiveS = false;
        },
        showAllTask:function () {
            this.isActiveA = !this.isActiveA;
            userProjectService.getUserByProject(this.selectProject).then(
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
 <style  scoped>


.mytask-bt{/*color*/
    background-color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    margin-left: 10px;
    -webkit-transition: background-color 1s ease;
    -o-transition: background-color 1s ease;
    transition: background-color 1s ease;
    -webkit-transition: color 1.2s ease;
    -o-transition: color 1.2s ease;
    transition: color 1.2s ease;
}
.newtask-bt{
    border: none;
    border-radius: 0.5rem;
    color: white;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    margin-left: 10px;
    -webkit-transition: background-color 1s ease;
    -o-transition: background-color 1s ease;
    transition: background-color 1s ease;
    -webkit-transition: color 1.2s ease;
    -o-transition: color 1.2s ease;
    transition: color 1.2s ease;
}
.plus{
    padding: 5px;
}
.plus > span{
    cursor: pointer;
    font-size: 20px;
}
.filter > span{
    cursor: pointer;
    font-size: 28px;
    margin-left: auto;
}
.current-phase{
    font-size: 24px;
    font-weight: 600;
    margin-left: auto;
}
.mytask-input{
     background-color: white;
    border: none;
    border-radius: 0.5rem;
    padding-left: 5px;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    margin-left: 10px;
    -webkit-transition: background-color 1s ease;
    -o-transition: background-color 1s ease;
    transition: background-color 1s ease;
    -webkit-transition: color 1.2s ease;
    -o-transition: color 1.2s ease;
    transition: color 1.2s ease;
}
.mytask-input:hover{
    color: white;
}
.mytaskbt-selected{
    color: white;
}
.filter-user{
    border: none;
    border-radius: 5px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    margin-left: 10px;
    padding: 0 15px;
    -webkit-transition: background-color 1s ease;
    -o-transition: background-color 1s ease;
    transition: background-color 1s ease;
    -webkit-transition: color 1.2s ease;
    -o-transition: color 1.2s ease;
    transition: color 1.2s ease;
}
.filter-user:hover{
    background-color:var(--man-color);
    color: white;
}
.mytask-bt:hover{
    background-color: var(--man-color);
    color: white;
}
.filter-kamban{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
        -ms-flex-direction:column;
            flex-direction:column;
}
.filter{
    background-color: #D8E1FF;
    border-radius: 0.5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    height: 35px;
    margin: 0 auto;
    padding: 0.5rem;
    width: 97%;
}
.container-kanban{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    height: 100%;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin: 0 auto;
    margin-top: 10px;
    width: 98%;
}
.tasks{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    height: 100%;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin: 0 auto;
    width: 100%;
    z-index: 1;
}
.item{
    background-color: white;
    border-radius: 0.5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-flex: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
}
.tasks .item:nth-child(n+2) {
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
    border-radius: 0.5rem;
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
    -webkit-transition:  0.5s ease-out;
    -o-transition:  0.5s ease-out;
    transition:  0.5s ease-out;
    -webkit-transform: scale(1.1,1.1);
        -ms-transform: scale(1.1,1.1);
            transform: scale(1.1,1.1);
}
.task-title{
    border-bottom: 1px solid black;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 2%;

}
.task-title > p{
    text-align: center;
    width: 80%;
}
.task-title > span{
    cursor: pointer;
    font-size: 1em;
    margin-left: 7px;
}
.trash{
    margin-right: 5px;
}
.task-body{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-top: 10px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
}
.assigned{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    margin-left: 10px;
}
.time{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    margin-top: 30px;

}
.name{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    font-size: 1em;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
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
  -webkit-transition: all 2.3s ease;
  -o-transition: all 2.3s ease;
  transition: all 2.3s ease;
}
.slide-fade-leave-active {
    -webkit-transition: all 2.3s ease;
    -o-transition: all 2.3s ease;
    transition: all 2.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  -webkit-transform: translateX(100%);
      -ms-transform: translateX(100%);
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