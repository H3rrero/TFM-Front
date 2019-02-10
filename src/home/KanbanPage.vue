<template>
    <div class="filter-kamban">
        <div class="filter">
            <button class="myTaskBt" v-bind:class="{ myTaskBtSelected: isActive }" v-on:click="showTaskCurrentUser()">Mis tareas</button>
            <button class="myTaskBt" v-bind:class="{ myTaskBtSelected: isActiveR }" v-on:click="showTaskRetard()">Retrasadas</button>
            <select  class="filterUser" v-model="selectUser" v-on:change="showTaskSelectedUser()" >
                    <option v-on:click="showTaskSelectedUser(user.id)"  v-for="user in userss" :key="user.id" :value="user.id">{{user.firstname +" "+user.lastname}}</option>
            </select>
        </div>
        <div class="container-Kanban" v-if="haveData"  >
            <div class="mask" v-if="show || showH" v-on:click="hideMenu();hideMenuH()"></div>
        <div class="tasks">
            <drop @dragover="changePhase('desarrollo')" class="item">
                <div class="text-container">
                        <p>Desarrollo</p>
                    </div>
                    <div class="task-container">
                        <div v-for="task in tasks" :key="task.id">
                            <drag @dragend="handleDrop" :transfer-data="task" >
                                <div class="task" v-if="task.phase == 'desarrollo' && showTaskUser(task.userId)" >
                                    <div class="task-title">
                                        <p>{{task.title}}</p>
                                        <span   v-on:click="showMenu(task)">
                                            <i class="fas fa-edit"></i>
                                        </span> 
                                        <span v-on:click="showHours(task)">
                                            <i class="far fa-clock"></i>
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
            <drop @dragover="changePhase('pruebas')"  class="item">
                <div class="text-container">
                        <p>Pruebas</p>
                    </div>
                    <div class="task-container">
                        <div v-for="task in tasks" :key="task.id">
                            <drag @dragend="handleDrop"  :transfer-data="task">
                                <div class="task" v-if="task.phase == 'pruebas' && showTaskUser(task.userId)" >
                                    <div class="task-title">
                                        <p>{{task.title}}</p>
                                        <span  v-on:click="showMenu(task)">
                                            <i class="fas fa-edit"></i>
                                        </span> 
                                        <span v-on:click="showHours(task)">
                                            <i class="far fa-clock"></i>
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
            <drop @dragover="changePhase('produccion')" class="item">
            <div class="text-container">
                    <p>Producción</p>
                </div>
                <div class="task-container">
                    <div v-for="task in tasks" :key="task.id">
                        <drag @dragend="handleDrop"  :transfer-data="task">
                            <div class="task" v-if="task.phase == 'produccion' && showTaskUser(task.userId)"  >
                                <div class="task-title">
                                    <p>{{task.title}}</p>
                                    <span  v-on:click="showMenu(task)">
                                            <i class="fas fa-edit"></i>
                                    </span> 
                                    <span v-on:click="showHours(task)">
                                            <i class="far fa-clock"></i>
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
            <drop @dragover="changePhase('pruebas finalizadas')"  class="item">
                <div class="text-container">
                    <p>Pruebas finalizadas</p>
                </div>
                <div class="task-container">
                    <div v-for="task in tasks" :key="task.id">
                        <drag @dragend="handleDrop"  :transfer-data="task">
                            <div class="task" v-if="task.phase == 'pruebas finalizadas' && showTaskUser(task.userId)"  >
                                <div class="task-title">
                                    <p>{{task.title}}</p>
                                    <span  v-on:click="showMenu(task)">
                                            <i class="fas fa-edit"></i>
                                    </span> 
                                    <span v-on:click="showHours(task)">
                                            <i class="far fa-clock"></i>
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

 import { taskService } from '../_services/task.service';
 import { userService} from '../_services/user.service';
export default {
    data(){
       return{ 
        currentUser: JSON.parse(localStorage.getItem('user')),
        selectUser: 0,
        tasks:[],
        haveData: false,
        show :false,
        showH:false,
        isActive:false,
        isActiveR:false,
        isActiveA:false,
        sendTask: {},
        usersId:[],
        userss:[],
        phase:""
       }
    },
    computed: {
    },
    created () {
        this.getSeries();
        this.getUsers();
    },
    methods: {
       getSeries: function () {
          taskService.getAll().then(
            taskss=>{
              this.updateData(taskss);
             
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
        updateData: function (taskss) {
            console.log("fases2")
            console.log(this.tasks)
         
            this.haveData = true;
            this.tasks = taskss;
      
        },
        showMenu: function (task) {
            console.log("showMenu");
            this.show = true;
            this.sendTask = task;
            console.log(task.title);
        },
        showHours: function (task) {
            console.log("showMenu");
            this.showH = true;
            this.sendTask = task;
            console.log(task.title);
        },
        handleDrop(data, event) {
            data.phase = this.phase;
        },
        changePhase: function (phase) {
            this.phase = phase;
        },
        hideMenu: function () {
             console.log("hideMenu");
            if(this.show)
            this.show = false;
        },
        hideMenuH: function () {
             console.log("hideMenu");
            if(this.showH)
            this.showH = false;
        },
        showTaskUser: function (id) {
           return this.usersId.includes(id);
        },
        showTaskCurrentUser: function () {
            this.isActive = !this.isActive;
            if(this.isActive)
                this.usersId = [this.currentUser.id];
            else
                this.showAllTask();
           console.log(this.usersId);        
        },
        showTaskSelectedUser: function () {
            console.log("selected: "+this.selectUser)
           this.usersId = [this.selectUser];     
        },
        showTaskRetard: function () {
           this.isActiveR = !this.isActiveR;   
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
.myTaskBt{
    margin-left: 10px;
    border-radius: 1rem;
    border: 1px solid white;
    background-color: white;
    color: #2f96ef;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    transition: background-color 1s ease;
    transition: color 1.2s ease;
}
.filterUser{
    box-sizing: border-box;
    height: 35px;
    border: 2px solid white;
    border-radius: 5px;
    padding: 0 15px;
    margin-left: 10px;
    color: #2f96ef;
}
.myTaskBtSelected{
    background-color: #2f96ef;
    color: white;
}
.myTaskBt:hover{
    background-color: #2f96ef;
    color: white;
}
.filter-kamban{
    display: flex;
    flex-direction:column;
}
.filter{
    height: 60px;
    width: 89%;
    border-radius: 1rem;
    border: 2px solid #2F96EF;
    background-color: #eee;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    padding: 0.5rem;
}
.container-Kanban{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 95%;
    margin: 0 auto;
    min-height: 600px;
    height: 100%;
    margin-top: 10px;
}
.tasks{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 95%;
    margin: 0 auto;
    min-height: 600px;
    height: 100%;
    z-index: 1;
}
.item{
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    background-color: white;
    color: #2F96EF;
    flex-grow: 1;
    border-radius: 1rem;
    border: 2px solid #2F96EF;
}
.item:hover{
    border-color: #17DA17;

}
.text-container{
    border-top: 1px solid #EDEDED;
    text-align: center;
    text-transform: none;
    font-weight: 700;
    vertical-align: middle;
    line-height: 50px;
}
a{
    text-decoration: none;
}
.task{
    height: 80px;
    width: 90%;
    margin: 0 auto;
    color: white;
    background-color: #2F96EF;
    margin-top: 8px;
    border-radius: 1rem;
    cursor: move;
}
.task:hover{
    transition:  0.5s ease-out;
    transform: scale(1.1,1.1);
}
.task-title{
    padding: 2%;
    border-bottom: 1px solid black;
    display: flex;

}
.task-title > p{
    text-align: center;
    width: 80%;
}
.task-title > span{
    margin-left: 15px;
    cursor: auto;
    font-size: 1em;
    cursor: pointer;
}
.task-body{
    display: flex;
    flex-direction: column;
    height: 70%;
    justify-content: center;
}
.assigned{
    display: flex;
    flex-direction: row;
    margin-left: 10px;
}
.time{
    margin-top: 30px;
    display: flex;
    flex-direction: row;

}
.name{
    margin-left: 10px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    font-size: 1em;
}
.mask{
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #3D3A3F;
    top: 0;
    z-index: 5;
    opacity: 0.8;
}
.slide-fade-enter-active {
  transition: all 2.3s ease;
}
.slide-fade-leave-active {
    transition: all 2.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(100%);
 
}
p{
    margin-bottom: 2px;
    font-family: 'Roboto', sans-serif;
}
@media only screen and (max-width: 980px) {
    .task{
         height: 100px;
    }
}
</style>