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

                console.log('Signin');

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
                        () => { this.$router.push({ path: '/signup/alert' }) },
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

    Landing.ProfileMain =
    Vue.component('landing-account-profile-main', {
        template: '#landing-account-profile-main',
        data: function() {
            return {
                form: this.form,
                validation: this.validation,
            }
        },
        created: function() {

            let v = this.validation = {
                valid: false,
                name: { dirty: false },
            };

            let f = this.form = {
                name: this.$store.state.security.principal.user.name,
            };

            let validate = () => {
                v.valid = !v.name.required
            }

            this.$watch('form.name', () => {

                v.name = {
                    dirty: true,
                    required: f.name == null || f.name == '',
                }

                validate()
            })
        },
        methods: {

            update: function() {

                this.$store
                    .dispatch('security/profile/update', {
                        name: this.form.name,
                    })
                    .then(
                        () => {
                            this.$store.commit('security/principal/user', {
                                ...this.$store.state.security.principal.user,
                                name: this.form.name
                            })
                            this.$router.push({ path: '/profile/success' })
                        },
                        () => {}
                    )
                ;
            },
        },
    });

    Landing.ProfileEmail =
    Vue.component('landing-account-profile-email', {
        template: '#landing-account-profile-email',
        data: function() {
            return {
                form: this.form,
                validation: this.validation,
            }
        },
        created: function() {

            let v = this.validation = {
                valid: false,
                email: { dirty: false },
                password: { dirty: false, required: true },
            };

            let f = this.form = {
                email: this.$store.state.security.principal.user.email,
                password: null,
            };

            let validate = () => {
                v.valid =
                       !v.email.required && !v.email.illegal
                    && !v.password.required && !v.password.illegal
            }

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
                    illegal: f.password != null && f.password.length < 7,
                }

                validate()
            })

            validate()
        },
        methods: {

            update: function() {

                this.$store
                    .dispatch('security/profile/email/update', {
                        email: this.form.email,
                        password: this.form.password,
                    })
                    .then(
                        () => {
                            this.$router.push({ path: '/profile/email/alert' })
                        },
                        () => {}
                    )
                ;
            },
        },
    });

    Landing.ProfilePassword =
    Vue.component('landing-account-profile-passwd', {
        template: '#landing-account-profile-passwd',
        data: function() {
            return {
                form: this.form,
                validation: this.validation,
            }
        },
        created: function() {

            let v = this.validation = {
                valid: false,
                password: { dirty: false, required: true },
                newPassword: { dirty: false, required: true },
                confirmPassword: { dirty: false, required: true },
            };

            let f = this.form = {
                password: null,
                newPassword: null,
                confirmPassword: null,
            };

            let validate = () => {
                v.valid =
                       !v.password.required && !v.password.illegal
                    && !v.newPassword.required && !v.newPassword.illegal
                    && !v.confirmPassword.required && !v.confirmPassword.illegal
            }

            this.$watch('form.password', () => {

                v.password = {
                    dirty: true,
                    required: f.password == null || f.password == '',
                    illegal: f.password != null && f.password.length < 7,
                }

                validate()
            })

            this.$watch('form.newPassword', () => {

                v.newPassword = {
                    dirty: true,
                    required: f.newPassword == null || f.newPassword == '',
                    illegal: f.newPassword != null && f.newPassword.length < 7,
                }

                v.confirmPassword.illegal = f.confirmPassword != f.newPassword

                validate()
            })

            this.$watch('form.confirmPassword', () => {

                v.confirmPassword = {
                    dirty: true,
                    required: f.confirmPassword == null || f.confirmPassword == '',
                    illegal: f.confirmPassword != f.newPassword,
                }

                validate()
            })

            validate()
        },
        methods: {

            update: function() {

                this.$store
                    .dispatch('security/profile/password/update', {
                        password: this.form.password,
                        newPassword: this.form.newPassword,
                    })
                    .then(
                        () => { this.$router.push({ path: '/profile/passwd/success' }) },
                        () => {}
                    )
                ;
            },
        },
    });

    Landing.ProfileRecover =
    Vue.component('landing-account-recover', {
        template: '#landing-account-recover',
        data: function() {
            return {
                form: this.form,
                validation: this.validation,
            }
        },
        created: function() {

            let v = this.validation = {
                valid: false,
                email: { dirty: false, required: true },
            };

            let f = this.form = {
                email: null
            };

            let validate = () => {
                v.valid =
                       !v.email.required && !v.email.illegal
            }

            this.$watch('form.email', () => {

                v.email = {
                    dirty: true,
                    required: f.email == null || f.email == '',
                    illegal: f.email != null && !validation.email.test(f.email),
                }

                validate()
            })

            validate()
        },
        methods: {

            recover: function() {

                this.$store
                    .dispatch('security/recover', {
                        email: this.form.email,
                    })
                    .then(
                        () => {
                            this.$router.push({ path: '/recover/alert' })
                        },
                        () => {}
                    )
                ;
            },
        },
    });

    Landing.ProfileRecoverPasswd =
    Vue.component('landing-account-recover-passwd', {
        template: '#landing-account-recover-passwd',
        data: function() {
            return {
                form: this.form,
                validation: this.validation,
            }
        },
        created: function() {

            let v = this.validation = {
                valid: false,
                newPassword: { dirty: false, required: true },
                confirmPassword: { dirty: false, required: true },
            };

            let f = this.form = {
                token: this.$route.params.token,
                newPassword: null,
                confirmPassword: null,
            };

            let validate = () => {
                v.valid =
                       !v.newPassword.required && !v.newPassword.illegal
                    && !v.confirmPassword.required && !v.confirmPassword.illegal
            }

            this.$watch('form.newPassword', () => {

                v.newPassword = {
                    dirty: true,
                    required: f.newPassword == null || f.newPassword == '',
                    illegal: f.newPassword != null && f.newPassword.length < 7,
                }

                v.confirmPassword.illegal = f.confirmPassword != f.newPassword

                validate()
            })

            this.$watch('form.confirmPassword', () => {

                v.confirmPassword = {
                    dirty: true,
                    required: f.confirmPassword == null || f.confirmPassword == '',
                    illegal: f.confirmPassword != f.newPassword,
                }

                validate()
            })

            validate()
        },
        methods: {

            update: function() {

                this.$store
                    .dispatch('security/recover/password/update', {
                        token: this.form.token,
                        newPassword: this.form.newPassword,
                    })
                    .then(
                        () => {
                            this.$router.push({ path: '/recover/success' })
                        },
                        () => {}
                    )
                ;
            },
        },
    });

})(jQuery, Vue, Core, Shell, Landing);
