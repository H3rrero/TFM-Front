<template>
<div v-if=" haveData" >
<app-breadcrumbs v-bind:class="{ 'user-background': currentUser.rol=='user','man-background': currentUser.rol=='manager' }" ></app-breadcrumbs>
  <select  class="filter-users" v-model="selectPhase" v-on:change="getSeries()" >
        <option  v-for="phase in fasesB" :key="phase.id" :value="phase.id">{{phase.name}}</option>
    </select>
<div class="scrolling-container" >
  <highcharts class="container-gantt" :constructor-type="'chart'" :updateArgs="updateArgs" :options="stockOptions"></highcharts>
</div>
</div>

</template>
<script>
 import { mapState, mapActions } from 'vuex'
 import { userPhaseService } from '../_services/userPhase.service';
  import { phaseService } from '../_services/phase.service';
  import { userProjectService } from '../_services/userProject.service';
export default {
  data () {
    return {
      hours:[],
      htest:[],
      fasesB:[],
      selectPhase:"",
      currentUser:JSON.parse(localStorage.getItem('user')),
      prueba: 'haha',
      haveData : false,
      updateArgs: [true, true, true],
      selectPhase:this.$route.params.id,
      selectProject:this.$route.params.idProject,
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
 
    created () {
      this.getPhases();
       
    },
    
    mounted(){
      this.getSeries()
    },
    methods: {
      
       getPhases: function () {
          phaseService.getByProject(this.selectProject).then(
            fases=>{
            this.fasesB=fases;
            }
       );
        },
        getSeries: function () {
          this.hours = [];
          this.htest = [];
          userProjectService.getUserByProject(this.selectProject).then(users =>{
            users.forEach(element => {
              this.htest.push(element);
              userPhaseService.getByUserAndPhase(element.id,this.selectPhase).then(
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