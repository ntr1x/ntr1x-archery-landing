(function($, Vue, Core, Shell, Landing) {

    const validation = {
        email: /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9_\.\-]+)\.([a-zA-Z0-9]{2,})$/,
    };

    Landing.Signin =
    Vue.component('landing-account-signin', {
        template: '#landing-account-signin',
        data: function() {
            return {
                form: this.form,
                validation: this.validation,
            }
        },
        created: function() {

            this.validation = {
                email: { dirty: false },
                password: { dirty: false },
            };

            this.form = {
                email: null,
                password: null,
            };

            this.$watch('form', () => {
                this.validate()
            }, { deep: true });
        },
        methods: {

            validate: function() {

                this.validation.email = {
                    dirty: true,
                    required: this.form.email == null || this.form.email == '',
                    illegal: this.form.email != null && !validation.email.test(this.form.email),
                }

                this.validation.password = {
                    dirty: true,
                    required: this.form.password == null || this.form.password == '',
                    illegal: this.form.password != null && this.form.password.length < 7,
                }

                this.validation.valid =
                       !this.validation.email.required
                    && !this.validation.email.illegal
                    && !this.validation.password.required
                    && !this.validation.password.illegal
                ;
            },

            signin: function() {

                this.$store
                    .dispatch('security/signin', {
                        email: this.form.email,
                        password: this.form.password,
                    })
                    .then(
                        () => { this.$router.push({ path: this.$route.query.redirect || '/' }) },
                        () => {}
                    )
                ;
            }
        },
    });

    Landing.Signup =
    Vue.component('landing-account-signup', {
        template: '#landing-account-signup',
        data: function() {
            return {
                form: this.form,
                validation: this.validation,
            }
        },
        created: function() {

            let v = this.validation = {
                name: { dirty: false },
                email: { dirty: false },
                password: { dirty: false },
            };

            let f = this.form = {
                name: null,
                email: null,
                password: null,
            };

            let validate = () => {

                v.valid =
                       v.name.dirty && !v.name.required
                    && v.email.dirty && !v.email.required && !v.email.illegal
                    && v.password.dirty && !v.password.required && !v.password.illegal
            }

            this.$watch('form.name', () => {

                v.name = {
                    dirty: true,
                    required: f.name == null || f.name == '',
                }

                validate()
            })

            this.$watch('form.email', () => {

                v.email = {
                    dirty: true,
                    required: f.email == null || f.email == '',
                    illegal: f.email != null && !validation.email.test(f.email),
                }

                validate()
            })

            this.$watch('form.password', () => {

                v.password = {
                    dirty: true,
                    required: f.password == null || f.password == '',
                    illegal: f.password != null && f.password.length < 8,
                }

                validate()
            })

            validate()
        },
        methods: {

            signup: function() {

                this.$store
                    .dispatch('security/signup', {
                        name: this.form.name,
                        email: this.form.email,
                        password: this.form.password,
                    })
                    .then(
                        () => { this.$router.push({ path: '/' }) },
                        () => {}
                    )
                ;
            }
        },
    });

    Landing.Profile =
    Vue.component('landing-account-profile', {
        template: '#landing-account-profile',
    });

})(jQuery, Vue, Core, Shell, Landing);
