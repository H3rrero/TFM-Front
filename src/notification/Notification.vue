<template>
    <div class="container-task-message" > 
      <div class="header-not">
        <p>Operación no permitida</p>
          <a class="button" v-on:click="close()">
            <i class="fas fa-times"></i>
          </a>
         
      </div>
      <div class="body-not">
        <p>{{message}}</p>
      </div>
    </div>
</template>

<script>

export default {
    props: {
   message: String,
   showNotification:Boolean
  },
    methods:{
        close: function () {
          this.$emit('close-dialog');
        }
    }
};
</script>
<style scoped>

.button {
    text-decoration: none;
    margin-left: auto; 
}
.button:hover{
  color:grey;
}
.header-not{
    border-bottom: 1px solid #333399;
    color: #333399;
    display: flex;
    flex-direction: row;
    font-weight: 700;
    line-height: 33px;
    text-align: center;
    vertical-align: middle;
}
.body-not{
  margin-top: 10px;
}
.container-task-message{
    background-color: #eee;
    border: 2px solid #333399;
    border-radius: 1rem;
    display: flex;
    height: 150px;
    flex-direction: column;
    padding: 6px;
    position: absolute;
    width: 400px;
    z-index: 99;
}
p{
    font-family: 'Roboto', sans-serif;
    margin-bottom: 2px;
}
</style>