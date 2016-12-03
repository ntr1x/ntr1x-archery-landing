(function($, Vue, Core, Shell, Landing) {

    Landing.Header =
    Vue.component('landing-header', {
        template: '#landing-header',
        methods: {
            signout: function() {
                Vue.service('security').signout().then(
                    () => { this.$router.push({ path: '/' }); },
                    () => { }
                );
            }
        },
    });

})(jQuery, Vue, Core, Shell, Landing);
