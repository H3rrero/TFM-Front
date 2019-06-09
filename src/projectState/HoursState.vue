<template>
<div v-if=" haveData" >
<app-breadcrumbs v-bind:class="{ 'user-background': currentUser.rol=='user','man-background': currentUser.rol=='manager' }" ></app-breadcrumbs>
<div class="scrolling-container" >
  <highcharts class="container-gantt" :constructor-type="'chart'" :updateArgs="updateArgs" :options="stockOptions"></highcharts>
</div>
</div>

</template>
<script>
 import { mapState, mapActions } from 'vuex'
 import { userPhaseService } from '../_services/userPhase.service';
  import { userProjectService } from '../_services/userProject.service';
export default {
  data () {
    return {
      hours:[],
      htest:[],
      prueba: 'haha',
      currentUser:JSON.parse(localStorage.getItem('user')),
      haveData : false,
       updateArgs: [true, true, true],
       selectProject:this.$route.params.id,
  stockOptions: {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Horas dedicadas por programadores'
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Horas dedicadas'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    series: [
        {
            name: "Browsers",
            colorByPoint: true,
            data: [
                
            ]
        }
    ],
   
}
    }
  },
 
    
    
    mounted(){
      this.getSeries()
    },
    methods: {
      
       
        getSeries: function () {
          userProjectService.getUserByProject(this.selectProject).then(users =>{
            users.forEach(element => {
              this.htest.push(element);
              userPhaseService.getHoursUser(element.id).then(
              fases=>{
                
               if(fases.message == null){
                   this.hours.push(fases);
                 }
                 if(this.htest.length == users.length){
                   this.updateData();
                 }
              }
            );
            });
          });
          
        },
        updateData: function () {
          this.haveData = true;
     
        this.stockOptions.series[0].data = this.hours;
      
        }
    }

}
</script>

<style scoped>
.container-gantt {
    height: 80%;
    margin: 1em auto;
}
.scrolling-container {
  overflow-x: auto;
  padding: 0.5rem;
  width: 99%;
}
</style>