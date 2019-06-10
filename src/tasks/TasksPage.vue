<template>
    <div>
        <app-breadcrumbs v-bind:class="{ 'user-background': currentUser.rol=='user','man-background': currentUser.rol=='manager' }" ></app-breadcrumbs>
        <div class="task-container">
            <div class="mask" v-if="show ||showMessage" v-on:click="hideMenu();"></div>
            <drop @dragover="asignedTask(-1,'','')"  class="unassigned-task"  v-if="haveData" v-bind:class="{ 'user-background': currentUser.rol=='user',' man-background': currentUser.rol=='manager' }">
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

            <div class="programmers" v-bind:class="{ 'user-border': currentUser.rol=='user',' man-border': currentUser.rol=='manager' }">
                <div class="programmers-item"  v-for="user in userss" :key="user.id">
                    <div class="programmers-item-title" v-bind:class="{ 'user-background': currentUser.rol=='user',' man-background': currentUser.rol=='manager' }">
                        {{user.firstname + ' '+ user.lastname}}
                    </div>
                    <drop @dragover="asignedTask(user.id,user.firstname,user.lastname)" class="programmers-item-task" v-bind:class="{ 'user-background': currentUser.rol=='user',' man-background': currentUser.rol=='manager' }">
                        <div v-for="task in tasks" :key="task.id">
                            <drag @dragend="handleDrop"  :transfer-data="task" >
                               <task v-if="task.userId == user.id && task.phase == phaseId" :task="task" v-on:show-data="showMenu(task)"></task>
                            </drag>
                        </div>
                    </drop>
                </div>
            </div>
                
             <transition name="slide-fade">
                <taskdetailchangeuser v-if="show" :myTask="sendTask" :project="selectProject"></taskdetailchangeuser>  
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
 import { userProjectService } from '../_services/userProject.service';
export default {
    data(){
       return{ 
        tasks:[],
        usersId:[],
        userss:[],
        selectProject:this.$route.params.id,
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
        if(this.selectProject == undefined){
            userProjectService.getProjectByUser(this.currentUser.id).then(projects =>{
                this.selectProject = projects[0].id;
                this.getSeries();
                this.getUsers();
                this.getPhases();
            })
        }else{
        this.getSeries();
        this.getUsers();
        this.getPhases();
        }
        
    },
    methods: {
       getSeries: function () {
          taskService.getByProject(this.selectProject).then(
            taskss=>{
             this.haveData = true;
             this.tasks = taskss;
            }
       );
        },
        getPhases: function () {
         phaseService.getByProject(this.selectProject).then(
            fases=>{
            fases.forEach(element => {
                if(this.isActual(element)){
                    this.phaseId = element.id;
                    this.phaseName = element.name;
                }
            });
             
            }
       );
        },
         getUsers: function () {
          userProjectService.getUserByProject(this.selectProject).then(
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    height: 100%;
}
.unassigned-task{
    border: 2px solid white;
    border-radius: 0.5rem;
    margin-right: 10px;
    width: 20%;
}
.title-task-data{
    border-bottom: 1px solid #6B6FCE;
    color: white;
    display: -webkit-box;
    display: -ms-flexbox;
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
    border-radius: 0.5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin: 0 auto;
    margin-right: 10px;
    padding: 1rem;
    width: 80%;
}
.programmers-item{
    background-color: white;
    color: #6B6FCE;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    margin-left: 10px;
    margin-bottom: 10px;
    min-height: 50px;
    width: 300px;
}
.programmers-item:hover{
    -webkit-transform: scale(1.03,1.03);
        -ms-transform: scale(1.03,1.03);
            transform: scale(1.03,1.03);
    -webkit-transition:  0.3s ease-out;
    -o-transition:  0.3s ease-out;
    transition:  0.3s ease-out;
}
.programmers-item-title{
    border-bottom: 1px solid white;
    color: white;
    font-family: 'Roboto', sans-serif;
    height: 20px;
    padding: 0.3rem;
    text-align: center;
}
.programmers-item-task{
    height: 90%;
}
.mask{
    background-color: #3D3A3F;
    height: 100%;
    opacity: 0.8;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 5;
}
.notification{
    margin-left: 40%;
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
</style>