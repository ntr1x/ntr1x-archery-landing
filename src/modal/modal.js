(function(Vue, $) {

    let ModalComponent =
    Vue.component('default-modal', {
        template: '#default-modal',
        attached: function() {

            $(this.$el).modal('show');
            $(this.$el).on('hidden.bs.modal', (e) => {
                e.stopPropagation();
                this.$remove();
            });
        },

        detached: function() {
            $(this.$el).modal('hide');
        },
    });

    Vue.service('modals', {

        show: (page, config) => {

            new ModalComponent({
                data: {
                    config: config,
                    page: Vue.service('app').modal(page),
                }
            }).$mount().$appendTo($('body').get(0));
        }
    });

})(Vue, jQuery);
