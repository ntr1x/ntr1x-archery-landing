window.StoreFactoryDomains =
(function($, Vue) {

    return function({ endpoint }) {

        return {

            state: {
            },

            actions: {

                'domains/my': ({ commit, state, rootState }, data) => {
                    return Vue.http.get(`${endpoint}/me/archery/domains`, {
                        params: data,
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    })
                },

                'domains/create': ({ commit, state, rootState }, data) => {
                    return Vue.http.post(`${endpoint}/me/archery/domains`, data, {
                        params: data,
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    })
                },

                'domains/id/get': ({ commit, state, rootState }, { id }) => {
                    return Vue.http.get(`${endpoint}/archery/domains/i/${id}`, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    });
                },

                'domains/id/remove': ({ commit, state, rootState }, { id }) => {
                    return Vue.http.delete(`${endpoint}/archery/domains/i/${id}`, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    });
                },

                'domains/id/update': ({ commit, state, rootState }, data) => {

                    return Vue.http.put(`${endpoint}/archery/domains/i/${data.id}`, {
                        name: data.name,
                    }, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    });
                },
            }
        }
    }

})(jQuery, Vue);
