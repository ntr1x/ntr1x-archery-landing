window.ContextPlugin =
(function() {

    return {

        install: function (Vue) {

            Vue.mixin({

                created: function() {
                    this._page = this.$parent && this.$parent.$page
                    this._context = this.$parent && this.$parent.$context
                },
                computed: {
                    $page: function() { return this._page },
                    $context: function() { return this._context },
                }
            })
        }
    }

})();
