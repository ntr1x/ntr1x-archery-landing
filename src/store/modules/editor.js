(function($, Vue, Vuex, Store) {

    Store.registerModule('editor', {

        state: {
            model: null,
            scale: 1.0
        },

        mutations: {

            model: (state, model) => {
                state.model = model;
            },

            scale: (state, scale) => {
                state.scale = scale;
            },
        },

        actions: {

            push: ({ commit, state }) => {

                return $.ajax({
                    url: `/ws/portals/${state.portal.id}`,
                    method: 'PUT',
                    dataType: 'json',
                    data: JSON.stringify(state.model),
                    contentType: 'application/json',
                })
                .then(
                    (d) => commit('model', d),
                    () => {}
                )
            },

            pull: ({ commit, state }) => {

                return $.ajax({
                    url: `/ws/portals/${state.portal.id}`,
                    method: 'GET',
                    dataType: 'json'
                })
                .then(
                    (d) => commit('model', d),
                    () => {}
                )
            },

            zoomIn: ({ commit, state }) => {
                // $('.ge.ge-page', this.$el).css('transform', 'scale(' + this.scale + ')');
                commit('scale', state.scale + 0.1);
                // Vue.nextTick(() => {
                //     $('.ge.ge-container', this.$el).perfectScrollbar('update');
                // })
            },

            zoomOut: ({ commit, state }) => {
                // $('.ge.ge-page', this.$el).css('transform', 'scale(' + this.scale + ')');
                commit('scale', state.scale - 0.1);
                // Vue.nextTick(() => {
                //     $('.ge.ge-container', this.$el).perfectScrollbar('update');
                // })
            },
        }
    })

})(jQuery, Vue, Vuex, Store);
