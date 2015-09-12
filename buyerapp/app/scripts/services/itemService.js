'use strict';

angular.module('shit.services.ItemService',[])
.service('ItemService', ['$q', 'BaseService', function($q, BaseService) {

    var mockedData = {
        "/items": [
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
        ]
    };

    function getAllItems(params) {

        return getMocked("/items");
        // return BaseService.httpGet({
        //     url: '/items',
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
        getAllItems: getAllItems
    };

}]);