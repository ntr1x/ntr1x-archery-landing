(function($, Vue, Core, Shell, Landing) {

    Landing.Header =
    Vue.component('landing-header', {
        template: '#landing-header',
        methods: {

            signout: function() {

                this.$store
                    .dispatch('security/signout')
                    .then(
                        () => { this.$router.push({ path: '/' }) },
                        () => {}
                    )
                ;
            }
        },
    });

})(jQuery, Vue, Core, Shell, Landing);
