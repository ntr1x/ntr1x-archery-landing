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

                                    if (v != null) {

                                        if (param.in != 'body') {
                                            d[param.in] = Object.assign(d[param.in] || {}, { [param.name]: v })
                                        } else {
                                            d[param.in] = v
                                        }
                                    }
                                }
                            }

                            let handlers = {
                                POST: Vue.http.post,
                                PUT: Vue.http.put,
                                PATCH: Vue.http.patch,
                                GET: Vue.http.get,
                                HEAD: Vue.http.head,
                                DELETE: Vue.http.delete,
                            }

                            let handler = handlers[$method.method]

                            switch ($method.method) {
                            case 'POST':
                            case 'PUT':
                            case 'PATCH':
                                return handler.call(Vue.http, $method.url, d.body, {
                                    params: d.query,
                                    headers: d.header
                                })
                            case 'GET':
                            case 'HEAD':
                            case 'DELETE':
                                return handler($method.url, {
                                    params: d.query,
                                    // headers: d.header
                                })
                            }

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
