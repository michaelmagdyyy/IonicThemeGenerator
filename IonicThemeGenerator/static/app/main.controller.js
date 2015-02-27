var app = angular.module('itgApp', []);

app.controller("MainController", ["$scope", "$http", function($scope, $http, config) {
    $scope.state = {
        variables: window.ionicVariables,
        currentUuid: "78ec3e08-9ced-409d-ae57-6d687376eab0",
        saving: false
    }

    $scope.save = function () {
        $scope.state.saving = true;
        var sassVars = [];

        for (var i = 0; i < $scope.state.variables.length; i++) {
            if (!$scope.state.variables[i].isAccordionStart) {
                sassVars.push($scope.state.variables[i]);
            }
        }

        $http.post('/process', { variables: sassVars })
        .success(function (data) {
            $("iframe").attr("src", "/kitchensink?q=" + data);
            $scope.state.saving = false;
        });
    }
}]);