// (function($, Vue, Core, Shell) {
//
//     Core.FrameFactory =
//     function(element, data) {
//
//         var Frame = Vue.extend({
//             data: function() {
//                 return data;
//             },
//             created: function() {
//
//                 Vue.service('security', Core.SecurityFactory(this));
//                 Vue.service('portals', Core.PortalsFactory(this));
//             },
//         });
//
//         var router = new VueRouter({
//             abstract: true,
//             // root: `/view/${data.portal.id}/`
//         });
//
//         var routes = {};
//
//         for (let page of data.pages) {
//             routes[page.name || '/'] = {
//                 component: Vue.component(`shell-loader-frame-${page.id}`, {
//                     mixins: [ Shell.LoaderFrame ],
//                 }),
//                 auth: false,
//                 private: false,
//                 page: page,
//             }
//         }
//         router.map(routes);
//
//         router.start(Frame, element.get(0));
//
//         return router;
//     };
//
// })(jQuery, Vue, Core, Shell);
