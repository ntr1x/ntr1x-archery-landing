window.StoreFactoryPortals =
(function($, Vue) {

    return function({ endpoint }) {

        return {

            state: {
                shared: null
            },
            mutations: {
                // 'portals/model':  (state, user) => {
                //
                // }
                'portals/shared': (state, shared) => {
                    state.shared = shared
                }
            },
            actions: {

                'portals/id/push': ({ commit, state }) => {

                    return $.ajax({
                        url: `/ws/portals/${state.portal.id}`,
                        method: 'PUT',
                        dataType: 'json',
                        data: JSON.stringify(state.model),
                        contentType: 'application/json',
                    })
                    .then(
                        (d) => { commit('portals/model', d) },
                        () => {}
                    )
                },

                'portals/pull': ({ commit, state, rootState }) => {

                    return Vue.http.get(`${endpoint}/portals/i/${state.portal.id}/pull`, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token
                        })
                    })
                },

                'portals/shared': ({ commit, state, rootState }, data) => {
                    return Vue.http.get(`${endpoint}/portals/shared`, {
                        params: data,
                    })
                },

                'portals/my': ({ commit, state, rootState }, data) => {
                    return Vue.http.get(`${endpoint}/me/portals`, {
                        params: data,
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    })
                },

                'portals/create': ({ commit, state, rootState }, data) => {
                    return Vue.http.post(`${endpoint}/me/portals`, data, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    })
                },

                'portals/id/get': ({ commit, state, rootState }, { id }) => {
                    return Vue.http.get(`${endpoint}/portals/i/${id}`, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    })
                },

                'portals/id/remove': ({ commit, state, rootState }, { id }) => {
                    return Vue.http.delete(`${endpoint}/portals/i/${id}`, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    });
                },

                'portals/id/update': ({ commit, state, rootState }, data) => {

                    return Vue.http.put(`${endpoint}/portals/i/${data.id}`, {
                        title: data.title,
                        thumbnail: data.thumbnail,
                        shared: data.shared,
                    }, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    });
                },

                'portals/id/share': ({ commit, state, rootState }, { id }) => {

                    return Vue.http.put(`${endpoint}/portals/i/${id}/share`, null, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    });
                },

                'portals/id/unshare': ({ commit, state, rootState }, { id }) => {
                    return Vue.http.put(`${endpoint}/portals/i/${id}/unshare`, null, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    });
                }
            }
        }
    }

})(jQuery, Vue);
