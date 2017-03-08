window.StoreFactoryPalette =
(function() {

    return function(config, store, palette) {

        return {

            state: {
                category: palette.categories()[0],
            },

            mutations: {

                'palette/category': (state, category) => {
                    state.category = category;
                },
            },

            getters: {
                palette: () => palette,
                produce: () => (path) => {
                    return palette.item(path, {
                        state: store.state,
                        commit: store.commit,
                        dispatch: store.dispatch,
                        getters: store.getters,
                    })
                }
            }
        }
    }

})();
