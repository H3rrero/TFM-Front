import { phaseService } from '../_services/phase.service';

const state = {
    all: {}
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');

        phaseService.getAll()
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
        console.log("getAllSucces-->phases.module;")
        for (const phase   in phases) {
            if (phases.hasOwnProperty(phase)) {
                const element = phases[phase];
                series[0].data[phase] ={
                    start: Date.UTC(parseFloat(element.yeari),parseFloat(element.monthi),parseFloat(element.dayi)),
                    end: Date.UTC(parseFloat(element.yearf),parseFloat(element.monthf),parseFloat(element.dayf)),
                    name:element.name,
                    completed: parseFloat (element.completed),
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
