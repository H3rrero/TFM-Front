<template>

<div class="scrolling-container" v-if="haveDataCh">
    <app-breadcrumbs></app-breadcrumbs>
  <highcharts class="container-chart" :constructor-type="'chart'" :updateArgs="updateArgs" :options="stockOptions"></highcharts>
</div>


</template>
<script>
 import { mapState, mapActions } from 'vuex'
 import { phaseService } from '../_services/phase.service';
 import { projectService } from '../_services/project.service';
export default {
  data () {
    return {
        project:{},
        fasesB:[],
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
              this.updateData();
             
            }
       );
        },
        updateData: function () {
         let estTotal = this.project.planHours;
         let realEst = this.project.planHours;
         this.fasesB.forEach(element => {
             let end= new Date(element.dateF);
             let date = new Date();
             estTotal = estTotal-element.totalHours;
             realEst = realEst - element.completedHours;
             console.log("estTotal");
             console.log(estTotal);
             console.log(element)
             this.estData.push(estTotal);
             if(end < date){
                this.realData.push(realEst);
             }
             this.stockOptions.series[0].data = this.estData;
             this.stockOptions.series[1].data = this.realData;
             console.log( this.stockOptions.series);
         });
      this.haveDataCh = true;
      
        }
    }

}
</script>

<style scoped>
.container-chart {
    height: 80%;
    margin: 1em auto;
}
.scrolling-container {
  overflow-x: auyo;
  padding: 0.5rem;
  width: 99%;
}
</style>