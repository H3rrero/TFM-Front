<template>
<div v-if="phases.items">
<li v-for="phase in phases.items" :key="phase.id">
  <p>{{phase.name}}</p>
</li>
<button v-on:click= "getSeries()">iohj</button>
<div class="scrolling-container">
  <highcharts class="container" :constructor-type="'ganttChart'" :options="stockOptions"></highcharts>
</div>
</div>

</template>
<script>
 import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      series:{},
  stockOptions: {
      colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
          '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
          backgroundColor: {
              linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
              stops: [
                  [0, '#2a2a2b'],
                  [1, '#3e3e40']
              ]
          },
          style: {
              fontFamily: '\'Unica One\', sans-serif'
          },
          plotBorderColor: '#606063'
      },
      title: {
          style: {
              color: '#E0E0E3',
              textTransform: 'uppercase',
              fontSize: '20px'
          }
      },
      subtitle: {
          style: {
              color: '#E0E0E3',
              textTransform: 'uppercase'
          }
      },
    xAxis: {
          gridLineColor: '#707073',
          labels: {
              style: {
                  color: '#E0E0E3'
              }
          },
          lineColor: '#707073',
          minorGridLineColor: '#505053',
          tickColor: '#707073',
          title: {
              style: {
                  color: '#A0A0A3'

              }
          }
      },
    yAxis: {
      type: 'category',
      grid: {
        enabled: true,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        columns: [{
          title: {
            text: 'Project'
          },
          labels: {
            format: '{point.name}'
          }
        },  {
          labels: {
            format: '{point.start:%e. %b}'
          },
          title: {
            text: 'Start date'
          }
        }, {
          title: {
            text: 'End date'
          },
          offset: 30,
          labels: {
            format: '{point.end:%e. %b}'
          }
        }]
      }
    },

      plotOptions: {
          series: {
              dataLabels: {
                  color: '#B0B0B3'
              },
              marker: {
                  lineColor: '#333'
              }
          },
          boxplot: {
              fillColor: '#505053'
          },
          candlestick: {
              lineColor: 'white'
          },
          errorbar: {
              color: 'white'
          }
      },
      legend: {
          itemStyle: {
              color: '#E0E0E3'
          },
          itemHoverStyle: {
              color: '#FFF'
          },
          itemHiddenStyle: {
              color: '#606063'
          }
      },
      credits: {
          style: {
              color: '#666'
          }
      },
      labels: {
          style: {
              color: '#707073'
          }
      },

      drilldown: {
          activeAxisLabelStyle: {
              color: '#F0F0F3'
          },
          activeDataLabelStyle: {
              color: '#F0F0F3'
          }
      },

      navigation: {
          buttonOptions: {
              symbolStroke: '#DDDDDD',
              theme: {
                  fill: '#505053'
              }
          }
      },
  rangeSelector: {
          buttonTheme: {
              fill: '#505053',
              stroke: '#000000',
              style: {
                  color: '#CCC'
              },
              states: {
                  hover: {
                      fill: '#707073',
                      stroke: '#000000',
                      style: {
                          color: 'white'
                      }
                  },
                  select: {
                      fill: '#000003',
                      stroke: '#000000',
                      style: {
                          color: 'white'
                      }
                  }
              }
          },
          inputBoxBorderColor: '#505053',
          inputStyle: {
              backgroundColor: '#333',
              color: 'silver'
          },
          labelStyle: {
              color: 'silver'
          }
      },

      navigator: {
          handles: {
              backgroundColor: '#666',
              borderColor: '#AAA'
          },
          outlineColor: '#CCC',
          maskFill: 'rgba(255,255,255,0.1)',
          series: {
              color: '#7798BF',
              lineColor: '#A6C7ED'
          },
          xAxis: {
              gridLineColor: '#505053'
          }
      },

      scrollbar: {
          barBackgroundColor: '#808083',
          barBorderColor: '#808083',
          buttonArrowColor: '#CCC',
          buttonBackgroundColor: '#606063',
          buttonBorderColor: '#606063',
          rifleColor: '#FFF',
          trackBackgroundColor: '#404043',
          trackBorderColor: '#404043'
      },
    // special colors for some of the
      legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
      background2: '#505053',
      dataLabelsColor: '#B0B0B3',
      textColor: '#C0C0C0',
      contrastTextColor: '#F0F0F3',
      maskColor: 'rgba(255,255,255,0.3)',
        tooltip: {
          xDateFormat: '%e %b %Y, %H:%M',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          style: {
              color: '#F0F0F0'
          }
      },
  
  
    series: [{
      name: 'Project 1',
      data: [{
        start: Date.UTC(2019, 0, 1, 8),
        end: Date.UTC(2019, 0, 25, 16),
        name: 'Start prototype',
        
        completed:0.25,
        y: 0
      }, {
        start: Date.UTC(2019, 0, 26, 8),
        end: Date.UTC(2019, 1, 24, 16),
        name: 'Develop',
        
        completed:0.25,
        y: 1
      }, {
        start: Date.UTC(2019, 1, 25, 16),
        end: Date.UTC(2019, 3, 25, 16),
        name: 'Prototype done',
        
        completed:0.25,
        y: 2
      }, {
        start: Date.UTC(2019, 3, 27, 8),
        end: Date.UTC(2019, 4, 15, 16),
        name: 'Test prototype',
        
        completed:0.25,
        y: 3
      }, {
        start: Date.UTC(2019, 4, 16, 8),
        end: Date.UTC(2019, 5, 30, 16),
        name: 'Run acceptance tests',
      
        completed:0.25,
        y: 4
      }]
    }],
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
        this.getAllPhases(); 
        
    },
    mounted(){
      console.log("mounted porjectstate");
    },
    methods: {
      
        ...mapActions('phases', {
            getAllPhases: 'getAll',
        }),
        getSeries: function () {
           console.log(phases.items[0]);
          for (const phase in phases.items) {
            console.log(phases.items[phase].name);
          } 
        }
    }

}
</script>

<style scoped>
#container {
    height: 100%;
    margin: 1em auto;
}
.scrolling-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
</style>