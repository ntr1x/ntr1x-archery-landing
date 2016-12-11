window.StoreFactoryDesigner =
(function($, Vue, Core) {

    return function() {

        return {

            state: {
                portal: null,
                pages: null,
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

                'designer/pages': (state, pages) => {
                    state.pages = pages;
                    state.page = pages[0];
                },

                'designer/scale': (state, scale) => {
                    state.scale = scale;
                },

                'designer/pages/select': (state, page) => { state.page = page; },
                'designer/pages/create': (state, page) => { Core.Collection(state, 'pages').create(page) },
                'designer/pages/update': (state, page) => { Core.Collection(state, 'pages').update(page) },
                'designer/pages/remove': (state, page) => { Core.Collection(state, 'pages').remove(page) },

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
            },

            actions: {

                'designer/leftToggle': ({ state }) => {
                    state.leftOpen = !state.leftOpen;
                },

                'designer/rightToggle': ({ state }) => {
                    state.rightOpen = !state.rightOpen;
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
