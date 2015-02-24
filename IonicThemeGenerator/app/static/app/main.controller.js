var app = angular.module('itgApp', []);

app.controller("MainController", ["$scope", "$http", function($scope, $http, config) {
    $scope.state = {
        variables: window.ionicVariables
    }

    $scope.save = function() {
        $http.post('/process', { variables: $scope.state.variables })
        .success(function(data) {
            console.log(data);
        });
    }
}]);