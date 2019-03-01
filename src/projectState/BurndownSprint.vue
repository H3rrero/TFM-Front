<template>

<div class="scrolling_container" v-if="haveDataCh">
    <select  class="filterUser" v-model="selectPhase" v-on:change="updateData()" >
        <option  v-for="phase in fasesB" :key="phase.id" :value="phase.id">{{phase.name}}</option>
    </select>
    <highcharts class="container_chart" :constructor-type="'chart'" :updateArgs="updateArgs" :options="stockOptions"></highcharts>
</div>


</template>
<script>
 import { mapState, mapActions } from 'vuex'
 import { phaseService } from '../_services/phase.service';
 import { projectService } from '../_services/project.service';
 import { taskService } from '../_services/task.service';
export default {
  data () {
    return {
        project:{},
        fasesB:[],
        taskb:[],
        selectPhase:0,
        realData:[],
        estData:[],
        prueba: 'haha',
        haveDataCh : false,
        updateArgs: [true, true, true],
        stockOptions: {
                title: {
        text: 'Diagrama burndown'
    },
    
    yAxis: {
        
        title: {
            text: 'Esfuerzo remanente (horas)'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
     xAxis: {
          
         title: {
            text: 'Sprint'
        },
        categories: [1,2,3,4,5,6,7,8,9,10]
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            }
        }
    },

    series: [{
        name: 'Finalizacion estimada',
        data: []
    },
    {
        name: 'Real',
        data: [540,510]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
        }
    }
  },
 
   
    created () {
      this.getSeries();
       
    },
    methods: {
      getTasks: function () {
          taskService.getAll().then(
            taskss=>{
             this.taskb = taskss;
             this.updateData();
            }
       );
        },
        getSeries: function () {
          phaseService.getAll().then(
            fases=>{
            this.fasesB=fases;
              this.getProject();
             
            }
       );
        },
        getProject: function () {
          projectService.getById(0).then(
            element=>{
            this.project=element;
              this.getTasks();
             
            }
       );
        },
        updateData: function () {
            var oneDay = 24*60*60*1000;
            this.estData = [];
            this.fasesB.forEach(element => {
                let estTotal = element.totalHours;
                let end=new Date(Date.UTC(parseFloat(element.yearf),parseFloat(element.monthf),parseFloat(element.dayf)));
                let start = new Date(Date.UTC(parseFloat(element.yeari),parseFloat(element.monthi),parseFloat(element.dayi)));
                var diffDays = Math.round(Math.abs((start.getTime() - end.getTime())/(oneDay)));
                let time = element.totalHours/diffDays;
            
                if(element.id == this.selectPhase){
                    for (let index = 0; index < diffDays; index++) {
                        console.log(estTotal);
                        if(index+1 == diffDays)
                            estTotal = 0;
                        else
                            estTotal = (estTotal - time)
                    this.estData.push(parseInt(estTotal));
                        
                    }
                    this.stockOptions.series[0].data = this.estData;
                    this.stockOptions.series[1].data = this.estData;
                }
            });
            this.haveDataCh = true;
      
        }
    }

}
</script>

<style scoped>
.container_chart {
    height: 80%;
    margin: 1em auto;
}
.scrolling_container {
  overflow-x: auyo;
  width: 99%;
  padding: 0.5rem;
}
</style>