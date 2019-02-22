<template>
    <div>
        <div class="task_container">
            
            <drop @dragover="asignedTask(-1,'','')"  class="unassigned_task"  v-if="haveData" >
                <div v-for="task in tasks" :key="task.id">
                    <drag @dragend="handleDrop"  :transfer-data="task" >
                         <task v-if="task.userId == -1" :task="task"></task>  
                    </drag>
                </div>
            </drop>

            <div class="programmers">
                <div class="programmers_item"  v-for="user in userss" :key="user.id">
                    <div class="programmers_item_title">
                        {{user.firstname + ' '+ user.lastname}}
                    </div>
                    <drop @dragover="asignedTask(user.id,user.firstname,user.lastname)" class="programmers_item_task">
                        <div v-for="task in tasks" :key="task.id">
                            <drag @dragend="handleDrop"  :transfer-data="task" >
                               <task v-if="task.userId == user.id" :task="task"></task>
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
export default {
    data(){
       return{ 
       tasks:[],
       usersId:[],
       userss:[],
    haveData: false,
    userAsignedId:-1,
    assigned:""
       }
    },
    created () {
        this.getSeries();
        this.getUsers();
    },
    methods: {
       getSeries: function () {
          taskService.getAll().then(
            taskss=>{
             this.haveData = true;
             this.tasks = taskss;
             console.log(taskss);
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
            console.log(data.userId)
            data.userId = this.userAsignedId;
            data.assigned = this.assigned;
            taskService.changeTask(data);
        },
        asignedTask: function (id,name,lastName) {
            this.userAsignedId = id;
            this.assigned = name + " " + lastName;
            console.log(id);
        }
      

    }
};
</script>
<style scoped>
.task_container{
    display: flex;
    flex-direction: row;
    height: 100%;
}
.unassigned_task{
    background-color: white;
    border: 2px solid #333399;
    border-radius: 1rem;
    width: 20%;
    margin-right: 10px;
}
.programmers{
    width: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    background-color: white;
    border: 2px solid #333399;
    border-radius: 1rem;
    margin-right: 10px;
    padding: 1rem;
}
.programmers_item{
    background-color: white;
    color: #6B6FCE;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-bottom: 10px;
    min-height: 50px;
    width: 300px;
}
.programmers_item:hover{
    transform: scale(1.03,1.03);
    transition:  0.3s ease-out;
}
.programmers_item_title{
    height: 20px;
    color: white;
    font-family: 'Roboto', sans-serif;
    padding: 0.3rem;
    text-align: center;
    border-bottom: 1px solid white;
    background-color: #333399;
}
.programmers_item_task{
    height: 90%;
    background-color: #333399;
}

</style>