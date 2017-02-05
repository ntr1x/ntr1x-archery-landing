(function($, Vue, Core, Shell, Landing) {

    Landing.LandingApply =
    Vue.component('landing-account-apply', {
        template: '#landing-account-apply',
        data: function() {
            return {
                form: this.form,
                validation: this.validation,
            }
        },
        created: function() {

            let v = this.validation = {
                valid: false,
                subject: { dirty: false },
                message: { dirty: false, required: true },
            };

            let f = this.form = {
                subject: null,
                message: null,

                name: this.$store.state.security.principal.user.name,
                organization: null,
                phone: null,
                email: this.$store.state.security.principal.user.email,
                country: null,
                city: null,
                state: null,
                zip: null,
                address1: null,
                address2: null,
            };

            let validate = () => {
                v.valid =
                       !v.subject.required
                    && !v.message.required
            }

            this.$watch('form.subject', () => {

                v.subject = {
                    dirty: true,
                    required: f.subject == null || f.subject == '',
                }

                validate()
            })

            this.$watch('form.message', () => {

                v.message = {
                    dirty: true,
                    required: f.message == null || f.message == '',
                }

                validate()
            })
        },
        methods: {

            send: function() {

                this.$store
                    .dispatch('landing/orders/create', {
                        relate: this.$route.params.offer,
                        extra: {
                            subject: this.form.subject,
                            message: this.form.message,
                            name: this.form.name,
                            organization: this.form.organization,
                            phone: this.form.phone,
                            email: this.form.email,
                            country: this.form.country,
                            city: this.form.city,
                            state: this.form.state,
                            zip: this.form.zip,
                            address1: this.form.address1,
                            address2: this.form.address2,
                        },
                    })
                    .then(
                        () => {
                            this.$router.push({ path: '/account/apply/alert' })
                        },
                        () => {}
                    )
                ;
            },
        },
    });

})(jQuery, Vue, Core, Shell, Landing);
