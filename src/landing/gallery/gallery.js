(function($, Vue, Core, Shell, Landing) {

    Landing.Gallery =
    Vue.component('landing-gallery', {
        template: '#landing-gallery',
        data: function() {
            return {
                portals: this.portals,
            }
        },
        // created: function() {
        //
        //     this.portals = [];
        //     this.$store.dispatch('portals/shared', { size: 3 });
        // }
    });

    Landing.GalleryFull =
    Vue.component('landing-gallery-full', {
        template: '#landing-gallery-full',
        data: function() {
            return {
                portals: this.portals,
            }
        },
        created: function() {

            this.portals = [];
            this.$store
                .dispatch('portals/shared', {
                    size: 1000
                })
                .then(
                    (d) => { this.portals = d.data; },
                    () => {}
                )
            ;
        }
    });

})(jQuery, Vue, Core, Shell, Landing);
