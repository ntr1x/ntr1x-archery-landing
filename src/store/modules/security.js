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

                'security/principal/user': (state, user) => {
                    state.principal.user = user
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
                            (e) => { throw e }
                        )
                    ;
                },

                'security/signup': ({ commit, state }, { email, password, name }) => {

                    return Vue.http
                        .post(`${endpoint}/security/signup`, { email, password, name })
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

                'security/recover': ({ commit, state }, { email }) => {

                    return Vue.http
                        .post(`${endpoint}/security/recover`, { email })
                    ;
                },

                'security/recover/password/update': ({ commit, state }, { newPassword, token }) => {

                    return Vue.http
                        .put(`${endpoint}/security/passwd`, {
                            token,
                            newPassword,
                        })
                        .then(
                            (d) => {
                                commit('security/principal', {
                                    user: d.data.user,
                                    token: d.data.token
                                });
                            },
                            (e) => { throw e }
                        )
                    ;
                },

                'security/profile/update': ({ commit, state, rootState }, data) => {

                    return Vue.http.put(`${endpoint}/me/profile`, {
                        name: data.name,
                    }, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    });
                },

                'security/profile/email/update': ({ commit, state, rootState }, data) => {

                    return Vue.http.put(`${endpoint}/me/profile/email`, {
                        email: data.email,
                        password: data.password,
                    }, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    });
                },

                'security/profile/password/update': ({ commit, state, rootState }, data) => {

                    return Vue.http.put(`${endpoint}/me/profile/passwd`, {
                        password: data.password,
                        newPassword: data.newPassword,
                    }, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    });
                },
            },
        }
    }

})(jQuery, Vue);
