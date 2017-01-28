window.ContextPlugin =
(function() {

    return {

        install: function (Vue) {

            Vue.mixin({
                data: function() {
                    return {
                        $page: this.$page,
                        $context: this.$context,
                    }
                },
                beforeCreate: function() {
                    this.$page = this.$page || this.$parent && this.$parent.$page
                    this.$context = this.$context || this.$parent && this.$parent.$context
                },
            })
        }
    }

})();
