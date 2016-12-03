window.Viewer =
(function($, Vue, VueRouter, Core, Shell) {

    const Viewer = {};

    $(document).ready(function() {

        $('[data-vue-viewer]').each(function(index, element) {

            const data = $(element).data();

            const routes = [];

            for (let page of data.pages) {

                routes.push({
                    path: page.name,
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
                created: function() {

                    Vue.service('security', Core.SecurityFactory(this));
                    Vue.service('portals', Core.PortalsFactory(this));
                },
            }).$mount($('[data-vue-body]', element).get(0));
        });
    });

    return Viewer;

})(jQuery, Vue, VueRouter, Core, Shell);
