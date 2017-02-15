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
                            parent[property != null ? property : 'value'] = value;
                        } else {
                            delete parent[property != null ? property : 'value'];
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

                'storage/value': ({ state, commit }, data) => {
                    commit('storage/value', data)
                },

                'sources/store': ({ state, commit }, data) => {
                    commit('sources/store', data)
                }
            }
        }
    }

})();
