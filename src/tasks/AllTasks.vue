<template>
    <div v-if="haveData">
       <div class="table-container" role="table" aria-label="Destinations">
            <div class="flex-table header" role="rowgroup">
                <div v-on:click="sort('title')" class="flex-row first" role="columnheader">Nombre</div>
                <div v-on:click="sort('assigned')" class="flex-row" role="columnheader">Asignada</div>
                <div v-on:click="sort('state')" class="flex-row" role="columnheader">Estado</div>
                <div v-on:click="sort('dateI')" class="flex-row" role="columnheader">Fecha inicio</div>
                <div v-on:click="sort('dateF')" class="flex-row first" role="columnheader">Fecha fin</div>
                <div v-on:click="sort('planHours')" class="flex-row" role="columnheader">Horas planificadas</div>
                <div v-on:click="sort('hours')" class="flex-row" role="columnheader">Horas dedicadas</div>
            </div>
            <div class="flex-table row" role="rowgroup" v-for="task in sortedTasks" :key="task.id">
                <div class="flex-row rowspan first">{{task.title}}</div>
                <div class="flex-row rowspan ">{{task.assigned}}</div>
                <div class="flex-row rowspan first">{{task.state}}</div>
                <div class="flex-row rowspan ">{{new Date(task.dateI).getDate() +'/'+parseInt(new Date(task.dateI).getMonth()+1)+'/'+new Date(task.dateI).getFullYear()}}</div>
                <div class="flex-row rowspan first">{{new Date(task.dateF).getDate() +'/'+ parseInt(new Date(task.dateF).getMonth()+1)+'/'+new Date(task.dateF).getFullYear()}}</div>
                <div class="flex-row rowspan ">{{task.planHours}}</div>
                <div class="flex-row rowspan first">{{task.hours}}</div>
                
            </div>
        </div>
    </div>
</template>

<script>

 import { taskService } from '../_services/task.service';
export default {
    data(){
       return{ 
        tasks:[],
        haveData:false,
        currentSort:'name',
        currentSortDir:'asc'
       }
    },
    created () {
        this.getTasks();
    },
    computed:{
      sortedTasks:function() {
        return this.tasks.sort((a,b) => {
          let modifier = 1;
          if(this.currentSortDir === 'desc') modifier = -1;
          if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        });
      }
  },
    methods: {
     getTasks: function () {
         taskService.getAll().then(
            taskss=>{
              this.tasks = taskss;
               this.haveData = true;
            }
       );
        },sort:function(s) {
          //if s == current sort, reverse
          if(s === this.currentSort) {
            this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
          }
          this.currentSort = s;
        }
    }
};
</script>
<style scoped>
div {
  box-sizing: border-box;
}
.table-container {
  display: block;
  margin: 2em auto;
  width: 90%;
}
.flag-icon {
  margin-right: 0.1em;
}
.flex-table {
  display: flex;
  flex-flow: row wrap;
  border-left: solid 1px #d9d9d9;
  transition: 0.5s;
}
.flex-table:first-of-type {
  border-top: solid 1px #333399;
  border-left: solid 1px #333399;
}
.flex-table:first-of-type .flex-row {
  background: #333399;
  color: white;
  border-color: #333399;
}
.flex-table.row:nth-child(odd) .flex-row {
  background: #f4f2f1;
}
.flex-table:hover {
  background: #f5f5f5;
  transition: 500ms;
}
.flex-row {
  width: calc(100% / 7);
  text-align: center;
  padding: 0.5em 0.5em;
  border-right: solid 1px #d9d9d9;
  border-bottom: solid 1px #d9d9d9;
}
.rowspan {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
}
.column {
  display: flex;
  flex-flow: column wrap;
  width: 50%;
  padding: 0;
}
.column .flex-row {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  padding: 0;
  border: 0;
  border-bottom: solid 1px #d9d9d9;
}
.column .flex-row:hover {
  background: #f5f5f5;
  transition: 500ms;
}
.flex-cell {
  width: calc(100% / 2);
  text-align: center;
  padding: 0.5em 0.5em;
  border-right: solid 1px #d9d9d9;
}
@media all and (max-width: 767px) {
  .flex-row {
    width: calc(100% / 3);
  }
  .flex-row.first {
    width: 100%;
  }
  .column {
    width: 100%;
  }
}
@media all and (max-width: 430px) {
  .flex-table .flex-row {
    border-bottom: 0;
  }
  .flex-table .flex-row:last-of-type {
    border-bottom: solid 1px #d9d9d9;
  }
  .header .flex-row {
    border-bottom: solid 1px;
  }
  .flex-row {
    width: 100%;
  }
  .flex-row.first {
    width: 100%;
    border-bottom: solid 1px #d9d9d9;
  }
  .column {
    width: 100%;
  }
  .column .flex-row {
    border-bottom: solid 1px #d9d9d9;
  }
  .flex-cell {
    width: 100%;
  }
}

</style>