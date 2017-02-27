window.StoreFactoryViewer =
(function() {

    return function() {

        return {

            state: {
                portal: null,
                content: null,
            },

            getters: {
                content: (state) => state.content,
                portal: (state) => state.portal,
            },

            mutations: {

                'console/log': () => { /* ignore */ },
                'console/clear': () => { /* ignore */ },

                'viewer/portal': (state, portal) => {
                    state.portal = portal;
                },

                'viewer/content': (state, content) => {
                    state.content = content;
                },
            },

            actions: {
            }
        }
    }

})();
