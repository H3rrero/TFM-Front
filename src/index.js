import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';
import Navigator from './navigator/Navigator';
import TaskData from './home/TaskData';
import ChangeHours from './home/ChangeHours';
import Task from './tasks/Task'
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import gantt from 'highcharts/modules/gantt';
import mapInit from 'highcharts/modules/map';
import stockInit from 'highcharts/modules/stock';
import exporting from 'highcharts/modules/exporting';
import Datetime from 'vue-datetime';
import VueTextareaAutosize from 'vue-textarea-autosize';
import { Drag, Drop } from 'vue-drag-drop';

gantt(Highcharts);
mapInit(Highcharts);
stockInit(Highcharts);
exporting(Highcharts);

Vue.use(VeeValidate);
Vue.use(HighchartsVue);
Vue.use(Datetime);
Vue.use(VueTextareaAutosize);

Vue.component('drag', Drag);
Vue.component('drop', Drop);
Vue.component('navigator',Navigator);
Vue.component('taskdata',TaskData);
Vue.component('changehours',ChangeHours);
Vue.component('task',Task);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});