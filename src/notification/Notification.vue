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
    border-bottom: 1px solid var(--man-color);
    color: var(--man-color);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
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
    border: 2px solid var(--man-color);
    border-radius: 0.5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 150px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
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