window.StoreFactory =
(function($, Vue, Vuex) {

    return function() {

        const state = {
        }

        const mutations = {
        }

        const actions = {

            action: ({ commit, state }, expression) => {
                console.log('action', expression);
                eval(expression);
            },
        }

        const getters = {
        }

        return new Vuex.Store({
            strict: true,
            state,
            getters,
            actions,
            mutations
        })
    }

})(jQuery, Vue, Vuex);
