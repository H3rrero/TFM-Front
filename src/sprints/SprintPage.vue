<template>
    <div>
        <div class="task-container">
            <div class="mask" v-if="show" v-on:click="hideMenu();"></div>
            <drop @dragover="asignedTask(-1)"  class="unassigned-task"  v-if="haveData" >
                <div class="title-task-data">
                    <p>Tareas sin asignar a una fase</p>
                </div>
                <div v-for="task in tasks" :key="task.id">
                    <drag @dragend="handleDrop"  :transfer-data="task" >
                         <sprinttask v-if="task.phase == -1" :task="task"></sprinttask>  
                    </drag>
                </div>
            </drop>

            <div class="sprints">
                <div class="sprints-item" v-bind:class="{ 'sprints-item-finish': isFinish(phase), 'sprints-item-actual': isActual(phase) }"   v-for="phase in phasesS" :key="phase.id">
                    <div class="sprints-item-title">
                        <p  >{{phase.name}}</p>
                        <p>{{phase.completedHours +'/'+phase.totalHours}}</p>
                        <div>
                            <span title="abrir kamban del sprint" v-on:click="openKamban(phase.id)">
                                <i class="fas fa-columns"></i>
                            </span>
                            <span title="abrir diagrama de BurnDown" v-on:click="openBurnDown(phase.id)">
                                <i class="fas fa-project-diagram"></i>
                            </span>
                        </div>
                    </div>
                    <drop @dragover="asignedTask(phase.id)" class="sprints-item-task" v-if="!isFinish(phase)">
                        <div v-for="task in tasks" :key="task.id">
                            <drag @dragend="handleDrop"  :transfer-data="task" v-if="task.state!='Terminada'">
                               <sprinttask v-if="task.phase == phase.id" :task="task" class="move" v-on:show-data="showMenu(task)"></sprinttask>
                            </drag>
                            <sprinttask v-if="task.phase == phase.id && task.state=='Terminada'" :task="task" class="not-move" v-on:show-data="showMenu(task)"></sprinttask>
                        </div>
                    </drop>
                    <div  class="sprints-item-task" v-if="isFinish(phase)">
                        <div v-for="task in tasks" :key="task.id">
                            <sprinttask v-if="task.phase == phase.id" :task="task" class="not-move" v-on:show-data="showMenu(task)"></sprinttask>
                        </div>
                    </div>
                </div>
                 <div class="sprints-item" title="Añadir una nueva fase al proyecto" v-on:click="openNewPhase()">
                    <button class="addPhase">+</button>
                </div>
            </div>
            <transition name="slide-fade">
                <taskdetail v-if="show" :myTask="sendTask"></taskdetail>  
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
        phasesS:[],
        usersId:[],
        userss:[],
        show:false,
        sendTask:{},
        haveData: false,
        phaseAsignedId:-1,
        assigned:""
       }
    },
    created () {
        this.getPhases();
        this.getSeries();
    },
    methods: {
       getPhases: function () {
          phaseService.getAll().then(
            fases=>{
            this.phasesS=fases;
             
            }
       );
        },
        getSeries: function () {
          taskService.getAll().then(
            taskss=>{
             this.haveData = true;
             this.tasks = taskss;
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
        },
         openNewPhase:function (id) {
            this.$router.push('/newPhase');
        },
        handleDrop(data, event) {
           
            data.phase = this.phaseAsignedId;
            console.log(data);
            taskService.changeTask(data);
        },
        asignedTask: function (id) {
            this.phaseAsignedId = id;
        },
        openBurnDown:function (id) {
            this.$router.push('/burndownSprint/'+id);
        },
        openKamban:function (id) {
            this.$router.push('/kanban/'+id);
        },
        isFinish:function (phase) {
             let end= new Date(phase.dateF);
             let date = new Date();

             return end<date ? true : false;
        },
      isActual:function (phase) {
             let end= new Date(phase.dateF);
             let start= new Date(phase.dateI);
             let date = new Date();

             return (end>=date && start<date) ? true : false;
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
    width: 20%;
    margin-right: 10px;
}
.title-task-data{
    border-bottom: 1px solid #6B6FCE;
    color: white;
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    vertical-align: middle;
}
.sprints{
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
.sprints-item{
    background-color: white;
    color: #6B6FCE;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-bottom: 10px;
    min-height: 50px;
    width: 300px;
}
.sprints-item-finish{
    border: 3px solid red;
}
.sprints-item-actual{
    border: 3px solid #138A00;
}
.sprints-item:hover{
    transform: scale(1.03,1.03);
    transition:  0.3s ease-out;
}
.sprints-item-title{
    background-color: #333399;
    border-bottom: 1px solid white;
    color: white;
    display: flex;
    flex-direction: row;
    font-family: 'Roboto', sans-serif;
    height: 20px;
    justify-content: space-between;
    padding: 0.3rem;
    text-align: center;
}
.sprints-item-title > div > span{
    cursor: pointer;
    font-size: 1em;
    margin-left: 7px;
    margin-right: 7px;
}
.sprints-item-task{
    background-color: #333399;
    height: 100%;
    padding-bottom: 10px;
    
}
.not-move{
    cursor: default;
}
.move{
    cursor: move;
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
.addPhase{
    background-color: #333399;
    color: white;
    cursor:pointer;
    font-size: 200px;
    height: 100%;
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