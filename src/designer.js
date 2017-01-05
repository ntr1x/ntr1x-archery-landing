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

            store.commit('security/principal', data.principal)
            store.commit('designer/portal', data.model.portal)

            store
                .dispatch('designer/setup', data.model.content)
                .then(
                    (content) => { store.commit('designer/content', content) },
                    () => {}
                )

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

            new Vue({
                router,
                data,
                store,
            }).$mount($('[data-vue-body]', element).get(0));
        });
    });

    return Designer;

})(jQuery, Vue, Core, Shell);
