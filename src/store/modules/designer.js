window.StoreFactoryDesigner =
(function($, Vue, Core) {

    return function({ endpoint }) {

        return {

            state: {

                portal: null,
                content: null,

                scale: 1.0,
                leftOpen: true,
                rightOpen: true,

                page: null,
                storage: null,
                source: null,
            },

            mutations: {

                'designer/portal': (state, portal) => {
                    state.portal = portal;
                },

                'designer/content': (state, content) => {
                    state.content = content;
                    state.page = content.pages[0];
                },

                'designer/scale': (state, scale) => {
                    state.scale = scale;
                },

                'designer/leftToggle': (state) => {
                    state.leftOpen = !state.leftOpen;
                },

                'designer/rightToggle': (state) => {
                    state.rightOpen = !state.rightOpen;
                },

                'designer/pages/select': (state, page) => { state.page = page; },
                'designer/pages/create': (state, page) => { Core.Collection(state.content, 'pages').create(page) },
                'designer/pages/update': (state, page) => { Core.Collection(state.content, 'pages').update(page) },
                'designer/pages/remove': (state, page) => { Core.Collection(state.content, 'pages').remove(page) },

                'designer/storages/select': (state, storage) => { state.storage = storage; },
                'designer/storages/create': (state, storage) => { Core.Collection(state.page, 'storages').create(storage) },
                'designer/storages/update': (state, storage) => { Core.Collection(state.page, 'storages').update(storage) },
                'designer/storages/remove': (state, storage) => { Core.Collection(state.page, 'storages').remove(storage) },

                'designer/sources/select': (state, source) => { state.source = source; },
                'designer/sources/create': (state, source) => { Core.Collection(state.page, 'sources').create(source) },
                'designer/sources/update': (state, source) => { Core.Collection(state.page, 'sources').update(source) },
                'designer/sources/remove': (state, source) => { Core.Collection(state.page, 'sources').remove(source) },

                'designer/widgets/create': (state, { parent, widget }) => { Core.Collection(parent, 'widgets').create(widget) },
                'designer/widgets/update': (state, { parent, widget }) => { Core.Collection(parent, 'widgets').update(widget) },
                'designer/widgets/insert': (state, { parent, widget, index }) => { Core.Collection(parent, 'widgets').insert(widget, index); },
                'designer/widgets/remove': (state, { parent, widget }) => { Core.Collection(parent, 'widgets').remove(widget) },

                'designer/params/update': (state, { model, value }) => { Object.assign(model, value) },
                'designer/property/update': (state, { parent, value, property }) => { parent[property] = value },

                'designer/items/create': (state, { parent, item, property }) => { Core.Collection(parent, property || 'items').create(item) },
                'designer/items/update': (state, { parent, item, property }) => { Core.Collection(parent, property || 'items').update(item) },
                'designer/items/insert': (state, { parent, item, property, index }) => { Core.Collection(parent, property || 'items').insert(item, index) },
                'designer/items/remove': (state, { parent, item, property }) => { Core.Collection(parent, property || 'items').remove(item) },

                'designer/array/create': (state, { parent, item, property }) => { Core.Array(parent, property || 'items').create(item) },
                'designer/array/update': (state, { parent, item, property, index }) => { Core.Array(parent, property || 'items').update(item, index) },
                'designer/array/insert': (state, { parent, item, property, index }) => { Core.Array(parent, property || 'items').insert(item, index) },
                'designer/array/remove': (state, { parent, property, index }) => { Core.Array(parent, property || 'items').remove(index) },
            },

            actions: {

                'designer/setup': ({ state }, content) =>  {

                    let c = JSON.parse(JSON.stringify(content || {}))

                    if (!c.pages || !c.pages.length) {
                        c.pages = [
                            {
                                uuid: Math.random().toString(36).substr(2, 9),
                                type: 'page',
                                name: '',
                                root: {
                                    uuid: Math.random().toString(36).substr(2, 9),
                                    name: 'default-container/default-container-stack/default-stack-canvas',
                                    widgets: [],
                                    params: {
                                        width: { value: null },
                                        height: { value: null }
                                    }
                                },
                                sources: [],
                                storages: [],
                            }
                        ]
                    }

                    return Promise.resolve(c);
                },

                'designer/push': ({ commit, dispatch, state, rootState }) => {

                    return Vue.http.put(`${endpoint}/portals/i/${state.portal.id}/push`, { content: state.content }, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token
                        })
                    })
                    .then(
                        (d) => {
                            dispatch('designer/setup', d.data).then(
                                (d) => { commit('designer/content', d.content) },
                                () => { /* ignore */ }
                            )
                        },
                        () => {/* ignore */ }
                    )
                },

                'designer/pull': ({ commit, dispatch, state, rootState }) => {

                    return Vue.http.get(`${endpoint}/portals/i/${state.portal.id}/pull`, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token
                        })
                    })
                    .then(
                        (d) => {
                            dispatch('designer/setup', d.data).then(
                                (d) => { commit('designer/content', d) },
                                () => { /* ignore */ }
                            )
                        },
                        () => { /* ignore */ }
                    )
                },

                'designer/zoom': ({ commit, state }, scale) => {
                    commit('designer/scale', scale);
                },

                'designer/zoomIn': ({ commit, state }) => {
                    // $('.ge.ge-page', this.$el).css('transform', 'scale(' + this.scale + ')');
                    commit('designer/scale', state.scale + 0.1);
                    // Vue.nextTick(() => {
                    //     $('.ge.ge-container', this.$el).perfectScrollbar('update');
                    // })
                },

                'designer/zoomOut': ({ commit, state }) => {
                    // $('.ge.ge-page', this.$el).css('transform', 'scale(' + this.scale + ')');
                    commit('designer/scale', state.scale - 0.1);
                    // Vue.nextTick(() => {
                    //     $('.ge.ge-container', this.$el).perfectScrollbar('update');
                    // })
                },
            }
        }
    }

})(jQuery, Vue, Core);
