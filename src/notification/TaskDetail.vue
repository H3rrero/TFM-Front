<template>
    <div class="container-task-data" >  
        <div class="title-task-data">
            <p>{{this.myTask.title}}</p>
        </div>
        <div class="form-task-data">
            <div class="item-task-data">
                <p>Asignada a:</p>
                 <div class="item-text-data">
                    <div>
                        <p>{{myTask.assigned}}</p>
                    </div>
                </div>
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
        </div>
    </div>
</template>

<script>

 import { taskService } from '../_services/task.service';
 import { userService} from '../_services/user.service';
export default {
    props: {
   myTask: Object
  },
    data(){
       return{ 
       haveData: false,
       result: "",
       hours:0,
       coment:"",
       userss:[],
       }
    },
    created () {
        this.getUsers();
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
        },
        getUsers: function () {
          userService.getAll().then(
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
.container-task-data{
    background-color: #eee;
    display: flex;
    height: 100%;
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
    color: #333399;
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
    border: 2px solid #333399;
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
    border: 2px solid #333399;
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
.dateini{
    margin-right: 10px;
}
.left{
    margin-left: 5px;
}
input, select, textarea{
    border: 2px solid #333399;
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