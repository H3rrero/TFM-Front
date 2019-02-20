<template>
    <div>
        <div class="task-container">
            
            <drop @dragover="asignedTask(-1)"  class="un-assigned-task"  v-if="haveData" >
                <div v-for="task in tasks" :key="task.id">
                    <drag @dragend="handleDrop"  :transfer-data="task" >
                        <div class="tasksPage-task" v-if="task.userId == -1" >
                            <div class="tasksPage-task-title">
                                <p>{{task.title}}</p>
                            </div>
                        </div>
                    </drag>
                </div>
            </drop>

            <div class="programmers">
                <div class="programmers-item"  v-for="user in userss" :key="user.id">
                    <div class="programmers-item-title">
                        {{user.firstname + ' '+ user.lastname}}
                    </div>
                    <drop @dragover="asignedTask(user.id)" class="programmers-item-task">
                        <div v-for="task in tasks" :key="task.id">
                            <drag @dragend="handleDrop"  :transfer-data="task" >
                                <div class="tasksPage-task"  v-if="task.userId == user.id">
                                    <div class="tasksPage-task-title">
                                        <p>{{task.title}}</p>
                                    </div>
                                </div>
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
    userAsignedId:-1
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
        },
        asignedTask: function (id) {
            this.userAsignedId = id;
            console.log(id);
        },

    }
};
</script>
<style scoped>
.task-container{
    display: flex;
    flex-direction: row;
    height: 100%;
}
.un-assigned-task{
    background-color: black;
    height: 100%;
    width: 20%;
}
.programmers{
    background-color: blueviolet;
    height: 100%;
    width: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
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
.programmers-item-title{
    height: 20px;
}
.programmers-item-task{
    height: 90%;
    background-color: brown;
}
.tasksPage-task{
    background-color: #6F9CEB;
    border-radius: 1rem;
    color: white;
    cursor: move;
    margin: 0 auto;
    margin-top: 8px;
    width: 95%;
    text-align: center;
}
.tasksPage-task-title{
    padding: 2%;
}
</style>