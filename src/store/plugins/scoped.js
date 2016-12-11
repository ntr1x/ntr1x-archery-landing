window.StoreScopedPlugin =
(function() {

    return function(name) {

        return {

            install: function (Vue) {

                Vue.mixin({

                    data: function () {
                        return {
                            [name]: this[name]
                        }
                    },

                    created: function() {
                        if (typeof this[name] == 'undefined') {
                            if (this.$parent != null && (name in this.$parent)) {
                                this[name] = this.$parent[name]
                            }
                        }
                    }
                })
            }
        }
    }

})();
