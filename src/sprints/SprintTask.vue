<template>
   <div class="task-unassigned"  v-bind:class="{ 'taskspage-task': task.phase != -1, 'task-finish': task.state=='Terminada' }"   >
        <div class="taskspage-task-title">
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
};
</script>
<style scoped>
.task-unassigned{
    background-color: #333399;
    border-radius: 1rem;
    color: white;
    margin: 0 auto;
    margin-top: 8px;
    text-align: center;
    width: 95%;
}
.taskspage-task{
    background-color: white;
    border-radius: 1rem;
    color: #333399;
    margin: 0 auto;
    margin-top: 8px;
    text-align: center;
    width: 95%;
}
.task-finish{
    background-color: #A39898;
}
.task-unassigned:hover{
    transform: scale(1.03,1.03);
    transition:  0.3s ease-out;
}
.taskspage-task-title{
    padding: 2%;
}
</style>