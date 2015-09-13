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
            data.forEach(function (item) {
                // item.description = 'Fyra jättegoda bullar som vad bakade 10 timmar sedan.';
                item.startTime = new Date(item.startTime);
                item.endTime = new Date(item.endTime);
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
            // item.description = 'Fyra jättegoda bullar som vad bakade 10 timmar sedan.';
            item.startTime = new Date(item.startTime);
            item.endTime = new Date(item.endTime);
        });
    }

    return {
        getAllItems: getAllItems,
        getItemById: getItemById
    };

}]);