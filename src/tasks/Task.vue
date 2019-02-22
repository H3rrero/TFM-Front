<template>
   <div class="task_unassigned"  v-bind:class="{ tasksPage_task: task.userId != -1 }"  >
        <div class="tasksPage_task_title">
            <p>{{this.task.title}}</p>
        </div>
    </div>
</template>

<script>

 import { taskService } from '../_services/task.service';
 import { userService} from '../_services/user.service';
export default {
    props: {
   task: Object
  },
    created () {
        console.log("tassskkkk");
        console.log(this.task);
       
    },
    methods:{
      
    }
};
</script>
<style scoped>
.task_unassigned{
    background-color: #333399;
    border-radius: 1rem;
    color: white;
    cursor: move;
    margin: 0 auto;
    margin-top: 8px;
    width: 95%;
    text-align: center;
}
.tasksPage_task{
    background-color: white;
    border-radius: 1rem;
    color: #333399;
    cursor: move;
    margin: 0 auto;
    margin-top: 8px;
    width: 95%;
    text-align: center;
}
.task_unassigned:hover{
    transform: scale(1.03,1.03);
    transition:  0.3s ease-out;
}
.tasksPage_task_title{
    padding: 2%;
}
</style>