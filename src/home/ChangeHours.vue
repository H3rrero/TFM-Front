<template>
    <div class="container-task-hours" v-bind:class="{ 'user-border': currentUser.rol=='user',' man-border': currentUser.rol=='manager' }"> 
        <div class="second-container">
          <div class="item-task-hours">
                 <div class="hours">
                    <div class="change-hours">
                       <p>Añadir horas:</p>
                        <input value="0"  v-model="hours" type="number" v-bind:class="{ 'user-border': currentUser.rol=='user',' man-border': currentUser.rol=='manager' }">    
                    </div>
                    <div class="item-text-hours">
                        <span>Horas totales:</span>
                        <div>
                            <p>{{myTask.hours}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-button-hours">
                <a class="button"  v-bind:class="{ 'user-border user-color': currentUser.rol=='user','man-border man-color': currentUser.rol=='manager' }"  v-on:click="updateTask()">Actualizar</a>
                
            </div>
        </div> 
    </div>
</template>

<script>

 import { taskService } from '../_services/task.service';
export default {
    props: {
   myTask: Object
  },
    data(){
       return{ 
       hours:0,
       currentUser:JSON.parse(localStorage.getItem('user'))
       }
    },
    methods:{
        updateTask: function () {
            if(isNaN(parseInt(this.hours)))
                this.hours = 0;
            this.myTask.hours = parseInt(this.myTask.hours) + parseInt(this.hours);
           taskService.changeTask(this.myTask).then(
                resp => {
                    this.result = "La tarea ha sido actualizada.";
                }
            );
        }
    }
};
</script>
<style scoped>

.button {
    border-radius: 0.3em;
    cursor: pointer;
    display: inline-block;
    font-size: 17px;
    margin: 0 auto;
    margin-left: 30px;
    overflow: hidden;
    padding: 0.75em 0.2em;
    position: relative;
    text-align: center;
    text-decoration: none;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
}
.button:hover {
  background-color: var(--man-color);
  border-bottom: 4px solid var(--man-color);
  color: #fff;
}
.container-task-hours{
    background-color: #eee;
    border-radius: 0.5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 150px;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    position: absolute;
    width: 400px;
    z-index: 99;
}
.second-container{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin: 0 auto;
    padding: 10px;
}
.hours{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
}
.change-hours{
    margin-right: 30px;
}
.change-hours >input{
    border-radius: 5px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    height: 35px;
    margin: 10px 0;
    padding: 0 15px;
    width: 100px;
}
p{
    font-family: 'Roboto', sans-serif;
    margin-bottom: 2px;
}
</style>