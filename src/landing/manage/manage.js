(function($, Vue, Core, Shell, Landing) {

    Landing.Manage =
    Vue.component('landing-manage', {

        template: '#landing-manage',
        data: function() {
            return {
                url: window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: ''),
                portals: this.portals,
            };
        },
        created: function() {
            this.refresh();
        },
        methods: {

            refresh: function() {
                Vue.service('portals').load().then(
                    (d) => { this.$set('portals', d.data.portals); },
                    (e) => { this.$set('portals', []); }
                );
            },

            remove: function(id) {
                Vue.service('portals').remove({
                    id: id,
                })
                .then(
                    (d) => { this.refresh(); },
                    (e) => { }
                );
            },
        }
    });

    Landing.ManageCreate =
    Vue.component('landing-manage-create', {
        template: '#landing-manage-create',
        data: function() {
            return {
                form: this.form,
            }
        },
        created: function() {
            this.$set('form', {
                title: null,
            });
        },
        methods: {

            create: function() {
                Vue.service('portals').create({
                    title: this.form.title,
                })
                .then(
                    (d) => { this.$router.go('/manage')},
                    (e) => { }
                );
            },
        }
    });

    Landing.ManagePublish =
    Vue.component('landing-manage-publish', {
        template: '#landing-manage-publish',
        data: function() {
            return {
                form: this.form,
                image: this.image,
                file: this.file,
            }
        },
        created: function() {

            this.file = null;
            this.image = null;

            this.$set('form', {
                title: null,
            });
        },
        attached: function() {

            $('input[type="file"]').on('change', (e) => {

                this.file = e.target.files[0];

                var reader = new FileReader();
                reader.onload = (e) => {
                    this.image = e.target.result;
                }
                reader.readAsDataURL(this.file);
            });
        },
        methods: {

            publish: function() {

                Vue.service('portals').publish({
                    title: this.form.title,
                    portal: this.$route.params.portal,
                    thumbnail: this.file,
                })
                .then(
                    (d) => { console.log(d); this.$router.go('/manage'); },
                    (e) => { console.log(e); }
                );
            },
        }
    });

})(jQuery, Vue, Core, Shell, Landing);
