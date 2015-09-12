'use strict';

angular.module('shit.services.ItemService',[])
.service('ItemService', ['$q', 'BaseService', function($q, BaseService) {

    // var mockedData = {
    //     "/items": [
    //         {
    //             sellerId: "seller",
    //             title: "Bullar",
    //             amount: 2,
    //             price: 10,
    //             image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTl9dM8_6uvC6hkMHUW_zpqS-MkCfOIkb3ofGa2ldLV_NSRKH8961uvNA",
    //             description: "Fyra jättegoda bullar som vad bakade 10 timmar sedan.",
    //             startTime: new Date(),
    //             endTime: new Date()
    //         },{
    //             sellerId: "seller",
    //             title: "Bullar",
    //             amount: 2,
    //             price: 10,
    //             image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTl9dM8_6uvC6hkMHUW_zpqS-MkCfOIkb3ofGa2ldLV_NSRKH8961uvNA",
    //             description: "Fyra jättegoda bullar som vad bakade 10 timmar sedan.",
    //             startTime: new Date(),
    //             endTime: new Date()
    //         },{
    //             sellerId: "seller",
    //             title: "Bullar",
    //             amount: 2,
    //             price: 10,
    //             image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTl9dM8_6uvC6hkMHUW_zpqS-MkCfOIkb3ofGa2ldLV_NSRKH8961uvNA",
    //             description: "Fyra jättegoda bullar som vad bakade 10 timmar sedan.",
    //             startTime: new Date(),
    //             endTime: new Date()
    //         }
    //     ]
    // };

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
                item.endTime = new Date()
                item.description = 'Fyra jättegoda bullar som vad bakade 10 timmar sedan.';
                item.image = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTl9dM8_6uvC6hkMHUW_zpqS-MkCfOIkb3ofGa2ldLV_NSRKH8961uvNA";
            })
        });
    }

    function getItemById(id, params) {

        return BaseService.httpGet({
            url: '/items/' + id,
            httpOpts: {
                params: params
            }
        }, function (item) {

            console.log(item);
            item.startTime = new Date();
            item.endTime = new Date()
            item.description = 'Fyra jättegoda bullar som vad bakade 10 timmar sedan.';
            item.image = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTl9dM8_6uvC6hkMHUW_zpqS-MkCfOIkb3ofGa2ldLV_NSRKH8961uvNA";
        });
    }
    // function getMocked(path) {
    //     var deferred = $q.defer();

    //     if (mockedData[path]) {
    //         deferred.resolve(mockedData[path]);
    //     } else {
    //         deferred.reject();
    //     }
    //     return deferred.promise;
    // }

    return {
        getAllItems: getAllItems,
        getItemById: getItemById
    };

}]);