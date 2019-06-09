<template>
    <div class="filter-kamban">
        <app-breadcrumbs class="admin-background"></app-breadcrumbs>
        <div class="container-kanban" v-if="haveData"  >
            <div class="tasks">
                <div class="item"  v-for="state in states" :key="state.id">
                    <div class="text-container">
                            <p>{{state.name}}</p>
                            <span class="trash" v-on:click="deleteState(state)">
                                <i class="fas fa-trash-alt"></i>
                            </span>
                    </div>
                        <div class="task-container">
                            <select class="filter-user" title="Cambiar orden" v-model="selectOrder" v-on:change="changeOrder(state,selectOrder)" >
                                <option   v-for="state in states" :key="state.order" :value="state.order">{{state.order}}</option>
                            </select>
                        </div>
                </div>
                <div class="item">
                     <button class="addPhase " v-on:click="createState()">+</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

 import { stateService } from '../_services/states.service';
 import { taskService } from '../_services/task.service';
export default {
    data(){
       return{ 
        haveData:false,
        currentUser: JSON.parse(localStorage.getItem('user')),
        selectProject:this.$route.params.id,
        nameProject:this.$route.params.name,
        states:[],
        orders:[],
        tasks:[],
        selectOrder:-1,
       }
    },
    computed: {
    },
    created () {
        this.getSeries();
        this.getStates();
    },
    methods: {
       getSeries: function () {
         taskService.getByProject(this.selectProject).then(
            taskss=>{
               this.haveData = true;
               this.tasks = taskss;
            }
       );
        },
        getStates: function () {
        this.states = [];
        this.orders = [];
          stateService.getByProject(this.selectProject).then(
            elements=>{
              elements.forEach(element => {
                  if(element.name!='Backlog' && element.name!='Terminada'){
                      this.states.push(element);
                      this.orders.push(element.order);
                  }
              });
            }
       );
        },
        changeOrder:function (state, order) {
            var oldOrder = state.order;
              state.order = order;
              stateService.update(state).then(element =>{
                  this.getStates();
              });
            
            this.states.forEach(element => {
                if(order < oldOrder ){
                    if(element.order < oldOrder && element.order>=order && element.id != state.id){
                        element.order = parseInt(element.order) + 1;
                        stateService.update(element);
                    }
                }
                else if(order > oldOrder){
                    if(element.order > oldOrder && element.order<=order && element.id != state.id){
                        element.order = parseInt(element.order) - 1;
                        stateService.update(element);
                    }
                }
            });
        },
        createState:function () {
            var lastOrder = this.orders[this.orders.length - 1] + 1;
             this.$router.push(`/createstate/${this.selectProject}/${lastOrder}`);
        },
        deleteState:function (state) {
            var delet = true;
            console.log("deleteState");
            console.log(this.taskss);
            this.tasks.forEach(element => {
                console.log(element);
                if(element.state == state.name){
                    delet = false;
                    console.log("No se ha podido eliminar porque tenia tareas");
                }
                if(element.id == this.tasks[this.tasks.length - 1].id && delet){
                    console.log("estado eliminado.");
                    stateService.remove(state.id).then(data=>{
                        this.states.forEach(element => {
                            if(element.order > state.order){
                                element.order = parseInt(element.order) - 1;
                                stateService.update(element).then(data =>{
                                    this.getStates();
                                });
                            }
                        });
                    });
                }
            });
            
        }
    }
};
</script>
<style scoped>

.addPhase{
    background-color: var(--admin-color);
    color: white;
    cursor:pointer;
    font-size: 80px;
    height: 100%;
}

.filter-kamban{/**/
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
        -ms-flex-direction:column;
            flex-direction:column;
}

.container-kanban{/**/
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    height: 100%;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin: 0 auto;
    margin-top: 10px;
    width: 98%;
}
.tasks{/**/
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    height: 100%;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    margin: 0 auto;
    width: 100%;
    z-index: 1;
}
.item{/**/
    background-color: white;
    border-radius: 0.5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-flex: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
}
.tasks .item:nth-child(n+2) {/**/
    margin-left: 10px;
}
.item:hover{/**/
    border-color: #17DA17;

}
.text-container{/**/
    border-top: 1px solid #EDEDED;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-weight: 700;
    line-height: 50px;
    text-align: center;
    text-transform: none;
    vertical-align: middle;
}
.task-container{
    margin: 0 auto;
    width: 50%;
}
.text-container > p {
    margin: 0 auto;
}
.trash{
    cursor: pointer;
    margin-right: 10px;
}
.filter-user{
    background-color: var(--admin-color);
    border: none;
    border-radius: 5px;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    color: white;
    font-family: 'Roboto', sans-serif;
    padding: 0.5rem;
    -webkit-transition: background-color 1s ease;
    -o-transition: background-color 1s ease;
    transition: background-color 1s ease;
    width: 100%;
}
</style>