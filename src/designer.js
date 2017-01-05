window.Designer =
(function($, Vue, Core, Shell) {

    const Designer = {};

    $(document).ready(function() {

        $('[data-vue-designer]').each(function(index, element) {

            const data = $(element).data()

            Vue.use(window.ContextPlugin)

            const store = new window.StoreFactory()
            store.registerModule('settings', new window.StoreFactorySettings(data.config))
            store.registerModule('security', new window.StoreFactorySecurity(data.config))
            store.registerModule('portals', new window.StoreFactoryPortals(data.config))
            store.registerModule('modals', new window.StoreFactoryModals(data.config))
            store.registerModule('uploads', new window.StoreFactoryUploads(data.config))
            store.registerModule('designer', new window.StoreFactoryDesigner(data.config))
            store.registerModule('palette', new window.StoreFactoryPalette(data.config, window.Widgets.Palette))

            let content = data.model.content = data.model.content || {}

            if (!content.pages || !content.pages.length) {
                content.pages = [
                    {
                        type: 'page',
                        name: '',
                        root: {
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

            store.commit('security/principal', data.principal)
            store.commit('designer/portal', data.model.portal)
            store.commit('designer/content', content)

            const routes = [
                {
                    path: '/',
                    component: Shell.LoaderPrivate,
                    meta: {
                        auth: true,
                        private: true,
                    },
                },
                {
                    path: '/:page',
                    component: Shell.LoaderPrivate,
                    meta: {
                        auth: true,
                        private: true,
                    },
                },
            ];

            const router = new VueRouter({
                mode: 'history',
                base: `/edit/${data.model.portal.id}/`,
                routes,
            });

            // function createRoute(page) {
            //     return {
            //         component: Shell.ShellPublic.extend({
            //             data: function() {
            //                 return {
            //                     page: page,
            //                 };
            //             }
            //         }),
            //     };
            // }
            //
            // if (data.model) {
            //     for (var i = 0; i < data.model.pages.length; i++) {
            //
            //         var page = data.model.pages[i];
            //         routes[page.name] = createRoute(page);
            //     }
            // }

            new Vue({
                router,
                data,
                store,
            }).$mount($('[data-vue-body]', element).get(0));
        });
    });

    return Designer;

})(jQuery, Vue, Core, Shell);
