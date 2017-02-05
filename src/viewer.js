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
            store.registerModule('modals', new window.StoreFactoryModals(data.config))
            store.registerModule('uploads', new window.StoreFactoryUploads(data.config))
            store.registerModule('viewer', new window.StoreFactoryViewer(data.config))
            store.registerModule('palette', new window.StoreFactoryPalette(data.config, window.Widgets.Palette))
            store.registerModule('actions', new window.StoreFactoryActions(data.config))
            store.registerModule('storage', new window.StoreFactoryStorage(data.config))

            store.commit('security/principal', data.context.principal)
            store.commit('viewer/portal', data.context.portal)
            store.commit('viewer/content', data.context.content)

            const routes = [];

            for (let page of data.context.content.pages) {

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

            console.log(routes)

            const router = new VueRouter({
                mode: 'history',
                base: data.root,
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
