window.StoreFactorySettings =
(function() {

    return function({ endpoint }) {

        return {

            state: {
                endpoint
            },
        }
    }

})();
