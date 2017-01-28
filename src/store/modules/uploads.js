window.StoreFactoryUploads =
(function($, Vue) {

    return function({ endpoint }) {

        return {

            state: {
            },

            actions: {

                'upload/image': ({ commit, state, rootState }, { file, settings }) => {

                    let fd = new FormData();
                    fd.append('file', file)
                    fd.append('settings', JSON.stringify(settings))

                    return Vue.http
                        .post(`${endpoint}/me/images`, fd, {
                            headers: {
                                Authorization: rootState.security.principal.token || undefined
                            }
                        })
                    ;
                },
            },
        }
    }

})(jQuery, Vue);
