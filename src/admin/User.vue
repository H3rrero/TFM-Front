<template>
   <div class="task-unassigned"  v-bind:class="{ 'manager': user.rol == 'manager' }" v-on:click="showData()"  >
        <div class="taskspage-task-title">
            <p>{{this.user.firstname + " "+ this.user.lastname}}</p>
        </div>
    </div>
</template>

<script>

export default {
    props: {
   user: Object
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
    border-radius: 1rem;
    color: #333399;
    cursor: move;
    margin: 0 auto;
    margin-top: 8px;
    text-align: center;
    width: 95%;
}
.manager{
    background-color: #138A00;
    border-radius: 1rem;
    color: white;
    cursor: move;
    margin: 0 auto;
    margin-top: 8px;
    text-align: center;
    width: 95%;
}
.taskspage-task{
    background-color: #138A00;
    border-radius: 1rem;
    color: white;
    cursor: move;
    margin: 0 auto;
    margin-top: 8px;
    text-align: center;
    width: 95%;
}
.task-unassigned:hover{
    transform: scale(1.03,1.03);
    transition:  0.3s ease-out;
}
.taskspage-task-title{
    padding: 2%;
}
</style>