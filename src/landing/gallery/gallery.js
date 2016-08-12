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

            Vue.service('portals').load({
                params: {
                    published: 1,
                    limit: 3,
                }
            }).then(
                (d) => {
                    this.portals = d.data.portals;
                    console.log(this.portals);
                },
                (e) => {
                    console.log(e);
                }
            )
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

            Vue.service('portals').load({
                params: {
                    published: 1,
                }
            }).then(
                (d) => {
                    this.portals = d.data.portals;
                },
                (e) => {
                    console.log(e);
                }
            )
        }
    });

})(jQuery, Vue, Core, Shell, Landing);
