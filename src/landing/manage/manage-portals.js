(function($, Vue, Core, Shell, Landing) {

    Landing.Manage =
    Vue.component('landing-manage', {

        template: '#landing-manage',
        data: function() {
            return {
                url: window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: ''),
                portals: this.portals,
                domains: this.domains,
            };
        },
        created: function() {
            this.refresh();
        },
        methods: {

            refresh: function() {

                this.portals = [];

                this.$store
                    .dispatch('portals/my', { size: 100 })
                    .then(
                        (d) => { this.portals = d.data.content; },
                        () => { this.portals = []; }
                    )
                ;
            },

            remove: function(id) {
                this.$store
                    .dispatch('portals/id/remove', { id: id })
                    .then(
                        () => { this.refresh(); },
                        () => { }
                    )
                ;
            },

            unshare: function(id) {
                this.$store
                    .dispatch('portals/id/unshare', { id: id })
                    .then(
                        () => { this.refresh(); },
                        () => { }
                    )
                ;
            },

            share: function(id) {
                this.$store
                    .dispatch('portals/id/share', { id: id })
                    .then(
                        () => { this.refresh(); },
                        () => { }
                    )
                ;
            },

            removeDomain: function(id) {
                this.$store
                    .dispatch('domains/id/remove', { id: id })
                    .then(
                        () => { this.refresh(); },
                        () => { }
                    )
                ;
            },
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

                this.$store.dispatch('portals/create', {
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
                validation: this.validation,
            }
        },
        created: function() {

            this.$store.dispatch('portals/id/get', {
                id: this.$route.params.portal
            })
            .then(
                (d) => {

                    var portal = d.data;

                    this.form = {
                        id: portal.id,
                        title: portal.title,
                        thumbnail: portal.thumbnail,
                    };

                    this.validation = {
                        id: { dirty: false },
                        title: { dirty: false },
                    }

                    this.$watch('form', () => {

                        this.validation.id = {
                            dirty: true,
                            required: this.form.id == null || this.form.id == '',
                        }

                        this.validation.title = {
                            dirty: true,
                            required: this.form.title == null || this.form.title == '',
                        }

                        this.validation.valid =
                               !this.validation.id.required
                            && !this.validation.title.required
                        ;

                    }, { deep: true, immediate: true })
                },
                () => {

                }
            );
        },
        methods: {

            clone: function() {

                this.$store.dispatch('portals/create', {
                    clone: this.form.id,
                    title: this.form.title,
                    thumbnail: this.form.thumbnail.id,
                })
                .then(
                    () => { this.$router.push({ path: '/manage' }) },
                    (e) => { console.log(e); }
                );
            },
        }
    });

    Landing.ManageUpdate =
    Vue.component('landing-manage-details', {
        template: '#landing-manage-details',
        data: function() {
            return {
                form: this.form,
                validation: this.validation,
            }
        },
        created: function() {

            this.$store
                .dispatch('portals/id/get', {
                    id: this.$route.params.portal
                })
                .then(
                    (d) => {

                        var portal = d.data;

                        this.form = {
                            id: portal.id,
                            title: portal.title,
                            thumbnail: portal.thumbnail,
                        };

                        this.validation = {
                            id: { dirty: false },
                            title: { dirty: false },
                            thumbnail: { dirty: false },
                        }

                        this.$watch('form', () => {

                            this.validation.title = {
                                dirty: true,
                                required: this.form.title == null || this.form.title == '',
                            }

                            this.validation.thumbnail = {
                                dirty: true,
                                required: this.form.thumbnail == null || this.form.thumbnail == '',
                            }

                            this.validation.valid =
                                   !this.validation.title.required
                                && !this.validation.thumbnail.required
                            ;

                        }, { deep: true, immediate: true })
                    },
                    (e) => { console.log(e); }
                )
        },
        mounted: function() {

            $(this.$el).on('change', 'input[type="file"]', (e) => {

                let file = e.target.files[0];

                this.$store
                    .dispatch('upload/image', {
                        file,
                        settings: {
                            items: [
                                { name: 'thumbnail', format: 'png', width: 360, height: 195, type: 'COVER' }
                            ]
                        }
                    })
                    .then(
                        (d) => { this.form.thumbnail = d.data },
                        () => {}
                    )
            });
        },
        methods: {

            update: function() {

                this.$store
                    .dispatch('portals/id/update', {
                        id: this.form.id,
                        title: this.form.title,
                        thumbnail: this.form.thumbnail.id,
                    })
                    .then(
                        () => { this.$router.push({ path: '/manage' }); },
                        (e) => { console.log(e); }
                    )
                ;
            },
        }
    });

})(jQuery, Vue, Core, Shell, Landing);
