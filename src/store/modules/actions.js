window.StoreFactoryActions =
(function() {

    return function() {

        return {

            state: {
                items: [],
            },

            actions: {

                'actions/execute': ({ dispatch }, { $store, $page, $data, $eval }) => {

                    if ($data != null) {

                        $eval($data, {
                            $store,
                            $page
                        })
                    }
                },
            },
        }
    }

})();
