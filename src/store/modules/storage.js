window.StoreFactoryStorage =
(function() {

    return function() {

        return {

            state: {
                storage: {},
                sources: {},
            },

            getters: {
                storage: (state) => state.storage,
                sources: (state) => state.sources,
            },

            mutations: {

                'storage/init': (state, storage) => {
                    Object.assign(state.storage, storage)
                },

                'storage/store': (state, { name, value }) => {
                    if (typeof value !== 'undefined') {
                        state.storage[name] = value;
                    } else {
                        delete state.storage[name];
                    }
                },

                'storage/value': (state, { parent, property, value }) => {
                    if (parent != null) {
                        if (typeof value !== 'undefined') {
                            parent[property] = value;
                        } else {
                            delete parent[property];
                        }
                    }
                },

                'sources/init': (state, sources) => {
                    Object.assign(state.sources, sources)
                },

                'sources/store': (state, { name, value }) => {
                    if (typeof value !== 'undefined') {
                        state.sources[name] = value;
                    } else {
                        delete state.sources[name];
                    }
                },
            },

            actions: {

                'storage/store': ({ state, commit }, data) => {
                    commit('storage/store', data)
                },

                'sources/store': ({ state, commit }, data) => {
                    commit('sources/store', data)
                }
            }
        }
    }

})();
