'use strict';

angular.module('shit.services.BaseService',[])
.service('BaseService', ['$q','$http', function($q, $http) {

    var APIBASE = "http://146.148.25.35/api";
    function httpGet(options, dataTransformer) {

        var deferred = $q.defer();
        $http.get(APIBASE + options.url, options.httpOpts)
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
        $http.post(APIBASE + options.url, options.body, options.httpOpts)
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
        $http.put(APIBASE + options.url, options.body, options.httpOpts)
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