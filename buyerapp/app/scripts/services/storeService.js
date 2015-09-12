'use strict';

angular.module('shit.services.StoreService',[])
.service('StoreService', ['$q', 'BaseService', function($q, BaseService) {

    var mockedData = {
        "/sellers/1/items": [
            {
                _id: "1",
                sellerId: "1",
                title: "Bullar",
                amount: 2,
                price: 10,
                image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTl9dM8_6uvC6hkMHUW_zpqS-MkCfOIkb3ofGa2ldLV_NSRKH8961uvNA",
                description: "Fyra jättegoda bullar som vad bakade 10 timmar sedan.",
                startTime: new Date(),
                endTIme: new Date()
            },{
                _id: "2",
                sellerId: "1",
                title: "Bullar",
                amount: 2,
                price: 10,
                image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTl9dM8_6uvC6hkMHUW_zpqS-MkCfOIkb3ofGa2ldLV_NSRKH8961uvNA",
                description: "Fyra jättegoda bullar som vad bakade 10 timmar sedan.",
                startTime: new Date(),
                endTIme: new Date()
            },{
                _id: "3",
                sellerId: "1",
                title: "Bullar",
                amount: 2,
                price: 10,
                image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTl9dM8_6uvC6hkMHUW_zpqS-MkCfOIkb3ofGa2ldLV_NSRKH8961uvNA",
                description: "Fyra jättegoda bullar som vad bakade 10 timmar sedan.",
                startTime: new Date(),
                endTIme: new Date()
            }
        ],
        "/sellers/2/items": [{
                _id: "4",
                sellerId: "2",
                title: "Bullar",
                amount: 2,
                price: 10,
                image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTl9dM8_6uvC6hkMHUW_zpqS-MkCfOIkb3ofGa2ldLV_NSRKH8961uvNA",
                description: "Fyra jättegoda bullar som vad bakade 10 timmar sedan.",
                startTime: new Date(),
                endTIme: new Date()
            }],
        "/sellers": [{
            "_id": "1",
            "name":"Eriks teashop",
            "description": "Some fine stuff here",
            "address": "Drottninggatan 12"
        },
        {
            "_id": "2",
            "name":"Kostas drugstore",
            "description": "Some fine stuff here",
            "address": "Drottninggatan 81"
        }]
    };

    function getAllStores(params) {

        return getMocked("/sellers");
        return BaseService.httpGet({
            url: '/items',
            httpOpts: {
                params: params
            }
        });
    }

    function getStoreById(id, params) {
        return getMocked("/sellers").then(function(data) {
            return data[id];
        });
        // return BaseService.httpGet({
        //     url: '/sellers/' + id,
        //     httpOpts: {
        //         params: params
        //     }
        // });
    }

    function getItemsForStore(id, params) {

        return getMocked("/sellers/" + id + "/items");
        // return BaseService.httpGet({
        //     url: '/sellers/' + id + '/items',
        //     httpOpts: {
        //         params: params
        //     }
        // });
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
        getStoreById: getStoreById,
        getItemsForStore: getItemsForStore
    };

}]);