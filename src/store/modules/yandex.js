window.StoreFactoryYandex =
(function($, Vue) {

    let yandex = {
        eshop: 'https://money.yandex.ru/eshop.xml'
    }

    return function() {

        return {

            state: {
            },

            mutations: {
            },

            actions: {

                'yandex/purchase': ({ commit, state }, data /* = {
                    shopId,
                    scid,
                    sum,
                    customerNumber,
                    custName,
                    custEmail,
                    custAddr,
                    orderDetails
                } */) => {
                    return Vue.http.post(`${yandex.eshop}`, data)
                },
            }
        }
    }

})(jQuery, Vue);
