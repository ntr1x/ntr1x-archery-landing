(function($, Vue, Core, Shell, Landing) {

    Landing.LandingPurchase =
    Vue.component('landing-account-purchase', {
        template: '#landing-account-purchase',
        data() {
            return {
                eshop: null,
                context: null,
                order: null,
            }
        },
        created() {

            this.$store
                .dispatch('landing/offers/id/context', { id: this.$route.params.offer })
                .then(
                    (d) => { this.context = d.data },
                    (e) => { /* ignore */ }
                )
            ;
        },
        methods: {
            send: function(store, price) {

                this.$store
                    .dispatch('landing/orders/create', {
                        relate: price.id,
                        store: store.name,
                        quantity: 1
                    })
                    .then(
                        (d) => {
                            this.order = d.data
                        },
                        (e) => { console.log(e) }
                    )
                ;
            },
        },
    });

})(jQuery, Vue, Core, Shell, Landing);
