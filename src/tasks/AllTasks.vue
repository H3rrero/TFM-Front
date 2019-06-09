<template>
    <div v-if="haveData">
       <app-breadcrumbs class="user-background"></app-breadcrumbs>
       <div class="table-container" role="table" aria-label="Destinations">
            <div class="flex-table header" role="rowgroup">
                <div v-on:click="sort('title')" class="flex-row first" role="columnheader">Nombre</div>
                <div v-on:click="sort('assigned')" class="flex-row" role="columnheader">Asignada</div>
                <div v-on:click="sort('state')" class="flex-row" role="columnheader">Estado</div>
                <div v-on:click="sort('dateI')" class="flex-row" role="columnheader">Fecha inicio</div>
                <div v-on:click="sort('dateF')" class="flex-row first" role="columnheader">Fecha fin</div>
                <div v-on:click="sort('planHours')" class="flex-row" role="columnheader">Horas planificadas</div>
                <div v-on:click="sort('hours')" class="flex-row last-row" role="columnheader"><p>Horas dedicadas</p> 
                  <download-csv
                    :data   = "json_data"
                    name    = "filename.csv">
                    <span>
                        <i class="fas fa-file-csv"></i>
                    </span>
                  </download-csv>
                </div>
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
        currentSortDir:'asc',
        json_data: [  ]
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
               taskss.forEach(element => {
                  this.json_data.push(element);
               });
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
  -webkit-box-sizing: border-box;
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
  border-left: solid 1px #d9d9d9;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-flow: row wrap;
          flex-flow: row wrap;
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
  transition: 0.5s;
}
.flex-table:first-of-type {
  border-top: solid 1px var(--man-color);
  border-left: solid 1px var(--man-color);
}
.flex-table:first-of-type .flex-row {
  background: var(--man-color);
  border-color: var(--man-color);
  color: white;
}
.flex-table.row:nth-child(odd) .flex-row {
  background: #f4f2f1;
}
.flex-table:hover {
  background: #f5f5f5;
  -webkit-transition: 500ms;
  -o-transition: 500ms;
  transition: 500ms;
}
.flex-row {
  border-right: solid 1px #d9d9d9;
  border-bottom: solid 1px #d9d9d9;
  padding: 0.5em 0.5em;
  text-align: center;
  width: calc(100% / 7);
}
.last-row{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

}
.last-row > p{
  margin-right: 10px;
}
.rowspan {
  -webkit-box-align: start;
      -ms-flex-align: start;
          align-items: flex-start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-flow: row wrap;
          flex-flow: row wrap;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}
.column {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-flow: column wrap;
          flex-flow: column wrap;
  padding: 0;
  width: 50%;
}
.column .flex-row {
  border: 0;
  border-bottom: solid 1px #d9d9d9;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-flow: row wrap;
          flex-flow: row wrap;
  padding: 0;
  width: 100%;
}
.column .flex-row:hover {
  background: #f5f5f5;
  -webkit-transition: 500ms;
  -o-transition: 500ms;
  transition: 500ms;
}
.flex-cell {
  border-right: solid 1px #d9d9d9;
  text-align: center;
  padding: 0.5em 0.5em;
  width: calc(100% / 2);
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