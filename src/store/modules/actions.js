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

                'actions/ajax': ({ dispatch }, { $page, $context, $method }) => {

                    try {

                        if ($context != null) {

                            let vm = new Vue();
                            vm.$page = $page;
                            vm.$context = $context;

                            let d = {
                                query: null,
                                path: null,
                                formData: null,
                                header: null,
                                body: null
                            }

                            for (let param of $method.params) {

                                if (param.specified) {

                                    let v = vm.$runtime.evaluate(
                                        vm,
                                        param.binding,
                                        param.value
                                    )

                                    if (param.in != 'body') {
                                        d[param.in] = Object.assign(d[param.in] || {}, { [param.name]: v })
                                    } else {
                                        d[param.in] = v
                                    }
                                }
                            }

                            console.log($method)
                            console.log(d)

                            // switch ($method.)

                            return Promise.resolve(null)
                        }

                    } catch (e) {

                        console.log(e);
                        return Promise.reject(null)
                    }

                    return Promise.reject(null)
                },
            },
        }
    }

})();
