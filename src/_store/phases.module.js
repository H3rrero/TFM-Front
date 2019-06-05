import { phaseService } from '../_services/phase.service';

const state = {
    all: {}
};

const actions = {
    getAll({ commit },data) {
        commit('getAllRequest');
        phaseService.getByProject(data)
            .then(
                phases => commit('getAllSuccess', phases),
                error => commit('getAllFailure', error)
            );
    },

};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, phases) {
        var series=[{name:'prueba gantt',data:[]}];
        for (const phase   in phases) {
            if (phases.hasOwnProperty(phase)) {
                const element = phases[phase];
                var ini = new Date(element.dateI);
                var end = new Date(element.dateF);
                series[0].data[phase] ={
                    start: Date.UTC(ini.getFullYear(),ini.getMonth(),ini.getDate()),
                    end: Date.UTC(end.getFullYear(),end.getMonth(),end.getDate()),
                    dateIni: element.dateI.substr(0,element.dateI.indexOf('T')),
                    dateEnd: element.dateF.substr(0,element.dateF.indexOf('T')),
                    name:element.name,
                    completed: parseFloat (element.completed),
                    hours:element.hours,
                    totalHours:element.totalHours,
                    y:parseFloat (phase)
                }
            }
        }
        state.all = { items: series };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
};

export const phases = {
    namespaced: true,
    state,
    actions,
    mutations
};
