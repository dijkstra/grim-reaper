'use strict';

angular.module('shit.services.StoreService',[])
.service('StoreService', ['$q', 'BaseService', function($q, BaseService) {

    function getAllStores(params) {

        return BaseService.httpGet({
            url: '/sellers',
            httpOpts: {
                params: params
            }
        });
    }

    function getStoreById(id, params) {

        return BaseService.httpGet({
            url: '/sellers/' + id,
            httpOpts: {
                params: params
            }
        });
    }

    function getItemsForStore(id, params) {

        return BaseService.httpGet({
            url: '/sellers/' + id + '/items',
            httpOpts: {
                params: params
            }
        });
    }

    return {
        getAllStores: getAllStores,
        getStoreById: getStoreById,
        getItemsForStore: getItemsForStore
    };

}]);