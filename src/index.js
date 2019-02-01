import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';
import Navigator from './navigator/Navigator';
import TaskData from './home/TaskData';
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import gantt from 'highcharts/modules/gantt';
import mapInit from 'highcharts/modules/map';
import stockInit from 'highcharts/modules/stock';
import Datetime from 'vue-datetime'

gantt(Highcharts);
mapInit(Highcharts)
stockInit(Highcharts);

Vue.use(VeeValidate);
Vue.use(HighchartsVue)
Vue.use(Datetime)

Vue.component('navigator',Navigator);
Vue.component('taskdata',TaskData);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});