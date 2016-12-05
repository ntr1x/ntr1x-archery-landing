window.StoreFactoryModals =
(function() {

    return function() {

        return {

            state: {
                items: [],
            },

            mutations: {

                'modals/show': (state, modal) => {
                    state.items.push(modal);
                },

                'modals/close': (state) => {
                    state.items.pop()
                }
            }
        }
    }

})();
