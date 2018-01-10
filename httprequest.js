var app = angular.module('service_getTouTiao', []);
app.factory('getTouTiao', ['$q', '$http', '$httpParamSerializerJQLike', function($q, $http, $httpParamSerializerJQLike) {

    var requestInfo = function(type) {
        var params = { type: type };

        var config = {
            method: 'GET',
            url: './getnews.php',
            params: params,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };
        var defferred = $q.defer();
        $http(config)
            .success(function(data, status) {
                defferred.resolve(data);
            })
            .error(function(error) {
                // console.log(error);
                defferred.reject(error);
            });
        return defferred.promise;
    };
    return {
        request: requestInfo
    };
}]);