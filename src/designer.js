window.Designer =
(function($, Vue, Core, Shell) {

    const Designer = {};

    $(document).ready(function() {

        $('[data-vue-designer]').each(function(index, element) {

            const data = $(element).data()

            Vue.use(window.ContextPlugin)

            const store = new window.StoreFactory()
            store.registerModule('security', new window.StoreFactorySecurity())
            store.registerModule('portals', new window.StoreFactoryPortals())
            store.registerModule('modals', new window.StoreFactoryModals())
            store.registerModule('designer', new window.StoreFactoryDesigner())
            store.registerModule('palette', new window.StoreFactoryPalette(window.Widgets.Palette))

            store.commit('security/principal', data.principal)
            store.commit('designer/portal', data.portal)
            store.commit('designer/pages', data.pages)

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
                base: `/edit/${data.portal.id}/`,
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
