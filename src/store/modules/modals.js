(function($, Vue, Vuex, Store) {

    Store.registerModule('modals', {

        state: {
            items: [],
        },

        mutations: {

            showModal: (state, modal) => {
                state.items.push(modal);
            },

            closeModal: (state) => {
                state.items.pop()
            }
        }
    })

})(jQuery, Vue, Vuex, Store);
