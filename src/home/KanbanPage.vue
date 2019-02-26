<template>
    <div class="filter-kamban">
        <div class="filter">
            <button class="myTaskBt" v-bind:class="{ myTaskBtSelected: isActive }" v-on:click="showTaskCurrentUser()">Mis tareas</button>
            <button class="myTaskBt" v-bind:class="{ myTaskBtSelected: isActiveR }" v-on:click="showTaskRetard()">Retrasadas</button>
            <input type="text" class="myTaskInput" v-model="taskTitle">
            <select  class="filterUser" v-model="selectUser" v-on:change="showTaskSelectedUser()" >
                    <option value="-1" selected>Todas</option>
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
                                <div class="task" v-bind:class="{ taskRetard: retard.includes(task.id) }" v-if="task.state == 'desarrollo' && showTaskfilter(task.id) && showTaskUser(task.userId) && (isActiveR ? retard.includes(task.id):true )" >
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
                                <div class="task" v-bind:class="{ taskRetard: retard.includes(task.id) }" v-if="task.state == 'pruebas' && showTaskfilter(task.id) && showTaskUser(task.userId) && (isActiveR ? retard.includes(task.id):true )" >
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
                            <div class="task" v-bind:class="{ taskRetard: retard.includes(task.id) }" v-if="task.state == 'produccion' && showTaskfilter(task.id) && showTaskUser(task.userId) && (isActiveR ? retard.includes(task.id):true )"  >
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
                            <div class="task" v-bind:class="{ taskRetard: retard.includes(task.id) }" v-if="task.state == 'pruebas finalizadas' && showTaskfilter(task.id) && showTaskUser(task.userId) && (isActiveR ? retard.includes(task.id):true )"  >
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
        selectUser: -1,
        tasks:[],
        retard:[],
        taskTitle:"",
        haveData: false,
        show :false,
        showH:false,
        isActive:false,
        isActiveR:false,
        isActiveA:false,
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
            this.tasks.forEach(element => {
                let dateTask = new Date(element.dateF);
                let date = new Date();
                console.log(dateTask + ">" + date);
                if(dateTask < date){
                    console.log("Llego tarde:")
                    console.log(dateTask + ">" + date);
                    this.retard.push(element.id);
                    console.log(this.retard);
                    }
            });
      
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
            data.state = this.state;
        },
        changePhase: function (state) {
            this.state = state;
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
        showTaskfilter:function (id) {
            console.log(this.taskTitle)
            var ret = false;
          if(this.taskTitle == ""){
              return true;
          } else{
               console.log("else")
              this.tasks.forEach(element => {
                  console.log("title: "+element.title);
                  console.log("id: "+element.id);
                  console.log("id recibido: "+id);
                  console.log(element.title.includes(this.taskTitle))
                  console.log(element.id == id)
                if(element.id == id && (element.title.toUpperCase().includes(this.taskTitle.toUpperCase()) 
                || element.assigned.toUpperCase().includes(this.taskTitle.toUpperCase()))){
                    console.log("if")
                    ret = true;
                }
              });
              console.log("Final:"+ret);
              return ret;
          }
        },
        showTaskRetard: function (id) {
            console.log("isActiveR: "+this.isActiveR);
            if(this.isActiveR)
                return this.retard.includes(id);
            else
                return true;
        },
        showTaskCurrentUser: function () {
            this.isActive = !this.isActive;
            this.isActiveA = false;   
            this.isActiveR = false;
            this.selectUser = -1;
            if(this.isActive)
                this.usersId = [this.currentUser.id];
            else
                this.showAllTask();
           console.log(this.usersId);        
        },
        showTaskSelectedUser: function () {
            console.log("selected: "+this.selectUser)
            this.isActiveR = false;
            this.isActiveA = false;   
            this.isActive = false;
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
.myTaskInput{
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
.myTaskInput:hover{
    background-color: #333399;
    color: white;
}
.filterUser{
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
.filterUser:hover{
    background-color:#333399;
    color: white;
}
.myTaskBtSelected{
    background-color: #333399;
    color: white;
}
.myTaskBt:hover{
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
.container-Kanban{
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
    height: 80px;
    margin: 0 auto;
    margin-top: 8px;
    width: 90%;
}
.taskRetard{
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
    margin-left: 15px;
}
.task-body{
    display: flex;
    height: 70%;
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