window.StoreFactoryDesigner =
(function($, Vue, Core) {

    return function({ endpoint }) {

        return {

            state: {

                portal: null,
                content: null,

                scale: 1.0,
                leftOpen: true,
                right: {
                    open: true,
                    panel: 'structure'
                },

                page: null,
                storage: null,
                source: null,
            },

            getters: {
                content: (state) => state.content,
                portal: (state) => state.portal,
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

                'designer/rightToggle': (state, panel) => {
                    if (!state.right.open) {
                        state.right.panel = panel
                        state.right.open = true
                    } else  {
                        if (state.right.panel == panel) {
                            state.right.open = false
                        } else {
                            state.right.panel = panel
                        }
                    }
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
                'designer/widgets/clear': (state, { parent }) => { Core.Collection(parent, 'widgets').clear() },

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

                'designer/setup': ({ state, getters }, content) =>  {

                    let c = JSON.parse(JSON.stringify(content || {}))

                    if (!c.pages || !c.pages.length) {

                        let root = getters.palette.item('default-container/default-container-stack/stack-canvas');

                        let page = {
                            root: root,
                            type: 'page',
                            name: '',
                            sources: [],
                            storages: [],
                        };

                        c.pages = [
                            page
                        ]
                    }

                    if (!c.images || !c.images.length) {
                        c.images = [
                            {
                                uuid: Core.UUID.random(),
                                name: '1920xAuto',
                                title: '1920 x auto',
                                items: [
                                    { name: 'thumbnail', format: 'png', type: 'COVER', width: 120, height: 60 },
                                    { name: 'image', format: 'jpg', type: 'COVER', width: 1920, height: null },
                                ]
                            },
                            {
                                uuid: Core.UUID.random(),
                                name: '1280xAuto',
                                title: '1280 x auto',
                                items: [
                                    { name: 'thumbnail', format: 'png', type: 'COVER', width: 120, height: 60 },
                                    { name: 'image', format: 'jpg', type: 'COVER', width: 1280, height: null },
                                ]
                            },
                            {
                                uuid: Core.UUID.random(),
                                name: '640xAuto',
                                title: '640 x auto',
                                items: [
                                    { name: 'thumbnail', format: 'png', type: 'COVER', width: 120, height: 60 },
                                    { name: 'image', format: 'jpg', type: 'COVER', width: 640, height: null },
                                ]
                            },
                            {
                                uuid: Core.UUID.random(),
                                name: '256x256',
                                title: '256 x 256',
                                items: [
                                    { name: 'thumbnail', format: 'png', type: 'COVER', width: 120, height: 60 },
                                    { name: 'image', format: 'png', type: 'COVER', width: 256, height: 256 },
                                ]
                            },
                            {
                                uuid: Core.UUID.random(),
                                name: '64x64',
                                title: '64 x 64',
                                items: [
                                    { name: 'thumbnail', format: 'png', type: 'COVER', width: 120, height: 60 },
                                    { name: 'image', format: 'png', type: 'COVER', width: 64, height: 64 },
                                ]
                            },
                        ]
                    }

                    return Promise.resolve(c);
                },

                'designer/push': ({ commit, dispatch, state, rootState }) => {

                    return Vue.http.put(`${endpoint}/archery/portals/i/${state.portal.id}/push`, { content: state.content }, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token,
                            'X-Client-Host': 'archery.ntr1x.com'
                        })
                    })
                    .then(
                        (d) => {

                            let uuid = state.page.uuid

                            dispatch('designer/setup', d.data).then(
                                (d) => {

                                    commit('designer/content', d.content)

                                    for (let p of d.content.pages) {
                                        if (p.uuid == uuid) {
                                            commit('designer/pages/select', p)
                                            break
                                        }
                                    }
                                },
                                () => { /* ignore */ }
                            )
                        },
                        () => {/* ignore */ }
                    )
                },

                'designer/pull': ({ commit, dispatch, state, rootState }) => {

                    return Vue.http.get(`${endpoint}/archery/portals/i/${state.portal.id}/pull`, {
                        headers: $.extend({}, {
                            Authorization: rootState.security.principal.token,
                            'X-Client-Host': 'archery.ntr1x.com'
                        })
                    })
                    .then(
                        (d) => {

                            let uuid = state.page.uuid

                            dispatch('designer/setup', d.data).then(
                                (d) => {

                                    commit('designer/content', d.content)

                                    for (let p of d.content.pages) {
                                        if (p.uuid == uuid) {
                                            commit('designer/pages/select', p)
                                            break
                                        }
                                    }
                                },
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
