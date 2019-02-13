<template>
    <div class="container-task-data" >  
        <div class="title-task-data">
            <p>{{this.myTask.title}}</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>Reasignar tarea:</p>
                <select v-model="myTask.assigned" >
                    <option value="Alejandro Fernandez Herrero">Alejandro Fernández Herrero</option>
                    <option value="Pedro picapiedra">Pedro picapiedra</option>
                </select>
            </div>
             <div class="item-task-data">
                <p>Cambiar fase:</p>
                <select v-model="myTask.phase" >
                    <option value="desarrollo">Desarrollo</option>
                    <option value="pruebas">Pruebas</option>
                    <option value="pruebas finalizadas">Pruebas finalizadas</option>
                    <option value="produccion">Produccion</option>
                </select>
            </div>
            <div class="item-task-data">
                <p>Descripción:</p>
                <textarea-autosize v-model="myTask.description" placeholder="add multiple lines"></textarea-autosize>
            </div>
            <div class="item-task-data">
                <div class="dates">
                    <div class="dateIni">
                        <p>Fecha Inicio:</p>
                        <datetime v-model="myTask.dateI"></datetime>
                    </div>
                    <div class="dateEnd">
                        <p>Fecha Fin:</p>
                        <datetime v-model="myTask.dateF"></datetime>
                    </div>
                </div>
            </div>
            <div class="item-task-data">
                 <div class="dates">
                    <div class="dateIni">
                       <p>Añadir horas dedicadas:</p>
                        <input value="0"  v-model="hours" type="number">    
                    </div>
                    <div class="item-text-data">
                        <span>Horas dedicadas totales:</span>
                        <div>
                            <p>{{myTask.hours}}</p>
                        </div>
                    </div>
                </div>
               
            </div>

            <div class="item-task-data">
                <p>Dejar comentario:</p>
                <textarea-autosize v-model="coment"></textarea-autosize>
            </div>
            <div class="item-textarea-data">
                <span>Comentarios:</span>
                <div>
                    <p v-for="coment in  this.myTask.coments" :key="coment.id">{{coment}}</p>
                </div>
            </div>
            <div class="item-button-data">
                <p>{{result}}</p>
                <a class="button" v-on:click="updateTask()">Actualizar tarea</a>
                
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
       haveData: false,
       result: "",
       hours:0,
       coment:""
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
            this.myTask.coments.push(this.coment);
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
    display: inline-block;
    font-size: 17px;
    overflow: hidden;
    padding: 0.75em 2em;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    margin: 0 auto;
    width: 50% !important;
}
.button:before {
  background-color: rgba(255, 255, 255, 0.5);
  content: "";
  height: 100%;
  display: block;
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
.container-task-data{
    background-color: #eee;
    display: flex;
    height: 100%;
    flex-direction: column;
    margin:0;
    overflow: scroll;
    position: absolute;
    right: 0;
    top:0;
    width: 500px;
    z-index: 99;
}
.title-task-data{
    border-bottom: 1px solid #6B6FCE;
    color: #2F96EF;
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    vertical-align: middle;
}
.form-task-data{
    display: flex;
    flex-direction: column;
}
.item-task-data{  
    margin-top: 10px;
    margin: 0 auto;
    width: 95%;
}
.item-button-data{  
    margin: 0 auto;
    margin-top: 40px;
    width: 95%;
}
.item-text-data{  
    margin: 0 auto;
    width: 95%;

}
.item-text-data > div{
    border: 2px solid #2F96EF;
    border-radius: 5px;
    box-sizing: border-box;
    height: 35px;
    margin: 10px 0;
    padding: 0 15px;
}
.item-text-data > div >p{
    margin-top: 7px;
}
.item-textarea-data{  
    width: 95%;
    margin: 0 auto;
    margin-top: 10px;

}
.item-textarea-data > div{
    border: 2px solid #2F96EF;
    border-radius: 5px;
    box-sizing: border-box;
    height: 100%;
    margin: 10px 0;
    padding: 0 15px;
}
.item-textarea-data > div >p{
    margin-top: 7px;
}
.item-task-data *{
   width: 100%;
}
.dates{
    display: flex;
    flex-direction: row;
}
.dateIni{
    margin-right: 10px;
}
input, select, textarea{
    border: 2px solid #2F96EF;
    border-radius: 5px;
    box-sizing: border-box;
    height: 35px;
    margin: 10px 0;
    padding: 0 15px;
}
p{
    font-family: 'Roboto', sans-serif;
    margin-bottom: 2px;
}
@media only screen and (max-width: 980px) {
    .container-task-data{
        width: 80%;
    }
}
</style>