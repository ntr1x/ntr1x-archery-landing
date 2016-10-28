window.Viewer =
(function($, Vue, Core, Shell) {

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

            router.beforeEach(function(transition) {

                if (transition.to.auth && !router.app.principal) {
                    transition.abort();
                } else if (transition.to.anon && router.app.principal) {
                    transition.abort();
                } else {
                    transition.next();
                }
            });

            var routes = {
                '/': {
                    component: Shell.LoaderPublic,
                    auth: true,
                    // private: true,
                    mode: 'public',
                },
                '/:page': {
                    component: Shell.LoaderPublic,
                    auth: true,
                    // private: true,
                    mode: 'public',
                },
            };

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

            router.map(routes);

            router.start(App, $('[data-vue-body]', element).get(0));
        });
    });

    return Viewer;

})(jQuery, Vue, Core, Shell);
