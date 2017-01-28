window.StoreFactoryActions =
(function() {

    return function() {

        return {

            state: {
                items: [],
            },

            actions: {

                'actions/eval': (context, script) => {
                    eval(script)
                },

                'actions/execute': ({ dispatch }, data) => {

                    console.log(data);

                    // return Vue.http.get(`${endpoint}/me/portals`, {
                    //     params: data,
                    //     headers: $.extend({}, {
                    //         Authorization: rootState.security.principal.token || undefined
                    //     })
                    // })

                    // dispatch()
                    // console.log(data);
                    // eval(script)
                },
            },
        }
    }

})();
