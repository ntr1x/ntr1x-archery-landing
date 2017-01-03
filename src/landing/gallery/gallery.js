(function($, Vue, Core, Shell, Landing) {

    Landing.Gallery =
    Vue.component('landing-gallery', {
        template: '#landing-gallery',
        data: function() {
            return {
                portals: this.portals,
            }
        },
        created: function() {

            this.portals = [];
            this.$store
                .dispatch('portals/shared', {
                    size: 3
                })
                .then(
                    (d) => { this.portals = d.data.portals; },
                    () => {}
                )
            ;
        }
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
                .dispatch('portals/shared')
                .then(
                    (d) => { this.portals = d.data.portals; },
                    () => {}
                )
            ;
        }
    });

})(jQuery, Vue, Core, Shell, Landing);
