window.StoreFactoryDesigner =
(function($, Vue, Core) {

    return function({ endpoint }) {

        return {

            state: {

                portal: null,
                content: null,
                viewport: null,

                scale: 1.0,
                left: {
                    open: true,
                    panel: 'palette'
                },
                right: {
                    open: true,
                    panel: 'structure'
                },
                bottom: {
                    open: false,
                    panel: 'console'
                },

                page: null,
                storage: null,
                source: null,

                container: {
                    uuid: null
                },

                log: {
                    messages: [
                        { group: 'runtime', type: 'error', message: 'Cannot evaluate expression', time: '14:30:12.123' },
                        { group: 'runtime', type: 'error', message: 'Cannot evaluate expression', time: '14:30:12.123' },
                        { group: 'runtime', type: 'error', message: 'Cannot evaluate expression', time: '14:30:12.123' },
                        { group: 'runtime', type: 'error', message: 'Cannot evaluate expression', time: '14:30:12.123' },
                        { group: 'runtime', type: 'error', message: 'Cannot evaluate expression', time: '14:30:12.123' },
                        { group: 'runtime', type: 'error', message: 'Cannot evaluate expression', time: '14:30:12.123' },
                        { group: 'runtime', type: 'error', message: 'Cannot evaluate expression', time: '14:30:12.123' },
                        { group: 'runtime', type: 'error', message: 'Cannot evaluate expression', time: '14:30:12.123' },
                    ],
                    limit: 100,
                },
            },

            getters: {
                content: (state) => state.content,
                portal: (state) => state.portal,
            },

            mutations: {

                'console/log': (state, message) => {

                    if (message.trace) {
                        message.trace(console);
                    }

                    state.log.messages.push({
                        group: message.group == null ? 'general' : message.group,
                        type: message.type == null ? 'error' : message.type,
                        message: message.message == null ? 'Undefined error' : message.message,
                        time: new Date().toLocaleTimeString(),
                    })

                    if(state.log.messages.length >= state.log.limit) {
                        state.log.messages.splice(0, state.log.messages.length - state.log.limit + 1)
                    }
                },

                'console/clear': (state) => {
                    state.log.messages = []
                },

                'designer/portal': (state, portal) => {
                    state.portal = portal;
                },

                'designer/viewport': (state, viewport) => {
                    state.viewport = viewport;
                },

                'designer/viewport/rotate': (state) => {
                    if (state.viewport) {
                        state.viewport.landscape = !state.viewport.landscape
                    }
                },

                'designer/content': (state, content) => {
                    state.container.uuid = Core.UUID.random()
                    state.content = content;
                    state.page = (content.pages != null && content.pages.length) ? content.pages[0] : null;
                },

                'designer/scale': (state, scale) => {
                    state.scale = scale;
                },

                'designer/leftToggle': (state, panel) => {
                    if (!state.left.open) {
                        state.left.panel = panel
                        state.left.open = true
                    } else  {
                        if (state.left.panel == panel) {
                            state.left.open = false
                        } else {
                            state.left.panel = panel
                        }
                    }
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

                'designer/bottomToggle': (state, panel) => {
                    if (!state.bottom.open) {
                        state.bottom.panel = panel
                        state.bottom.open = true
                    } else  {
                        if (state.bottom.panel == panel) {
                            state.bottom.open = false
                        } else {
                            state.bottom.panel = panel
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

                'designer/params/update': (state, { model, value }) => { Object.assign(model, value, { uuid: Core.UUID.random() }) },
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

                    return Promise.all([

                        (() => {

                            if (!c.pages || !c.pages.length) {

                                return getters
                                    .produce('default-container/default-container-stack/stack-canvas')
                                    .then(root => {
                                        c.pages = [
                                            {
                                                uuid: Core.UUID.random(),
                                                root: root,
                                                type: 'page',
                                                name: '',
                                                sources: [],
                                                storages: [],
                                            }
                                        ]
                                    })
                                    .catch(() => {})
                            }

                            return Promise.resolve()

                        })(),

                        (() => {

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

                            return Promise.resolve()
                        })(),

                        (() => {

                            if (!c.files || !c.files.length) {

                                c.files = [
                                    {
                                        uuid: Core.UUID.random(),
                                        name: 'documents',
                                        title: 'Documents',
                                    },
                                    {
                                        uuid: Core.UUID.random(),
                                        name: 'archives',
                                        title: 'Archives',
                                    },
                                ]
                            }

                            return Promise.resolve()
                        })()

                    ])
                    .then(() => {
                        return c
                    })
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
