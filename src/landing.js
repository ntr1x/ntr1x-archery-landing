window.Landing =
(function($, Vue) {

    const Landing = {};

    $(document).ready(function() {

        $('[data-vue-landing]').each(function(index, element) {

            const data = $(element).data();

            const store = new window.StoreFactory()
            store.registerModule('settings', new window.StoreFactorySettings(data.config))
            store.registerModule('security', new window.StoreFactorySecurity(data.config))
            store.registerModule('portals', new window.StoreFactoryPortals(data.config))
            store.registerModule('domains', new window.StoreFactoryDomains(data.config))
            store.registerModule('templates', new window.StoreFactoryTemplates(data.config))
            store.registerModule('modals', new window.StoreFactoryModals(data.config))
            store.registerModule('uploads', new window.StoreFactoryUploads(data.config))
            store.registerModule('landing', new window.StoreFactoryLanding(data.config))

            store.commit('security/principal', data.principal)
            store.commit('portals/shared', data.shared)
            store.commit('landing/offers', data.offers)

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
                    path: '/donate',
                    component: Landing.LandingDonatePage,
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
                    path: '/signup/alert',
                    component: Landing.LandingSignupAlert,
                },
                {
                    path: '/signup/success',
                    component: Landing.LandingSignupSuccess,
                },
                {
                    path: '/recover',
                    component: Landing.LandingRecoverPage,
                },
                {
                    path: '/recover/alert',
                    component: Landing.LandingRecoverAlert,
                },
                {
                    path: '/recover/passwd/:token',
                    component: Landing.LandingRecoverPasswdPage,
                },
                {
                    path: '/recover/success',
                    component: Landing.LandingRecoverSuccess,
                },
                {
                    path: '/profile',
                    component: Landing.LandingProfilePage,
                    meta: { auth: true }
                },
                {
                    path: '/profile/success',
                    component: Landing.LandingProfileSuccess,
                    meta: { auth: true }
                },
                {
                    path: '/profile/email/alert',
                    component: Landing.LandingProfileEmailAlert,
                    meta: { auth: true }
                },
                {
                    path: '/profile/email/success',
                    component: Landing.LandingProfileEmailSuccess,
                    meta: { auth: true }
                },
                {
                    path: '/profile/passwd/success',
                    component: Landing.LandingProfilePasswdSuccess,
                    meta: { auth: true }
                },
                {
                    path: '/manage',
                    component: Landing.LandingManagePage,
                    meta: { auth: true }
                },
                {
                    path: '/manage/create',
                    component: Landing.LandingManageCreatePage,
                    meta: { auth: true }
                },
                {
                    path: '/manage/i/:portal/domains',
                    component: Landing.LandingManageDomainsPage,
                    meta: { auth: true }
                },
                {
                    path: '/manage/i/:portal/domains/create',
                    component: Landing.LandingManageDomainsCreatePage,
                    meta: { auth: true }
                },
                {
                    path: '/manage/i/:portal/domains/i/:domain',
                    component: Landing.LandingManageDomainsUpdatePage,
                    meta: { auth: true }
                },
                {
                    path: '/manage/i/:portal/clone',
                    component: Landing.LandingManageClonePage,
                    meta: { auth: true }
                },
                {
                    path: '/manage/i/:portal',
                    component: Landing.LandingManageDetailsPage,
                    meta: { auth: true }
                },
                {
                    path: '/manage/i/:portal/mail',
                    component: Landing.LandingManageMailPage,
                    meta: { auth: true }
                },
                {
                    path: '/manage/i/:portal/router',
                    component: Landing.LandingManageRouterPage,
                    meta: { auth: true }
                },
                {
                    path: '/manage/i/:portal/meta',
                    component: Landing.LandingManageMetaPage,
                    meta: { auth: true }
                },
                {
                    path: '/manage/i/:portal/templates',
                    component: Landing.LandingManageTemplatesPage,
                    meta: { auth: true }
                },
                {
                    path: '/manage/i/:portal/templates/create',
                    component: Landing.LandingManageTemplatesCreatePage,
                    meta: { auth: true }
                },
                {
                    path: '/manage/i/:portal/templates/i/:template',
                    component: Landing.LandingManageTemplatesUpdatePage,
                    meta: { auth: true }
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
