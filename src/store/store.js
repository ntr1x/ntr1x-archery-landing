window.Store =
(function($, Vue, Vuex) {

    const state = {
        model: null,
        active: {
            category: null,
            page: null,
            storage: null,
            source: null,
        },
    };

    const mutations = {

        model: (state, model) => {
            state.model = model
        },

        // showModal: (state, modal) => {
        //     state.modals.push(modal);
        // },
        //
        // closeModal: (state) => {
        //     state.modals.pop();
        // }
    }

    const actions = {

        increment: ({ commit }) => commit('increment'),
        decrement: ({ commit }) => commit('decrement'),

        incrementIfOdd ({ commit, state }) {
            if ((state.count + 1) % 2 === 0) {
                commit('increment')
            }
        },

        incrementAsync ({ commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('increment')
                    resolve()
                }, 1000)
            })
        },

        pull: ({ commit, state }) => {

        },

        push: ({ commit, state }) => {

        },

        action: ({ commit, state }, expression) => {
            console.log('action', expression);
            eval(expression);
        },
    }

    const getters = {
        evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
    }

    const Store = new Vuex.Store({
        strict: true,
        state,
        getters,
        actions,
        mutations
    })

    return Store

})(jQuery, Vue, Vuex);
