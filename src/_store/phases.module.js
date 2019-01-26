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
        state.all = { items: phases };
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
