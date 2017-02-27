window.StoreFactoryActions =
(function($) {

    return function() {

        return {

            state: {
                items: [],
            },

            actions: {

                'actions/execute': ({ dispatch }, { $store, $page, $script, $context, $eval }) => {

                    if ($script != null) {

                        return $eval($script, {
                            $store,
                            $page,
                            $context,
                        })
                    }

                    return null
                },

                'actions/upload': ({ dispatch }, handle) => {

                    $(window.document.createElement('input'))
                        .attr('type', 'file')
                        .on('change', (e) => {
                            if (e.target.files && e.target.files.length) {
                                handle(e.target.files)
                            } else {
                                handle(null)
                            }
                        })
                        .trigger('click')
                },

                'actions/ajax': ({ dispatch }, { $page, $store, $context, $method }) => {

                    try {

                        if ($context != null) {

                            let vm = new Vue();
                            vm.$page = $page;
                            vm.$store = $store;
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

                            let url = d.path
                                ? _.template($method.url, { interpolate: /{([\s\S]+?)}/g })(d.path)
                                : $method.url


                            let fd = null
                            if (d.formData != null) {
                                fd = new FormData();
                                for (let n in d.formData) {
                                    fd.append(n, d.formData[n]);
                                }
                            }

                            switch ($method.method) {
                            case 'POST':
                            case 'PUT':
                            case 'PATCH':
                                return handler.call(Vue.http, url, fd || d.body, {
                                    params: d.query,
                                    headers: d.header
                                })
                            case 'GET':
                            case 'HEAD':
                            case 'DELETE':
                                return handler.call(Vue.http, url, {
                                    params: d.query,
                                    headers: d.header
                                })
                            }

                            return Promise.resolve(null)
                        }

                    } catch (e) {

                        this.$store.commit('console/log', {
                            group: 'sources',
                            type: 'warning',
                            message: `Cannot execute ajax action ${$method.name == null ? 'undefined' : $method.name}`,
                            trace: (console) => {
                                console.groupCollapsed(e.message);
                                console.warn('Method:', $method);
                                console.warn(e.stack);
                                console.groupEnd();
                            }
                        })

                        return Promise.reject(null)
                    }

                    return Promise.reject(null)
                },
            },
        }
    }

})(jQuery);
