window.Viewer =
(function($, Vue, VueRouter, Core, Shell) {

    const Viewer = {};

    $(document).ready(function() {

        $('[data-vue-viewer]').each(function(index, element) {

            const data = $(element).data();

            Vue.use(window.ContextPlugin)

            const store = new window.StoreFactory()
            store.registerModule('settings', new window.StoreFactorySettings(data.config))
            store.registerModule('security', new window.StoreFactorySecurity(data.config))
            store.registerModule('portals', new window.StoreFactoryPortals(data.config))
            store.registerModule('modals', new window.StoreFactoryModals(data.config))
            store.registerModule('uploads', new window.StoreFactoryUploads(data.config))
            store.registerModule('viewer', new window.StoreFactoryViewer(data.config))
            store.registerModule('palette', new window.StoreFactoryPalette(data.config, window.Widgets.Palette))

            store.commit('security/principal', data.principal)
            store.commit('viewer/portal', data.model.portal)
            store.commit('viewer/content', data.model.content)

            const routes = [];

            for (let page of data.model.content.pages) {

                routes.push({
                    path: '/' + page.name,
                    component: Vue.component(`shell-loader-public-${page.id}`, {
                        mixins: [ Shell.LoaderPublic ]
                    }),
                    meta: {
                        auth: false,
                        private: false,
                        page: page,
                    }
                })
            }

            const router = new VueRouter({
                mode: 'history',
                base: `/view/${data.model.portal.id}/`,
                routes
            });

            new Vue({
                router,
                data,
                store,
            }).$mount($('[data-vue-body]', element).get(0));
        });
    });

    return Viewer;

})(jQuery, Vue, VueRouter, Core, Shell);
