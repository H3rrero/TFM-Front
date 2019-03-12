<template>
    <div class="container-task-hours" > 
        <div class="second-container">
          <div class="item-task-hours">
                 <div class="hours">
                    <div class="change-hours">
                       <p>Añadir horas:</p>
                        <input value="0"  v-model="hours" type="number">    
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
                <a class="button" v-on:click="updateTask()">Actualizar</a>
                
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
    border: 2px solid #2F96EF;
    border-radius: 0.3em;
    color: #2F96EF;
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
    transition: all 0.2s ease-in-out;
}
.button:before {
  background-color: rgba(255, 255, 255, 0.5);
  content: "";
  display: block;
  height: 100%;
  left: -4.5em;
  position: absolute;
  top: 0;
  transform: skewX(-45deg) translateX(0);
  transition: none;
  width: 3em;
}
.button:hover {
  background-color: #2194e0;
  border-bottom: 4px solid #1977b5;
  color: #fff;
}
.button:hover:before {
  transform: skewX(-45deg) translateX(13.5em);
  transition: all 0.5s ease-in-out;
}
.container-task-hours{
    background-color: #eee;
    border: 2px solid #2F96EF;
    border-radius: 1rem;
    display: flex;
    height: 150px;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    width: 400px;
    z-index: 99;
}
.second-container{
    display: flex;
    margin: 0 auto;
    padding: 10px;
}
.hours{
    display: flex;
    justify-content: center;
}
.change-hours{
    margin-right: 30px;
}
.change-hours >input{
    border: 2px solid #2F96EF;
    border-radius: 5px;
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