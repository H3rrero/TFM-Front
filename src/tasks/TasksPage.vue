<template>
    <div>
        <app-breadcrumbs></app-breadcrumbs>
        <div class="task-container">
            <div class="mask" v-if="show ||showMessage" v-on:click="hideMenu();"></div>
            <drop @dragover="asignedTask(-1,'','')"  class="unassigned-task"  v-if="haveData" >
                 <div class="title-task-data">
                    <p>{{"Backlog de "+phaseName}}</p>
                     <span   v-on:click="showList()" title="Mostrar lista de usuarios">
                        <i class="fas fa-list"></i>
                    </span> 
                </div>
                <div v-for="task in tasks" :key="task.id">
                    <drag @dragend="handleDrop"  :transfer-data="task" >
                         <task v-if="task.userId == -1 && (task.phase == phaseId)" :task="task" v-on:show-data="showMenu(task)"></task>  
                    </drag>
                </div>
            </drop>

            <div class="programmers">
                <div class="programmers-item"  v-for="user in userss" :key="user.id">
                    <div class="programmers-item-title">
                        {{user.firstname + ' '+ user.lastname}}
                    </div>
                    <drop @dragover="asignedTask(user.id,user.firstname,user.lastname)" class="programmers-item-task">
                        <div v-for="task in tasks" :key="task.id">
                            <drag @dragend="handleDrop"  :transfer-data="task" >
                               <task v-if="task.userId == user.id && task.phase == phaseId" :task="task" v-on:show-data="showMenu(task)"></task>
                            </drag>
                        </div>
                    </drop>
                </div>
            </div>
                
             <transition name="slide-fade">
                <taskdetail v-if="show" :myTask="sendTask"></taskdetail>  
            </transition> 
            <transition name="fade">
                <notification class="notification" v-if="showMessage" v-on:close-dialog="hideMenu"  :message="'No puedes asignar tareas a otros usuarios.'"></notification>  
            </transition>
        </div>
    </div>
</template>

<script>

 import { taskService } from '../_services/task.service';
 import { userService} from '../_services/user.service';
 import { phaseService } from '../_services/phase.service';
export default {
    data(){
       return{ 
        tasks:[],
        usersId:[],
        userss:[],
        phaseId:-1,
        phaseName:"",
        show:false,
        showMessage:false,
        currentUser: JSON.parse(localStorage.getItem('user')),
        sendTask:{},
        haveData: false,
        userAsignedId:-1,
        assigned:"",
        phase:""
       }
    },
    created () {
        this.getSeries();
        this.getUsers();
        this.getPhases();
    },
    methods: {
       getSeries: function () {
          taskService.getAll().then(
            taskss=>{
             this.haveData = true;
             this.tasks = taskss;
            }
       );
        },
        getPhases: function () {
          phaseService.getAll().then(
            fases=>{
            fases.forEach(element => {
                if(this.isActual(element)){
                    console.log("actual");
                    console.log(element);
                    this.phaseId = element.id;
                    this.phaseName = element.name;
                }
            });
             
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
        showMenu: function (task) {
            this.show = true;
            console.log(task);
            this.sendTask = task;
        },
         hideMenu: function () {
            if(this.show)
            this.show = false;
            if(this.showMessage)
            this.showMessage = false;

        },
        handleDrop(data, event) {
            if(this.currentUser.rol =='manager' || this.currentUser.id == this.userAsignedId || this.userAsignedId == -1){
                data.userId = this.userAsignedId;
                data.assigned = this.assigned;
                data.state = this.phase;
                taskService.changeTask(data);
            }else{
                this.showMessage = true;
            }
        },
        asignedTask: function (id,name,lastName) {
            this.userAsignedId = id;
            this.assigned = name + " " + lastName;
            if(id == -1){
                this.phase = 'sin asignar';
            }else{
                this.phase = 'Backlog';
            }
        },
        isActual:function (phase) {
             let end= new Date(phase.dateF);
             let start= new Date(phase.dateI);
             let date = new Date();

             return (end>=date && start<date) ? true : false;
        },
        showList: function () {
            this.$router.push('/taskslist');
        }
      

    }
};
</script>
<style scoped>
.task-container{
    display: flex;
    flex-direction: row;
    height: 100%;
}
.unassigned-task{
    background-color: #333399;
    border: 2px solid white;
    border-radius: 1rem;
    margin-right: 10px;
    width: 20%;
}
.title-task-data{
    border-bottom: 1px solid #6B6FCE;
    color: white;
    display: flex;
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    margin: 0 auto;
    margin-left: 10px;
    margin-right: 10px;
    vertical-align: middle;
}
.title-task-data > p{
    margin: 0 auto;
}
.programmers{
    background-color: white;
    border: 2px solid #333399;
    border-radius: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    margin-right: 10px;
    padding: 1rem;
    width: 80%;
}
.programmers-item{
    background-color: white;
    color: #6B6FCE;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-bottom: 10px;
    min-height: 50px;
    width: 300px;
}
.programmers-item:hover{
    transform: scale(1.03,1.03);
    transition:  0.3s ease-out;
}
.programmers-item-title{
    background-color: #333399;
    border-bottom: 1px solid white;
    color: white;
    font-family: 'Roboto', sans-serif;
    height: 20px;
    padding: 0.3rem;
    text-align: center;
}
.programmers-item-task{
    height: 90%;
    background-color: #333399;
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
.notification{
    margin-left: 40%;
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
</style>