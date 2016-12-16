window.StoreFactoryPalette =
(function() {

    return function(palette) {

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
            }
        }
    }

})();
