window.Landing =
(function($, Vue) {

    const Landing = {};

    $(document).ready(function() {

        $('[data-vue-landing]').each(function(index, element) {

            const data = $(element).data();

            const store = new window.StoreFactory()
            store.registerModule('security', new window.StoreFactorySecurity())
            store.registerModule('portals', new window.StoreFactoryPortals())
            store.registerModule('modals', new window.StoreFactoryModals())

            store.commit('security/principal', data.principal)

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

                if (to.matched.some(record => record.meta.auth)) {

                    if (!store.state.security.principal) {

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
                store,
            }).$mount($('[data-vue-body]', element).get(0));
        });
    });

    return Landing;

})(jQuery, Vue);
