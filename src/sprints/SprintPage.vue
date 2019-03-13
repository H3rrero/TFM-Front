<template>
    <div>
        <div class="task-container">
            
            <drop @dragover="asignedTask(-1)"  class="unassigned-task"  v-if="haveData" >
                <div v-for="task in tasks" :key="task.id">
                    <drag @dragend="handleDrop"  :transfer-data="task" >
                         <sprinttask v-if="task.phase == -1" :task="task"></sprinttask>  
                    </drag>
                </div>
            </drop>

            <div class="sprints">
                <div class="sprints-item" v-bind:class="{ 'sprints-item-finish': isFinish(phase), 'sprints-item-actual': isActual(phase) }"   v-for="phase in phasesS" :key="phase.id">
                    <div class="sprints-item-title">
                        <p  v-if="!isFinish(phase) && !isActual(phase)">{{phase.name}}</p>
                         <p v-if="isFinish(phase)" >{{phase.name + ' --> Terminado'}}</p>
                         <p v-if="isActual(phase)">{{phase.name + ' --> Actual'}}</p>
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
                               <sprinttask v-if="task.phase == phase.id" :task="task" class="move"></sprinttask>
                            </drag>
                            <sprinttask v-if="task.phase == phase.id && task.state=='Terminada'" :task="task" class="not-move" ></sprinttask>
                        </div>
                    </drop>
                    <div  class="sprints-item-task" v-if="isFinish(phase)">
                        <div v-for="task in tasks" :key="task.id">
                            <sprinttask v-if="task.phase == phase.id" :task="task" class="not-move"></sprinttask>
                        </div>
                    </div>
                </div>
            </div>
                
            
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
             let end= Date.UTC(parseFloat(phase.yearf),parseFloat(phase.monthf),parseFloat(phase.dayf));
             let date = new Date();

             return end<date ? true : false;
        },
      isActual:function (phase) {
             let end= Date.UTC(parseFloat(phase.yearf),parseFloat(phase.monthf),parseFloat(phase.dayf));
             let start= Date.UTC(parseFloat(phase.yeari),parseFloat(phase.monthi),parseFloat(phase.dayi));
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
    background-color: white;
    border: 2px solid #333399;
    border-radius: 1rem;
    width: 20%;
    margin-right: 10px;
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
    border: 3px solid greenyellow;
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
</style>