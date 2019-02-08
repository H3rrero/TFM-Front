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
    created () {
        console.log(this.myTask);
        console.log(this.myTask.assigned);
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
    padding: 0.75em 0.2em;
    text-align: center;
    text-decoration: none;
    margin: 0 auto;
    color: #2F96EF;
    border: 2px solid #2F96EF;
    font-size: 17px;
    display: inline-block;
    border-radius: 0.3em;
    transition: all 0.2s ease-in-out;
    position: relative;
    overflow: hidden;
    margin-left: 30px;
    cursor: pointer;
}
.button:before {
  content: "";
  background-color: rgba(255, 255, 255, 0.5);
  height: 100%;
  width: 3em;
  display: block;
  position: absolute;
  top: 0;
  left: -4.5em;
  transform: skewX(-45deg) translateX(0);
  transition: none;
}
.button:hover {
  background-color: #2194e0;
  color: #fff;
  border-bottom: 4px solid #1977b5;
}
.button:hover:before {
  transform: skewX(-45deg) translateX(13.5em);
  transition: all 0.5s ease-in-out;
}
.container-task-hours{
    z-index: 99;
    height: 150px;
    width: 400px;
    background-color: #eee;
    position: absolute;
    border-radius: 1rem;
    border: 2px solid #2F96EF;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    box-sizing: border-box;
    height: 35px;
    border: 2px solid #2F96EF;
    border-radius: 5px;
    padding: 0 15px;
    margin: 10px 0;
    width: 100px;
}
p{
    margin-bottom: 2px;
    font-family: 'Roboto', sans-serif;
}
</style>