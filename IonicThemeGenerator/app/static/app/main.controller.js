var app = angular.module('itgApp', []);

app.controller("MainController", ["$scope", "$http", function($scope, $http, config) {
    $scope.state = {
        variables: window.ionicVariables,
        saving: false,
        currentUrl: ''
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
            $(".download-button").attr('href', '/static/temp/' + data + '/output.css'); // hate it but don't have time to fix this yet :)
            $scope.state.currentUrl = 'http://' + window.location.host + '/static/temp/' + data + '/output.css';
            $scope.state.saving = false;
        });
    }
}]);