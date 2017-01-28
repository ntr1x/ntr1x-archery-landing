(function($, Vue, Core, Shell, Landing) {

    Vue.component('landing-manage-templates', {
        template: '#landing-manage-templates',
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

                return !this.details ? [] : [ ...this.details.templates ].sort((a, b) => {
                    if (a.name > b.name) return 1
                    if (a.name < b.name) return -1
                    return 0
                })
            },

            remove: function(id) {
                this.$store
                    .dispatch('templates/id/remove', { id: id })
                    .then(
                        () => { this.refresh(); },
                        () => { }
                    )
                ;
            },
        }
    });

    Vue.component('landing-manage-templates-create', {
        template: '#landing-manage-templates-create',
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
                subject: { dirty: false, required: true },
                sender: { dirty: false, required: true },
                content: { dirty: false, required: true },
            }

            this.form = {
                name: null,
                subject: null,
                sender: null,
                content: null,
            }

            this.$watch('form.name', () => {

                this.validation.name = {
                    dirty: true,
                    required: this.form.name == null || this.form.name == '',
                }

                this.validate()
            })

            this.$watch('form.subject', () => {

                this.validation.subject = {
                    dirty: true,
                    required: this.form.subject == null || this.form.subject == '',
                }

                this.validate()
            })

            this.$watch('form.sender', () => {

                this.validation.sender = {
                    dirty: true,
                    required: this.form.sender == null || this.form.sender == '',
                }

                this.validate()
            })
        },
        methods: {

            validate: function() {
                this.validation.valid =
                       !this.validation.name.required
                    && !this.validation.subject.required
                    && !this.validation.sender.required
            },

            create: function() {

                return this.$store.dispatch('templates/create', {
                    name: this.form.name,
                    subject: this.form.subject,
                    sender: this.form.sender,
                    content: this.form.content,
                    portal: this.$route.params.portal,
                })
                .then(
                    () => { this.$router.push({ path: `/manage/i/${this.$route.params.portal}/templates` })},
                    () => { }
                );
            },
        }
    });

    Vue.component('landing-manage-templates-update', {
        template: '#landing-manage-templates-update',
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
                subject: { dirty: false, required: true },
                sender: { dirty: false, required: true },
                content: { dirty: false, required: true },
            }

            this.form = {
                name: null,
                subject: null,
                sender: null,
                content: null,
            }

            this.$watch('form.name', () => {

                this.validation.name = {
                    dirty: true,
                    required: this.form.name == null || this.form.name == '',
                }

                this.validate()
            })

            this.$watch('form.subject', () => {

                this.validation.subject = {
                    dirty: true,
                    required: this.form.subject == null || this.form.subject == '',
                }

                this.validate()
            })

            this.$watch('form.sender', () => {

                this.validation.sender = {
                    dirty: true,
                    required: this.form.sender == null || this.form.sender == '',
                }

                this.validate()
            })

            this.refresh()
        },
        methods: {

            refresh: function() {

                this.details = null

                this.$store
                    .dispatch('templates/id/get', {
                        id: this.$route.params.template,
                    })
                    .then(
                        (d) => {
                            this.details = d.data
                            this.form.name = d.data.name
                            this.form.subject = d.data.subject
                            this.form.sender = d.data.sender
                            this.form.content = d.data.content
                        },
                        () => { }
                    )
                ;
            },

            validate: function() {
                this.validation.valid =
                       !this.validation.name.required
                    && !this.validation.subject.required
                    && !this.validation.sender.required
            },

            update: function() {

                return this.$store.dispatch('templates/id/update', {
                    id: this.$route.params.template,
                    name: this.form.name,
                    subject: this.form.subject,
                    sender: this.form.sender,
                    content: this.form.content,
                    portal: this.$route.params.portal,
                })
                .then(
                    () => { this.$router.push({ path: `/manage/i/${this.$route.params.portal}/templates` })},
                    () => { }
                );
            },
        }
    });

})(jQuery, Vue, Core, Shell, Landing);
