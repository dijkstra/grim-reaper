'use strict';

angular.module('shit.services.StoreService',[])
.service('StoreService', ['$q', 'BaseService', function($q, BaseService) {

    var mockedData = {
        "/sellers/1/items": [
            {
                sellerId: "seller",
                title: "Bullar",
                amount: 2,
                price: 10,
                image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTl9dM8_6uvC6hkMHUW_zpqS-MkCfOIkb3ofGa2ldLV_NSRKH8961uvNA",
                description: "Fyra jättegoda bullar som vad bakade 10 timmar sedan.",
                startTime: new Date(),
                endTIme: new Date()
            },{
                sellerId: "seller",
                title: "Bullar",
                amount: 2,
                price: 10,
                image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTl9dM8_6uvC6hkMHUW_zpqS-MkCfOIkb3ofGa2ldLV_NSRKH8961uvNA",
                description: "Fyra jättegoda bullar som vad bakade 10 timmar sedan.",
                startTime: new Date(),
                endTIme: new Date()
            },{
                sellerId: "seller",
                title: "Bullar",
                amount: 2,
                price: 10,
                image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTl9dM8_6uvC6hkMHUW_zpqS-MkCfOIkb3ofGa2ldLV_NSRKH8961uvNA",
                description: "Fyra jättegoda bullar som vad bakade 10 timmar sedan.",
                startTime: new Date(),
                endTIme: new Date()
            }
        ],
        "/sellers": [{
            "_id": "1",
            "name":"Eriks teashop",
            "description": "Some fine stuff here",
            "address": "Drottninggatan 12"
        }]
    };

    function getAllItems(params) {

        return getMocked("/sellers");
        // return BaseService.httpGet({
        //     url: '/items',
        //     httpOpts: {
        //         params: params
        //     }
        // });
    }

    function getItemsForStore(id, params) {

        return getMocked("/sellers/" + id + "/items");
    }

    function getMocked(path) {
        var deferred = $q.defer();

        if (mockedData[path]) {
            deferred.resolve(mockedData[path]);
        } else {
            deferred.reject();
        }
        return deferred.promise;
    }

    return {
        getAllStores: getAllStores,
        getItemsForStore: getItemsForStore
    };

}]);