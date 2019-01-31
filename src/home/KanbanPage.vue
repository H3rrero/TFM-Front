<template>
    <div class="container" v-if="haveData">
        <button @click="show = !show">
            Toggle render
        </button>
       <div class="tasks">
        <div class="item" >
           <div class="text-container">
                <p>Desarrollo</p>
            </div>
            <div class="task-container">
                <div v-for="task in tasks" :key="task.id">
                    <div class="task" v-if="task.phase == 'desarrollo'" >
                        <div class="task-title">
                            <p>{{task.title}}</p>
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
                            <div class="time">
                                <div class="icon">
                                    <span style="font-size: 2em;">
                                        <i class="far fa-calendar-alt"></i>
                                    </span> 
                                </div>
                                <div class="name">
                                    <p>{{task.dateI}} to {{task.dateF}}</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="item">
           <div class="text-container">
                <p>Pruebas</p>
            </div>
            <div class="task-container">
                <div v-for="task in tasks" :key="task.id">
                    <div class="task" v-if="task.phase == 'pruebas'" >
                        <div class="task-title">
                            <p>{{task.title}}</p>
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
                            <div class="time">
                                <div class="icon">
                                    <span style="font-size: 2em;">
                                        <i class="far fa-calendar-alt"></i>
                                    </span> 
                                </div>
                                <div class="name">
                                    <p>{{task.dateI}} to {{task.dateF}}</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="item">
           <div class="text-container">
                <p>Producción</p>
            </div>
            <div class="task-container">
                  <div v-for="task in tasks" :key="task.id">
                    <div class="task" v-if="task.phase == 'produccion'" >
                        <div class="task-title">
                            <p>{{task.title}}</p>
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
                            <div class="time">
                                <div class="icon">
                                    <span style="font-size: 2em;">
                                        <i class="far fa-calendar-alt"></i>
                                    </span> 
                                </div>
                                <div class="name">
                                    <p>{{task.dateI}} to {{task.dateF}}</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="text-container">
                <p>Pruebas finalizadas</p>
            </div>
            <div class="task-container">
                  <div v-for="task in tasks" :key="task.id">
                    <div class="task" v-if="task.phase == 'pruebas finalizadas'" >
                        <div class="task-title">
                            <p>{{task.title}}</p>
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
                            <div class="time">
                                <div class="icon">
                                    <span style="font-size: 2em;">
                                        <i class="far fa-calendar-alt"></i>
                                    </span> 
                                </div>
                                <div class="name">
                                    <p>{{task.dateI}} to {{task.dateF}}</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </div>
         <transition name="slide-fade">
            <taskdata v-if="show"></taskdata>  
        </transition>
    </div>
</template>

<script>

 import { taskService } from '../_services/task.service';
export default {
    data(){
       return{ tasks:[],
       haveData: false,
       show :false
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
      
        }
    }
};
</script>
<style scoped>
.container{
     display: flex;
    flex-direction: row;
    justify-content: center;
    width: 95%;
    margin: 0 auto;
    min-height: 600px;
    height: 100%;
    margin-bottom: 20px;
}
.tasks{
    /* width: 100%; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 95%;
    margin: 0 auto;
    min-height: 600px;
    /* height: 100%; */
    margin-bottom: 20px;
    height: 100%;
    z-index: 1;
}
.item{
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    background-color: #6B6FCE;
    color: white;
    flex-grow: 1;
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
    height: 200px;
    width: 90%;
    margin: 0 auto;
    background-color: crimson;
    margin-top: 8px;
}
.task-title{
    padding: 2%;
    border-bottom: 1px solid black;
}
.task-title > p{
    text-align: center;
}
.task-body{
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: 70%;
    justify-content: center;
}
.assigned{
    display: flex;
    flex-direction: row;
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
.slide-fade-enter-active {
  transition: all 2.3s ease;
}
.slide-fade-leave-active {
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
</style>