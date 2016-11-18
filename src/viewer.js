window.Viewer =
(function($, Vue, VueRouter, Core, Shell) {

    var Viewer = {};

    $(document).ready(function() {

        $('[data-vue-viewer]').each(function(index, element) {

            var data = $(element).data();

            var App = Vue.extend({
                data: function() {
                    return data;
                },
                created: function() {

                    Vue.service('security', Core.SecurityFactory(this));
                    Vue.service('portals', Core.PortalsFactory(this));
                },
            });

            var router = new VueRouter({
                history: true,
                root: `/view/${data.portal.id}/`
            });

            var routes = {};

            for (let page of data.pages) {
                routes[page.name || '/'] = {
                    component: Vue.component(`shell-loader-public-${page.id}`, {
                        mixins: [ Shell.LoaderPublic ]
                    }),
                    auth: false,
                    private: false,
                    page: page,
                }
            }

            router.map(routes);

            router.start(App, $('[data-vue-body]', element).get(0));
        });
    });

    return Viewer;

})(jQuery, Vue, VueRouter, Core, Shell);
