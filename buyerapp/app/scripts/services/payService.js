'use strict';

angular.module('shit.services.PayService',[])
.service('PayService', ['$q', 'BaseService', function($q, BaseService) {

    function getToken(params) {

        return BaseService.httpGet({
            url: '/client_token',
            httpOpts: {
                params: params
            }
        });
    }

    function buyItem(data, params) {
        return BaseService.httpPost({
            url: '/checkout',
            httpOpts: {
                params: params
            },
            body: data
        });
    }

    return {
        getToken: getToken,
        buyItem: buyItem
    };

}]);