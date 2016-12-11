window.Viewer =
(function($, Vue, VueRouter, Core, Shell) {

    const Viewer = {};

    $(document).ready(function() {

        $('[data-vue-viewer]').each(function(index, element) {

            const data = $(element).data();

            const store = new window.StoreFactory()
            store.registerModule('security', new window.StoreFactorySecurity())
            store.registerModule('portals', new window.StoreFactoryPortals())
            store.registerModule('modals', new window.StoreFactoryModals())
            store.registerModule('viewer', new window.StoreFactoryViewer())

            store.commit('security/principal', data.principal)
            store.commit('viewer/portal', data.portal)
            store.commit('viewer/pages', data.pages)

            const routes = [];

            for (let page of data.pages) {

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
                base: `/view/${data.portal.id}/`,
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
