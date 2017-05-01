window.StoreFactoryLanding =
(function($, Vue) {

    return function({ endpoint }) {

        return {

            state: {
                offers: null,
            },

            mutations: {

                'landing/offers': (state, offers) => {
                    state.offers = offers;
                },
            },

            actions: {

                'landing/orders/create': ({ commit, state, rootState }, data) => {
                    return Vue.http.post(`${endpoint}/me/store/orders`, data, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    })
                },

                'landing/offers/id/get': ({ commit, state, rootState }, { id }) => {
                    return Vue.http.get(`${endpoint}/store/offers/i/${id}`, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    })
                },

                'landing/offers/id/context': ({ commit, state, rootState }, { id }) => {
                    return Vue.http.get(`${endpoint}/store/offers/i/${id}/context`, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token || undefined
                        })
                    })
                },
            }
        }
    }

})(jQuery, Vue);
