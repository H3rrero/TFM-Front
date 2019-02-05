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
    padding: 0.75em 2em;
    text-align: center;
    text-decoration: none;
    width: 50% !important;
    margin: 0 auto;
    color: #2F96EF;
    border: 2px solid #2F96EF;
    font-size: 17px;
    display: inline-block;
    border-radius: 0.3em;
    transition: all 0.2s ease-in-out;
    position: relative;
    overflow: hidden;
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
.container-task-data{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 500px;
    background-color: #eee;
    overflow: scroll;
    position: absolute;
    right: 0;
    top:0;
    margin:0;
    z-index: 99;
}
.title-task-data{
    text-align: center;
    font-weight: 700;
    vertical-align: cen;
    vertical-align: middle;
    line-height: 50px;
    border-bottom: 1px solid #6B6FCE;
    color: #2F96EF;
}
.form-task-data{
    display: flex;
    flex-direction: column;
}
.item-task-data{  
    width: 95%;
    margin: 0 auto;
    margin-top: 10px;
}
.item-button-data{  
    width: 95%;
    margin: 0 auto;
    margin-top: 40px;
}
.item-text-data{  
    width: 95%;
    margin: 0 auto;

}
.item-text-data > div{
    box-sizing: border-box;
    height: 35px;
    border: 2px solid #2F96EF;
    border-radius: 5px;
    padding: 0 15px;
    margin: 10px 0;
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
    box-sizing: border-box;
    height: 100%;
    border: 2px solid #2F96EF;
    border-radius: 5px;
    padding: 0 15px;
    margin: 10px 0;
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
    box-sizing: border-box;
    height: 35px;
    border: 2px solid #2F96EF;
    border-radius: 5px;
    padding: 0 15px;
    margin: 10px 0;
}
p{
    margin-bottom: 2px;
    font-family: 'Roboto', sans-serif;
}
</style>