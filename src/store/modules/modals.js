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

                'modals/dialog/show': (state, modal) => {
                    state.items.push({
                        type: 'dialog',
                        modal
                    });
                },

                'modals/dialog/close': (state) => {
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
                            events: modal.events,
                            context: modal.context
                        })
                    }
                },

                'modals/trigger': ({ commit, state }, { name, data }) => {

                    let modal = state.items[state.items.length - 1]
                    let events = modal && modal.modal && modal.modal.events
                    if (events && events[name]) {
                        events[name](data)
                    }
                },

                'modals/close': ({ commit }) => {
                    commit('modals/page/close')
                },
            },
        }
    }

})();
