(function($, Vue) {

    Vue.component('shop-yandex', {
        template: '#shop-yandex',
        props: {
            user: Object,
            order: Object,
            store: Object,
        },
        mounted() {
            this.$el.submit()
        }
    });
})(jQuery, Vue);
