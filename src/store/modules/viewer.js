window.StoreFactoryViewer =
(function() {

    return function() {

        return {

            state: {
                portal: null,
                pages: null,
            },

            mutations: {

                'viewer/portal': (state, portal) => {
                    state.portal = portal;
                },

                'viewer/pages': (state, pages) => {
                    state.pages = pages;
                },
            },

            actions: {
            }
        }
    }

})();
