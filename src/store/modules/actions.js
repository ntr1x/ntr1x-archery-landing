window.StoreFactoryActions =
(function() {

    return function() {

        return {

            state: {
                items: [],
            },

            actions: {

                'actions/execute': (context, script) => {

                    console.log(script);
                    eval(script)
                },
            },
        }
    }

})();
