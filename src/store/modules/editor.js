window.StoreFactoryEditor =
(function($, Vue) {

    return function() {

        return {

            state: {
                model: null,
                scale: 1.0
            },

            mutations: {

                'editor/model': (state, model) => {
                    state.model = model;
                },

                'editor/scale': (state, scale) => {
                    state.scale = scale;
                },
            },

            actions: {

                'editor/zoomIn': ({ commit, state }) => {
                    // $('.ge.ge-page', this.$el).css('transform', 'scale(' + this.scale + ')');
                    commit('editor/scale', state.scale + 0.1);
                    // Vue.nextTick(() => {
                    //     $('.ge.ge-container', this.$el).perfectScrollbar('update');
                    // })
                },

                'editor/zoomOut': ({ commit, state }) => {
                    // $('.ge.ge-page', this.$el).css('transform', 'scale(' + this.scale + ')');
                    commit('editor/scale', state.scale - 0.1);
                    // Vue.nextTick(() => {
                    //     $('.ge.ge-container', this.$el).perfectScrollbar('update');
                    // })
                },
            }
        }
    }

})(jQuery, Vue);
