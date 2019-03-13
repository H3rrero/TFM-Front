<template>
    <div>
        <div class="task-container">
            
            <drop @dragover="asignedTask(-1,'','')"  class="unassigned-task"  v-if="haveData" >
                <div v-for="task in tasks" :key="task.id">
                    <drag @dragend="handleDrop"  :transfer-data="task" >
                         <task v-if="task.userId == -1 && (task.phase == phaseId)" :task="task"></task>  
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
                               <task v-if="task.userId == user.id && task.phase == phaseId" :task="task"></task>
                            </drag>
                        </div>
                    </drop>
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
        usersId:[],
        userss:[],
        phaseId:-1,
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
                    this.phaseId = element.id;
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
        handleDrop(data, event) {
            data.userId = this.userAsignedId;
            data.assigned = this.assigned;
            data.state = this.phase;
            taskService.changeTask(data);
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
    margin-right: 10px;
    width: 20%;
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

</style>