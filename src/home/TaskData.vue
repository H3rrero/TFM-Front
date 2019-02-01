<template>
    <div class="container-task-data" >  
        <div class="title-task-data">
            <p>Título de prueba 1</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>Persona asignada:</p>
                <select name="assigned">
                    <option value="1">Alejandro Fernández Herrero</option>
                    <option value="2">Pedro picapiedra</option>
                </select>
            </div>
            <div class="item-task-data">
                <p>Descripción:</p>
                <textarea  placeholder="add multiple lines"></textarea>
            </div>
            <div class="item-task-data">
                <p>Fecha Inicio:</p>
                <datetime ></datetime>
            </div>
            <div class="item-task-data">
                <p>Fecha Fin:</p>
                <datetime ></datetime>
            </div>
            <div class="item-task-data">
                <p>Añadir horas dedicadas:</p>
                <input type="number">
            </div>
            <div class="item-task-data">
                <p>Horas dedicads totales:</p>
                <p>120 horas</p>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>

 import { taskService } from '../_services/task.service';
export default {
    data(){
       return{ 
       haveData: false
       }
    },
};
</script>
<style scoped>
.container-task-data{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 500px;
    background-color: #eee;
    overflow: hidden;
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
.item-task-data *{
   width: 100%;
}
input, select, textarea{
    box-sizing: border-box;
    height: 35px;
    border: 3px solid #2F96EF;
    border-radius: 5px;
    padding: 0 15px;
    margin: 10px 0;
}
textarea{
    height: 60px;
}
p{
    margin-bottom: 2px;
    font-family: 'Roboto', sans-serif;
}
</style>