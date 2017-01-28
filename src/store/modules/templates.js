window.StoreFactoryTemplates =
(function($, Vue) {

    return function({ endpoint }) {

        return {

            state: {
            },

            actions: {

                'templates/my': ({ commit, state, rootState }, data) => {
                    return Vue.http.get(`${endpoint}/me/templates`, {
                        params: data,
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    })
                },

                'templates/create': ({ commit, state, rootState }, data) => {
                    return Vue.http.post(`${endpoint}/me/templates`, data, {
                        params: data,
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    })
                },

                'templates/id/get': ({ commit, state, rootState }, { id }) => {
                    return Vue.http.get(`${endpoint}/templates/i/${id}`, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    });
                },

                'templates/id/remove': ({ commit, state, rootState }, { id }) => {
                    return Vue.http.delete(`${endpoint}/templates/i/${id}`, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    });
                },

                'templates/id/update': ({ commit, state, rootState }, data) => {

                    return Vue.http.put(`${endpoint}/templates/i/${data.id}`, {
                        name: data.name,
                        subject: data.subject,
                        sender: data.sender,
                        content: data.content,
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
