window.StoreFactoryLanding =
(function() {

    return function() {

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
            }
        }
    }

})();
