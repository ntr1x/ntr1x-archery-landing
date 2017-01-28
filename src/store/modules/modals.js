window.StoreFactoryModals =
(function() {

    return function() {

        return {

            state: {
                items: [],
            },

            mutations: {

                'modals/editor/show': (state, modal) => {
                    state.items.push({
                        type: 'editor',
                        modal
                    });
                },

                'modals/editor/close': (state) => {
                    state.items.pop()
                },

                'modals/page/show': (state, modal) => {
                    state.items.push({
                        type: 'page',
                        modal
                    });
                },

                'modals/page/close': (state) => {
                    state.items.pop()
                },
            },

            actions: {

                'modals/show': ({ commit, getters }, modal) => {

                    let page = null
                    for (let p of getters.content.pages) {
                        if (p.name == modal.page) {
                            page = p
                            break
                        }
                    }

                    if (page != null) {
                        commit('modals/page/show', {
                            page: page,
                            context: modal.context
                        })
                    }
                },

                'modals/close': ({ commit }) => {
                    commit('modals/page/close')
                },
            },
        }
    }

})();
