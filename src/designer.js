window.Designer =
(function($, Vue, Core, Shell) {

    const Designer = {};

    $(document).ready(function() {

        $('[data-vue-designer]').each(function(index, element) {

            const data = $(element).data();

            // router.beforeEach((to, from, next) => {
            //
            //     if (to.matched.some(record => record.meta.requiresAuth)) {
            //
            //         if (!router.app.principal) {
            //
            //             next({
            //                 path: '/signin',
            //                 query: { redirect: to.fullPath },
            //             })
            //
            //             return
            //         }
            //     }
            //
            //     next()
            // });

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
                store: window.Store,
                created: function() {
                    Vue.service('security', Core.SecurityFactory(this));
                    Vue.service('portals', Core.PortalsFactory(this));
                },
            }).$mount($('[data-vue-body]', element).get(0));
        });
    });

    return Designer;

})(jQuery, Vue, Core, Shell);
