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
                this.portals = [];
                Vue.service('portals').load().then(
                    (d) => { this.portals = d.data.portals; },
                    () => { this.portals = []; }
                );
            },

            remove: function(id) {
                Vue.service('portals').remove({
                    id: id,
                })
                .then(
                    () => { this.refresh(); },
                    () => { }
                );
            },

            unpublish: function(id) {
                Vue.service('portals').unpublish({
                    id: id,
                })
                .then(
                    () => { this.refresh(); },
                    () => { }
                );
            }
        }
    });

    Landing.ManageCreate =
    Vue.component('landing-manage-create', {
        template: '#landing-manage-create',
        data: function() {
            return {
                form: this.form,
                validation: this.validation,
            }
        },
        created: function() {

            this.validation = {
                title: { dirty: false },
            }

            this.form = {
                title: null,
            }

            this.$watch('form', () => {

                this.validation.title = {
                    dirty: true,
                    required: this.form.title == null || this.form.title == '',
                }

                this.validation.valid =
                       !this.validation.title.required
                ;

            }, { deep: true })

        },
        methods: {

            create: function() {
                Vue.service('portals').create({
                    title: this.form.title,
                })
                .then(
                    () => { this.$router.push({ path: '/manage' })},
                    () => { }
                );
            },
        }
    });

    Landing.ManageClone =
    Vue.component('landing-manage-clone', {
        template: '#landing-manage-clone',
        data: function() {
            return {
                form: this.form,
            }
        },
        created: function() {

            Vue.service('portals').get({
                id: this.$route.params.portal
            })
            .then(
                (d) => {

                    var portal = d.data.portal;
                    var publication = portal.publication;

                    this.form = {
                        id: d.data.portal.id,
                        title: null,
                        image: publication ? `/uploads/${publication.thumbnail.dir}/${publication.thumbnail.path}` : null,
                    };
                },
                () => {

                }
            );
        },
        methods: {

            clone: function() {
                Vue.service('portals').create({
                    clone: this.form.id,
                    title: this.form.title,
                })
                .then(
                    () => { this.$router.go('/manage')},
                    (e) => { console.log(e); }
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
            }
        },
        created: function() {

            this.file = null;

            Vue.service('portals').get({
                id: this.$route.params.portal
            })
            .then(
                (d) => {

                    var portal = d.data.portal;
                    var publication = portal.publication;

                    this.form = {
                        id: portal.id,
                        title: publication ? publication.title : '',
                        image: publication ? `/uploads/${publication.thumbnail.dir}/${publication.thumbnail.path}` : null,
                    };
                },
                (e) => { console.log(e); }
            )
        },
        mounted: function() {

            $(this.$el).on('change', 'input[type="file"]', (e) => {

                this.file = e.target.files[0];

                var reader = new FileReader();
                reader.onload = (e) => {
                    this.form.image = e.target.result;
                }
                reader.readAsDataURL(this.file);
            });
        },
        methods: {

            publish: function() {

                Vue.service('portals').publish({
                    id: this.form.id,
                    title: this.form.title,
                    thumbnail: this.file,
                })
                .then(
                    () => { this.$router.go('/manage'); },
                    (e) => { console.log(e); }
                );
            },
        }
    });

})(jQuery, Vue, Core, Shell, Landing);
