(function($, Vue, Core, Shell, Landing) {

    Landing.ManageParams =
    (collection, type) => ({

        data: function() {
            return {
                form: this.form,
                details: this.details,
                validation: this.validation,
            }
        },
        created: function() {

            this.items = null

            this.form = {
                name: '',
                value: '',
            }

            this.validation = {
                name: {
                    valid: false
                },
                valid: false
            }

            this.$store
                .dispatch('portals/id/details/get', {
                    id: this.$route.params.portal
                })
                .then(
                    (d) => {
                        this.details = d.data
                        this.items = !(collection in d.data) ? [] : d.data[collection].map(p => ({
                            uuid: Core.UUID.random(),
                            id: p.id,
                            type: p.type,
                            name: p.name,
                            value: p.value,
                            action: 'UPDATE'
                        }))

                        this.$watch('form.name', () => {
                            this.validation.name.valid = (this.form.name != null) && (this.form.name.trim() != '')
                            this.validation.valid = this.validation.name.valid
                        }, {
                            immediate: true
                        })
                    },
                    () => {}
                )
            ;
        },
        methods: {

            sorted: function() {

                return this.items.filter(p => p.action != 'REMOVE').sort((a, b) => {
                    if (a.name > b.name) return 1
                    if (a.name < b.name) return -1
                    return 0
                })
            },

            add: function() {

                this.items.push({
                    uuid: Core.UUID.random(),
                    type: type,
                    name: this.form.name,
                    value: this.form.value,
                    action: 'CREATE'
                })

                this.form.name = ''
                this.form.value = ''

                this.$forceUpdate()
            },

            remove: function(item) {

                if (item.action == 'CREATE') {
                    let index = this.items.indexOf(item)
                    this.items.splice(index, 1)
                } else {
                    item.action = 'REMOVE'
                    this.items = this.items.slice();
                }
                this.$forceUpdate()
            },

            update: function() {

                this.$store.dispatch('portals/id/update', {
                    id: this.details.portal.id,
                    thumbnail: this.details.portal.thumbnail.id,
                    title: this.details.portal.title,
                    params: this.items.map(p => ({
                        id: p.id,
                        action: p.action,
                        type: p.type,
                        name: p.name,
                        value: p.value
                    }))
                })
                .then(
                    () => { this.$router.push({ path: '/manage' })},
                    () => { }
                );
            },
        }
    });

    Vue.component('landing-manage-mail', {
        mixins: [ Landing.ManageParams('mail', 'MAIL') ],
        template: '#landing-manage-mail'
    });

    Vue.component('landing-manage-router', {
        mixins: [ Landing.ManageParams('routes', 'ROUTE') ],
        template: '#landing-manage-router'
    });

    Vue.component('landing-manage-meta', {
        mixins: [ Landing.ManageParams('meta', 'META') ],
        template: '#landing-manage-meta'
    });

    Vue.component('landing-manage-templates', {
        template: '#landing-manage-templates',
        data: function() {
            return {
                form: this.form,
                active: this.active,
                details: this.details,
                validation: this.validation,
            }
        },
        created: function() {

            this.items = null
            this.active = null

            this.form = {
                name: '',
                subject: '',
                sender: '',
                content: ''
            }

            this.$store
                .dispatch('portals/id/details/get', {
                    id: this.$route.params.portal,
                })
                .then(
                    (d) => {
                        this.details = d.data
                        this.items = d.data.templates.map(p => ({
                            uuid: Core.UUID.random(),
                            original: p,
                            managed: {
                                id: p.id,
                                name: p.name,
                                sender: p.sender,
                                subject: p.subject,
                                content: p.content,
                                action: 'UPDATE'
                            }
                        }))

                        console.log(this.items)
                        // this.active = this.items[0];
                    },
                    () => {}
                )
            ;
        },
        methods: {

            sorted: function() {

                return !this.items ? [] : this.items.filter(p => p.action != 'REMOVE').sort((a, b) => {
                    if (a.name > b.name) return 1
                    if (a.name < b.name) return -1
                    return 0
                })
            },

            // add: function() {
            //
            //     this.items.push({
            //         uuid: Core.UUID.random(),
            //         type: type,
            //         name: this.form.name,
            //         value: this.form.value,
            //         action: 'CREATE'
            //     })
            //
            //     this.form.name = ''
            //     this.form.value = ''
            //
            //     this.$forceUpdate()
            // },
            //
            // remove: function(item) {
            //
            //     if (item.action == 'CREATE') {
            //         let index = this.items.indexOf(item)
            //         this.items.splice(index, 1)
            //     } else {
            //         item.action = 'REMOVE'
            //         this.items = this.items.slice();
            //     }
            //     this.$forceUpdate()
            // },

            update: function() {

                this.$store.dispatch('portals/id/update', {
                    id: this.details.portal.id,
                    thumbnail: this.details.portal.thumbnail.id,
                    title: this.details.portal.title,
                    params: this.items.map(p => ({
                        id: p.id,
                        action: p.action,
                        type: p.type,
                        name: p.name,
                        value: p.value
                    }))
                })
                .then(
                    () => { this.$router.push({ path: '/manage' })},
                    () => { }
                );
            },
        }
    });

})(jQuery, Vue, Core, Shell, Landing);
