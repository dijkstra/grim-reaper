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
                item.startTime = new Date();
                item.endTime = new Date();
                item.description = 'Fyra jättegoda bullar som vad bakade 10 timmar sedan.';
                item.image = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTl9dM8_6uvC6hkMHUW_zpqS-MkCfOIkb3ofGa2ldLV_NSRKH8961uvNA";
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
            item.startTime = new Date();
            item.endTime = new Date();
            item.description = 'Fyra jättegoda bullar som vad bakade 10 timmar sedan.';
        });
    }

    return {
        getAllItems: getAllItems,
        getItemById: getItemById
    };

}]);