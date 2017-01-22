(function($, Vue, Core, Shell, Landing) {

    Vue.component('landing-manage-domains', {
        template: '#landing-manage-domains',
        data: function() {
            return {
                details: this.details,
            }
        },
        created: function() {
            this.refresh()
        },
        methods: {

            refresh: function() {

                this.details = null

                this.$store
                    .dispatch('portals/id/details/get', {
                        id: this.$route.params.portal,
                    })
                    .then(
                        (d) => { this.details = d.data },
                        () => { }
                    )
                ;
            },

            sorted: function() {

                return !this.details ? [] : [ ...this.details.domains ].sort((a, b) => {
                    if (a.name > b.name) return 1
                    if (a.name < b.name) return -1
                    return 0
                })
            },

            remove: function(id) {
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

    Vue.component('landing-manage-domains-create', {
        template: '#landing-manage-domains-create',
        data: function() {
            return {
                form: this.form,
                validation: this.validation,
            }
        },
        created: function() {

            this.validation = {
                valid: false,
                name: { dirty: false, required: true },
            }

            this.form = {
                name: null,
            }

            this.$watch('form.name', () => {

                this.validation.name = {
                    dirty: true,
                    required: this.form.name == null || this.form.name == '',
                }

                this.validation.valid =
                       !this.validation.name.required
            })
        },
        methods: {

            create: function() {

                return this.$store.dispatch('domains/create', {
                    name: this.form.name,
                    portal: this.$route.params.portal,
                })
                .then(
                    () => { this.$router.push({ path: `/manage/i/${this.$route.params.portal}/domains` })},
                    () => { }
                );
            },
        }
    });

    Vue.component('landing-manage-domains-update', {
        template: '#landing-manage-domains-update',
        data: function() {
            return {
                details: this.details,
                form: this.form,
                validation: this.validation,
            }
        },
        created: function() {

            this.validation = {
                valid: false,
                name: { dirty: false, required: true },
            }

            this.form = {
                name: null,
            }

            this.$watch('form.name', () => {

                this.validation.name = {
                    dirty: true,
                    required: this.form.name == null || this.form.name == '',
                }

                this.validation.valid =
                       !this.validation.name.required
            })

            this.refresh();
        },
        methods: {

            refresh: function() {

                this.details = null

                this.$store
                    .dispatch('domains/id/get', {
                        id: this.$route.params.domain,
                    })
                    .then(
                        (d) => {
                            this.details = d.data
                            this.form.name = d.data.name
                        },
                        () => { }
                    )
                ;
            },

            update: function() {

                return this.$store.dispatch('domains/id/update', {
                    id: this.$route.params.domain,
                    name: this.form.name,
                })
                .then(
                    () => { this.$router.push({ path: `/manage/i/${this.$route.params.portal}/domains` })},
                    () => { }
                );
            },
        }
    });

})(jQuery, Vue, Core, Shell, Landing);
