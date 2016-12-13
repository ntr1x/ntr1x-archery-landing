window.ContextPlugin =
(function() {

    return {

        install: function (Vue) {

            Vue.mixin({

                created: function() {
                    this._page = this.page || (this.$parent && this.$parent.$page);
                },
                computed: {
                    $page: function() {
                        return this._page;
                    }
                }
            })
        }
    }

})();
