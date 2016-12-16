window.StoreFactorySecurity =
(function($, Vue) {

    return function() {

        return {

            state: {
                principal: null,
            },

            mutations: {

                'security/principal': (state, principal) => {
                    state.principal = principal;
                },
            },

            actions: {

                'security/signin': ({ commit, state }, { email, password }) => {

                    return Vue.http
                        .post('/ws/signin', { email, password })
                        .then(
                            (d) => { commit('security/principal', d.data.principal); },
                            () => { commit('security/principal', null); }
                        )
                    ;
                },

                'security/signup': ({ commit, state }, { email, password }) => {

                    return Vue.http
                        .post('/ws/signup', { email, password })
                        .then(
                            (d) => { commit('security/principal', d.data.principal); },
                            () => { commit('security/principal', null); }
                        )
                    ;
                },

                'security/signout': ({ commit }) => {

                    return Vue.http
                        .post('/ws/signout')
                        .then(
                            () => { commit('security/principal', null); },
                            () => { commit('security/principal', null); }
                        )
                    ;
                },
            }
        }
    }

})(jQuery, Vue);
