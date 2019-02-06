<template>
    <div class="container-Kanban" v-if="haveData"  >
        <div class="mask" v-if="show || showH" v-on:click="hideMenu();hideMenuH()"></div>
       <div class="tasks">
        <drop @dragover="changePhase('desarrollo')" class="item">
            <div class="text-container">
                    <p>Desarrollo</p>
                </div>
                <div class="task-container">
                    <div v-for="task in tasks" :key="task.id">
                        <drag @dragend="handleDrop" :transfer-data="task" >
                            <div class="task" v-if="task.phase == 'desarrollo'" >
                                <div class="task-title">
                                    <p>{{task.title}}</p>
                                    <span   v-on:click="showMenu(task)">
                                        <i class="fas fa-edit"></i>
                                    </span> 
                                    <span v-on:click="showHours(task)">
                                        <i class="far fa-clock"></i>
                                    </span>
                                </div>
                                <div class="task-body">
                                    <div class="assigned">
                                        <div class="icon">
                                            <span style="font-size: 2em;">
                                                <i class="far fa-user-circle"></i>
                                            </span> 
                                        </div>
                                        <div class="name">
                                            <p>{{task.assigned}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </drag>
                    </div>
                </div>
        </drop>
        <drop @dragover="changePhase('pruebas')"  class="item">
             <div class="text-container">
                    <p>Pruebas</p>
                </div>
                <div class="task-container">
                    <div v-for="task in tasks" :key="task.id">
                        <drag @dragend="handleDrop"  :transfer-data="task">
                            <div class="task" v-if="task.phase == 'pruebas'"   v-on:click="showMenu(task)">
                                <div class="task-title">
                                    <p>{{task.title}}</p>
                                    <span  v-on:click="showMenu(task)">
                                        <i class="fas fa-edit"></i>
                                    </span> 
                                    <span v-on:click="showHours(task)">
                                        <i class="far fa-clock"></i>
                                    </span>
                                </div>
                                <div class="task-body">
                                    <div class="assigned">
                                        <div class="icon">
                                            <span style="font-size: 2em;">
                                                <i class="far fa-user-circle"></i>
                                            </span> 
                                        </div>
                                        <div class="name">
                                            <p>{{task.assigned}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </drag>
                    </div>
                </div>
           
        </drop>
        <drop @dragover="changePhase('produccion')" class="item">
           <div class="text-container">
                <p>Producción</p>
            </div>
            <div class="task-container">
                  <div v-for="task in tasks" :key="task.id">
                    <drag @dragend="handleDrop"  :transfer-data="task">
                        <div class="task" v-if="task.phase == 'produccion'"   v-on:click="showMenu(task)">
                            <div class="task-title">
                                <p>{{task.title}}</p>
                                <span  v-on:click="showMenu(task)">
                                        <i class="fas fa-edit"></i>
                                </span> 
                                <span v-on:click="showHours(task)">
                                        <i class="far fa-clock"></i>
                                </span>
                            </div>
                            <div class="task-body">
                                <div class="assigned">
                                    <div class="icon">
                                        <span style="font-size: 2em;">
                                            <i class="far fa-user-circle"></i>
                                        </span> 
                                    </div>
                                    <div class="name">
                                        <p>{{task.assigned}}</p>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </drag>
                </div>
            </div>
        </drop>
        <drop @dragover="changePhase('pruebas finalizadas')"  class="item">
            <div class="text-container">
                <p>Pruebas finalizadas</p>
            </div>
            <div class="task-container">
                  <div v-for="task in tasks" :key="task.id">
                    <drag @dragend="handleDrop"  :transfer-data="task">
                        <div class="task" v-if="task.phase == 'pruebas finalizadas'"   v-on:click="showMenu(task)">
                            <div class="task-title">
                                <p>{{task.title}}</p>
                                <span  v-on:click="showMenu(task)">
                                        <i class="fas fa-edit"></i>
                                </span> 
                                <span v-on:click="showHours(task)">
                                        <i class="far fa-clock"></i>
                                </span>
                            </div>
                            <div class="task-body">
                                <div class="assigned">
                                    <div class="icon">
                                        <span style="font-size: 2em;">
                                            <i class="far fa-user-circle"></i>
                                        </span> 
                                    </div>
                                    <div class="name">
                                        <p>{{task.assigned}}</p>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </drag>
                </div>
            </div>
        </drop>
       </div>
         <transition name="slide-fade">
            <taskdata v-if="show" :myTask="sendTask"></taskdata>  
        </transition>
        <transition name="fade">
            <changehours v-if="showH" :myTask="sendTask"></changehours>  
        </transition>
    </div>
</template>

<script>

 import { taskService } from '../_services/task.service';
export default {
    data(){
       return{ tasks:[],
       haveData: false,
       show :false,
       showH:false,
       sendTask: {},
       phase:""
       }
    },
    computed: {
    },
    created () {
        this.getSeries();
    },
    methods: {
       getSeries: function () {
          taskService.getAll().then(
            taskss=>{
              this.updateData(taskss);
             
            }
       );
        },
        updateData: function (taskss) {
            console.log("fases2")
            console.log(this.tasks)
         
            this.haveData = true;
            this.tasks = taskss;
      
        },
        showMenu: function (task) {
            console.log("showMenu");
            this.show = true;
            this.sendTask = task;
            console.log(task.title);
        },
        showHours: function (task) {
            console.log("showMenu");
            this.showH = true;
            this.sendTask = task;
            console.log(task.title);
        },
        handleDrop(data, event) {
            data.phase = this.phase;
        },
        changePhase: function (phase) {
            this.phase = phase;
        },
        hideMenu: function () {
             console.log("hideMenu");
            if(this.show)
            this.show = false;
        },
        hideMenuH: function () {
             console.log("hideMenu");
            if(this.showH)
            this.showH = false;
        }
    }
};
</script>
<style scoped>
.container-Kanban{
     display: flex;
    flex-direction: row;
    justify-content: center;
    width: 95%;
    margin: 0 auto;
    min-height: 600px;
    height: 100%;
}
.tasks{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 95%;
    margin: 0 auto;
    min-height: 600px;
    height: 100%;
    z-index: 1;
}
.item{
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    background-color: white;
    color: #2F96EF;
    flex-grow: 1;
    border-radius: 1rem;
    border: 2px solid #2F96EF;
}
.item:hover{
    border-color: #17DA17;

}
.text-container{
    border-top: 1px solid #EDEDED;
    text-align: center;
    text-transform: none;
    font-weight: 700;
    vertical-align: middle;
    line-height: 50px;
}
a{
    text-decoration: none;
}
.task{
    height: 100px;
    width: 90%;
    margin: 0 auto;
    color: white;
    background-color: #2F96EF;
    margin-top: 8px;
    border-radius: 1rem;
    cursor: move;
}
.task:hover{
    transition:  0.5s ease-out;
    transform: scale(1.1,1.1);
}
.task-title{
    padding: 2%;
    border-bottom: 1px solid black;
    display: flex;

}
.task-title > p{
    text-align: center;
    width: 80%;
}
.task-title > span{
    margin-left: 15px;
    cursor: auto;
    font-size: 1em;
}
.task-body{
    display: flex;
    flex-direction: column;
    height: 70%;
    justify-content: center;
}
.assigned{
    display: flex;
    flex-direction: row;
    margin-left: 10px;
}
.time{
    margin-top: 30px;
    display: flex;
    flex-direction: row;

}
.name{
    margin-left: 10px;
    justify-content: center;
    display: flex;
    flex-direction: column;
}
.mask{
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #3D3A3F;
    top: 0;
    z-index: 5;
    opacity: 0.8;
}
.slide-fade-enter-active {
  transition: all 2.3s ease;
}
.slide-fade-leave-active {
    transition: all 2.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(100%);
 
}
p{
    margin-bottom: 2px;
    font-family: 'Roboto', sans-serif;
}
</style>