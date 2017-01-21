window.StoreFactorySecurity =
(function($, Vue) {

    return function({ endpoint }) {

        return {

            state: {
                principal: {
                    token: null,
                    user: null,
                }
            },

            mutations: {

                'security/principal': (state, principal) => {
                    state.principal.user = principal.user
                    state.principal.token = principal.token
                    if (state.principal.token) {
                        Cookies.set('authorization', state.principal.token, { expires: 365 })
                    } else {
                        Cookies.remove('authorization')
                    }
                },
            },

            actions: {

                'security/signin': ({ commit, state }, { email, password }) => {

                    return Vue.http
                        .post(`${endpoint}/security/signin`, { email, password })
                        .then(
                            (d) => {
                                commit('security/principal', {
                                    user: d.data.user,
                                    token: d.data.token
                                });
                            },
                            () => {
                                commit('security/principal', {
                                    user: null,
                                    token: null
                                });
                            }
                        )
                    ;
                },

                'security/signup': ({ commit, state }, { email, password, name }) => {

                    return Vue.http
                        .post(`${endpoint}/security/signup`, { email, password, name })
                        .then(
                            (d) => { alert('Check your email') },
                            () => { alert('fail') }
                        )
                        // .then(
                        //     (d) => { commit('security/user', d.data); },
                        //     () => { commit('security/user', null); }
                        // )
                    ;
                },

                'security/signout': ({ commit }) => {

                    return Vue.http
                        .post(`${endpoint}/security/signout`)
                        .then(
                            () => {
                                commit('security/principal', {
                                    user: null,
                                    token: null
                                });
                            },
                            () => {
                                commit('security/principal', {
                                    user: null,
                                    token: null
                                });
                            }
                        )
                    ;
                },
            },
        }
    }

})(jQuery, Vue);
