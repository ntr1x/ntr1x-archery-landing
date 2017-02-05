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
            }
        }
    }

})(jQuery, Vue);
