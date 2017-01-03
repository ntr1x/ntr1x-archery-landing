window.StoreFactoryPortals =
(function($, _, Vue) {

    return function({ endpoint }) {

        return {

            mutations: {
                'portals/model':  (state, user) => {

                }
            },
            actions: {

                'portals/push': ({ commit, state }) => {

                    return $.ajax({
                        url: `/ws/portals/${state.portal.id}`,
                        method: 'PUT',
                        dataType: 'json',
                        data: JSON.stringify(state.model),
                        contentType: 'application/json',
                    })
                    .then(
                        (d) => commit('portals/model', d),
                        () => {}
                    )
                },

                'portals/pull': ({ commit, state }) => {

                    return $.ajax({
                        url: `${endpoint}/portals/i/${state.portal.id}/pull`,
                        method: 'GET',
                        dataType: 'json'
                    })
                    .then(
                        (d) => commit('portals/model', d.content),
                        () => {}
                    )
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

                'portals/get/id': ({ commit, state }, { id }) => {
                    return Vue.http.get(`${endpoint}/portals/i/${id}`)
                },

                'portals/remove/id': ({ commit, state }, { id }) => {
                    return Vue.http.delete(`${endpoint}/portals/i/${id}`);
                },

                'portals/publish/id': ({ commit, state }, { id, title, thumbnail }) => {

                    var fd = new FormData();
                    fd.append('title', title);
                    fd.append('thumbnail', thumbnail);

                    return Vue.http.post(`/ws/portals/${id}/publication`, fd);
                },

                'portals/unpublish/id': ({ commit, state }, { id }) => {
                    return Vue.http.delete(`/ws/portals/${id}/publication`);
                }
            }
        }
    }

})(jQuery, _, Vue);
