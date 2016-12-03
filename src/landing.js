window.Landing =
(function($, Vue, Core) {

    const Landing = {};

    $(document).ready(function() {

        $('[data-vue-landing]').each(function(index, element) {

            const data = $(element).data();

            const routes = [
                {
                    path: '/',
                    component: Landing.LandingPage,
                },
                {
                    path: '/gallery',
                    component: Landing.LandingGalleryPage,
                },
                {
                    path: '/storage',
                    component: Landing.LandingStoragePage,
                },
                {
                    path: '/signin',
                    component: Landing.LandingSigninPage,
                },
                {
                    path: '/signup',
                    component: Landing.LandingSignupPage,
                },
                {
                    path: '/manage',
                    component: Landing.LandingManagePage,
                    meta: {
                        auth: true,
                    }
                },
                {
                    path: '/manage/create',
                    component: Landing.LandingManageCreatePage,
                    meta: {
                        auth: true,
                    }
                },
                {
                    path: '/manage/i/:portal/clone',
                    component: Landing.LandingManageClonePage,
                    meta: {
                        auth: true,
                    }
                },
                {
                    path: '/manage/i/:portal/publish',
                    component: Landing.LandingManagePublishPage,
                    meta: {
                        auth: true,
                    }
                },
            ];

            const router = new VueRouter({
                mode: 'history',
                routes
            })

            router.beforeEach((to, from, next) => {

                if (to.matched.some(record => record.meta.requiresAuth)) {

                    if (!router.app.principal) {

                        next({
                            path: '/signin',
                            query: { redirect: to.fullPath },
                        })

                        return
                    }
                }

                next()
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

    return Landing;

})(jQuery, Vue, Core);
