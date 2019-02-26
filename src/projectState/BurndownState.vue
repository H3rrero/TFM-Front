<template>
<div v-if="phases.items">
<div class="scrolling_container" v-if="haveDataCh">
  <highcharts class="container_chart" :constructor-type="'chart'" :updateArgs="updateArgs" :options="stockOptions"></highcharts>
</div>
</div>

</template>
<script>
 import { mapState, mapActions } from 'vuex'
 import { phaseService } from '../_services/phase.service';
export default {
  data () {
    return {
        fasesg:[],
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
        categories: [1,2,3,4,5,6,7,8,9,10,11]
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
        data: [500,450,400,350,300,250,200,150,100,50,0]
    },
    {
        name: 'Real',
        data: [500,475,410,375,325,275,220,155,95,40,0]
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
 
    computed: {
        ...mapState({
            account: state => state.account,
            phases: state => state.phases.all
        })
    },
    created () {
      console.log("created porjectstate");
        this.getAllPhases()
       
    },
    mounted(){
      console.log("mounted porjectstate");
      this.getSeries()
    },
    methods: {
      
        ...mapActions('phases', {
            getAllPhases: 'getAll',
        }),
        getSeries: function () {
          phaseService.getAll().then(
            fases=>{
              this.updateData();
             
            }
       );
        },
        updateData: function () {
         
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