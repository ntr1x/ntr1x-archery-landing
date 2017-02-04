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

                        return $eval($data, {
                            $store,
                            $page
                        })
                    }

                    return null
                },
            },
        }
    }

})();
