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
                    .dispatch('landing/offers/apply', {
                        subject: this.form.subject,
                        message: this.form.message,
                    })
                    .then(
                        () => {
                            this.$router.push({ path: '/apply/alert' })
                        },
                        () => {}
                    )
                ;
            },
        },
    });

})(jQuery, Vue, Core, Shell, Landing);
