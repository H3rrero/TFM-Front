<template>
   <div class="task-unassigned"  v-bind:class="{ 'taskspage-task': task.userId != -1 }" v-on:click="showData()"  >
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
  methods:{
      showData:function () {
          this.$emit('show-data');
      }
  }
};
</script>
<style scoped>
.task-unassigned{
    background-color: white;
    border-radius: 0.5rem;
    color: var(--man-color);
    cursor: move;
    margin: 0 auto;
    margin-top: 8px;
    text-align: center;
    width: 95%;
}
.taskspage-task{
    background-color: #138A00;
    border-radius: 0.5rem;
    color: white;
    cursor: move;
    margin: 0 auto;
    margin-top: 8px;
    text-align: center;
    width: 95%;
}
.task-unassigned:hover{
    -webkit-transform: scale(1.03,1.03);
        -ms-transform: scale(1.03,1.03);
            transform: scale(1.03,1.03);
    -webkit-transition:  0.3s ease-out;
    -o-transition:  0.3s ease-out;
    transition:  0.3s ease-out;
}
.taskspage-task-title{
    padding: 2%;
}
</style>