var app = angular.module('itgApp', []);

app.controller("MainController", ["$scope", "$http", function($scope, $http, config) {
    $scope.state = {
        variables: window.ionicVariables,
        currentUuid: "78ec3e08-9ced-409d-ae57-6d687376eab0"
    }

    $scope.save = function() {
        $http.post('/process', { variables: $scope.state.variables })
        .success(function(data) {
            $("iframe").attr("src", "/kitchensink?q=" + data);
        });
    }
}]);