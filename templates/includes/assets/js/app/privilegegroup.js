var app = angular.module('myApp', []).config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('{a');
    $interpolateProvider.endSymbol('a}');
}]);
app.controller('PrivilegeGroup', ['$scope','$http', function($scope,$http) {


}]);