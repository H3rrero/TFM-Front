<template>
    <div class="container-task-data" >  
        <div class="title-task-data">
            <p>{{this.myTask.title}}</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>Asignada a:</p>
                 <select v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }"  v-model="myTask.userId" v-on:change="showTaskSelectedUser()" v-if="user.rol=='manager'" >
                    <option v-for="user in userss" :key="user.id" :value="user.id">{{user.firstname +" "+user.lastname}}</option>
                </select>
                <select v-bind:class="{ 'user-border': user.rol=='user',' man-border': user.rol=='manager' }" v-model="myTask.userId" v-on:change="showTaskSelectedUser()" v-if="user.rol=='user'" >
                    <option :value="myTask.userId" selected>{{myTask.assigned}}</option>
                    <option :value="user.id" >{{user.firstname + " "+ user.lastname}}</option>
                </select>
            </div>
             <div class="item-task-data">
                <p>Estado:</p>
                 <div class="item-text-data">
                    <div>
                        <p>{{myTask.state}}</p>
                    </div>
                </div>
            </div>
            <div class="item-task-data">
                <p>Descripción:</p>
                 <div class="item-text-data">
                    <div>
                        <p>{{myTask.description}}</p>
                    </div>
                </div>
            </div>
            <div class="item-task-data">
                <div class="dates">
                    <div class="item-text-data">
                         <p>Fecha Inicio:</p>
                        <div>
                             <p>{{myTask.dateI.substr(0,myTask.dateI.indexOf('T'))}}</p>
                        </div>
                    </div>
                    <div class="item-text-data left">
                        <p>Fecha Fin:</p>
                        <div>
                            <p>{{myTask.dateF.substr(0,myTask.dateF.indexOf('T'))}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-task-data">
                 <div class="dates">
                    <div class="item-text-data">
                         <p>Horas planificadas:</p>
                        <div>
                            <p>{{myTask.planHours}}</p>
                        </div>
                    </div>
                    <div class="item-text-data left">
                        <span>Horas dedicadas totales:</span>
                        <div>
                            <p>{{myTask.hours}}</p>
                        </div>
                    </div>
                </div>
               
            </div>
            <div class="item-textarea-data">
                <span>Comentarios:</span>
                <div>
                    <p v-for="coment in  this.myTask.coments" :key="coment.id">{{coment}}</p>
                </div>
            </div>
            <div class="item-button-data">
                <p>{{result}}</p>
                <a class="button" v-bind:class="{ 'user-border user-color': user.rol=='user',' man-border man-color': user.rol=='manager' }" v-on:click="updateTask()">Actualizar tarea</a>
                
            </div>
        </div>
    </div>
</template>

<script>

 import { taskService } from '../_services/task.service';
 import { userService} from '../_services/user.service';
 import { userProjectService } from '../_services/userProject.service';
export default {
    props: {
   myTask: Object,
   project:String
  },
    data(){
       return{ 
       haveData: false,
       result: "",
       hours:0,
       coment:"",
       user:  JSON.parse(localStorage.getItem('user')),
       userss:[],
       }
    },
    created () {
        this.getUsers();
    },
    methods:{
        updateTask: function () {
            taskService.changeTask(this.myTask).then(
                resp => {
                    this.result = "La tarea ha sido actualizada.";
                }
            );
        },
        getUsers: function () {
           userProjectService.getUserByProject(this.project).then(
            users=>{
                users.forEach(element => {
                    this.userss = users;
                });
             
            }
       );
        },
        showTaskSelectedUser: function () {
           this.userss.forEach(element => {
               if(element.id == this.myTask.userId){
                   this.myTask.assigned = element.firstname +" "+element.lastname
               }
           });
        }
    }
};
</script>
<style scoped>
.button {
    border-radius: 0.3em;
    display: inline-block;
    font-size: 17px;
    margin: 0 auto;
    overflow: hidden;
    padding: 0.75em 2em;
    position: relative;
    text-align: center;
    text-decoration: none;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    width: 50% !important;
}
.button:hover {
  background-color: var(--man-color);
  border-bottom: 4px solid var(--man-color);
  color: #fff;
}
.container-task-data{
    background-color: #eee;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    margin:0;
    overflow: auto;
    position: absolute;
    right: 0;
    top:0;
    width: 500px;
    z-index: 99;
}
.title-task-data{
    border-bottom: 1px solid #6B6FCE;
    color: var(--man-color);
    line-height: 50px;
    text-align: center;
    font-weight: 700;
    vertical-align: middle;
}
.form-task-data{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
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
    border: 2px solid var(--man-color);
    border-radius: 5px;
    -webkit-box-sizing: border-box;
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
    border: 2px solid var(--man-color);
    border-radius: 5px;
    -webkit-box-sizing: border-box;
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
}
.dateini{
    margin-right: 10px;
}
.left{
    margin-left: 5px;
}
input, select, textarea{
    border: 2px solid var(--man-color);
    border-radius: 5px;
    -webkit-box-sizing: border-box;
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