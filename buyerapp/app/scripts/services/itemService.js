'use strict';

angular.module('shit.services.ItemService',[])
.service('ItemService', ['$q', 'BaseService', function($q, BaseService) {

    function getAllItems(params) {

        return BaseService.httpGet({
            url: '/items',
            httpOpts: {
                params: params
            }
        }, function (data) {
            console.log(data);
            data.forEach(function (item) {
                item.description = 'Fyra jättegoda bullar som vad bakade 10 timmar sedan.';
            });
        });
    }

    function getItemById(id, params) {

        return BaseService.httpGet({
            url: '/items/' + id,
            httpOpts: {
                params: params
            }
        }, function (item) {
            item.description = 'Fyra jättegoda bullar som vad bakade 10 timmar sedan.';
        });
    }

    return {
        getAllItems: getAllItems,
        getItemById: getItemById
    };

}]);