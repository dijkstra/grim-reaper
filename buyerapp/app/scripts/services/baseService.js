'use strict';

angular.module('shit.services.BaseService',[])
.service('BaseService', ['$q','$http', function($q, $http) {

    function httpGet(options, dataTransformer) {

        var deferred = $q.defer();
        $http.get(options.url, options.httpOpts)
            .success(function(data) {
                if (dataTransformer && typeof dataTransformer === 'function') {
                    dataTransformer(data);
                }
                deferred.resolve(data);
            }).error(deferred.reject);

        return deferred.promise;
    }

    function httpPost(options, dataTransformer) {

        var deferred = $q.defer();
        $http.post(options.url, options.body, options.httpOpts)
            .success(function(data) {
                if (dataTransformer && typeof dataTransformer === 'function') {
                    dataTransformer(data);
                }
                deferred.resolve(data);
            }).error(deferred.reject);

        return deferred.promise;
    }

    function httpPut(options, dataTransformer) {

        var deferred = $q.defer();
        $http.put(options.url, options.body, options.httpOpts)
            .success(function(data) {
                if (dataTransformer && typeof dataTransformer === 'function') {
                    dataTransformer(data);
                }
                deferred.resolve(data);
            }).error(deferred.reject);

        return deferred.promise;
    }
    return {
        httpGet: httpGet,
        httpPost: httpPost,
        httpPut: httpPut
    };
}]);