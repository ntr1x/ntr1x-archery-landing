window.Landing =
(function($, Vue) {

    const Landing = {};

    const endpoint = 'http://api.storage.tp.ntr1x.com';

    $(document).ready(function() {

        $('[data-vue-landing]').each(function(index, element) {

            const data = $(element).data();

            const store = new window.StoreFactory()
            store.registerModule('settings', new window.StoreFactorySettings(data.config))
            store.registerModule('security', new window.StoreFactorySecurity(data.config))
            store.registerModule('portals', new window.StoreFactoryPortals(data.config))
            store.registerModule('domains', new window.StoreFactoryDomains(data.config))
            store.registerModule('modals', new window.StoreFactoryModals(data.config))
            store.registerModule('uploads', new window.StoreFactoryUploads(data.config))

            store.commit('security/principal', data.principal)
            store.commit('portals/shared', data.shared)

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
                    path: '/manage/domain',
                    component: Landing.LandingManageDomainPage,
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
                    path: '/manage/i/:portal/details',
                    component: Landing.LandingManageDetailsPage,
                    meta: {
                        auth: true,
                    }
                },
                {
                    path: '/manage/i/:portal/mail',
                    component: Landing.LandingManageMailPage,
                    meta: {
                        auth: true,
                    }
                },
                {
                    path: '/manage/i/:portal/router',
                    component: Landing.LandingManageRouterPage,
                    meta: {
                        auth: true,
                    }
                },
                {
                    path: '/manage/i/:portal/meta',
                    component: Landing.LandingManageMetaPage,
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

                    if (!store.state.security.principal.user) {

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
