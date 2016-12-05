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
                            (e) => { commit('security/principal', null); reject(e); }
                        )
                    ;
                },

                'security/signup': ({ commit, state }, { email, password }) => {

                    return Vue.http
                        .post('/ws/signup', { email, password })
                        .then(
                            (d) => { commit('security/principal', d.data.principal); },
                            (e) => { commit('security/principal', null); reject(e); }
                        )
                    ;
                },

                'security/signout': ({ commit, state }) => {

                    return Vue.http
                        .post('/ws/signout')
                        .then(
                            (d) => { commit('security/principal', null); },
                            (e) => { reject(e); }
                        )
                    ;
                },
            }
        }
    }

})(jQuery, Vue);
