window.StoreFactoryPortals =
(function($, Vue) {

    return function() {

        return {

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
                        url: `/ws/portals/${state.portal.id}`,
                        method: 'GET',
                        dataType: 'json'
                    })
                    .then(
                        (d) => commit('portals/model', d),
                        () => {}
                    )
                },

                'portals/load': ({ commit, state }, data) => {
                    return Vue.http.get('/ws/portals', {
                        params: data
                    })
                },

                'portals/create': ({ commit, state }, data) => {
                    return Vue.http.post('/ws/portals', data)
                },

                'portals/get/id': ({ commit, state }, { id }) => {
                    return Vue.http.get(`/ws/portals/${id}`)
                },

                'portals/remove/id': ({ commit, state }, { id }) => {
                    return Vue.http.delete(`/ws/portals/${id}`);
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

})(jQuery, Vue);
