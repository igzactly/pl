

var app = angular.module('myApp', []).config(['$interpolateProvider', function($interpolateProvider) {
                    $interpolateProvider.startSymbol('{a');
                    $interpolateProvider.endSymbol('a}');
            }]);

app.controller('AdminController', ['$scope','$http', function($scope,$http) {
            $scope.action = 0; // 0 = ADD , 1 = UPDATE , 2 = DELETE 
            $scope.adminName="";
            $scope.adminEmail = "";
            $scope.adminPhone = "" ;
            $scope.adminPrivilegeGroup="";
            $scope.adminPriv = 0;
            $scope.selectedAdminiD = 0;
                postdata="";
                $http.get("admin/getAllAdmins").then( function(response) { 
                    $scope.admins = response.data; 
                 });
                 $http.get("admin/getAllActivePrivilegeGroups").then( function(response) { 
                    
                    $scope.privilegegroups = response.data.data;
                    $("#prvilegeGroupTb").addClass("form-control select");
                  
                 });

            $scope.loadModal= function(action){
                $scope.action = action;
                $("#entity_modal").modal('show');
                


            }
            $scope.getDetails= function(){
                $scope.action = 2;
                var newObj= new Object();
                newObj.id= $scope.selectedAdminiD;
                postdata=JSON.stringify(newObj);
                console.log(postdata);
                var post = $http({
                    method: "POST",
                    url: "admin/getAdminDetails",
                    dataType: 'json',
                    data: postdata,
                    headers: {'Content-Type': 'application/json'}
                }).then(function successCallback(response) {
                    var admin = response.data.data;
                    $scope.adminName=admin[1];
                    $scope.adminEmail=admin[2];
                    $scope.adminPhone=admin[3];
                    $scope.adminPriv = admin[4];
                    $("#entity_modal").modal('show');
             
             
                 }, function errorCallback(response) {

             
             });
     
                
                 

            }

            $scope.selectAdmin  = function(id){
                $scope.selectedAdminiD = id;
            }

            $scope.submitForm = function(){
                var newObj = new Object();
                newObj.id = $scope.selectedAdminiD;
                newObj.name = $scope.adminName;
                newObj.email = $scope.adminEmail;
                newObj.phone = $scope.adminPhone;
                newObj.priv = $scope.adminPriv;
                postdata = JSON.stringify(newObj);
                switch($scope.action){
                    case 1:
                        // Add Code Here
                        var post = $http({
                            method: "POST",
                            url: "admin/addAdmin",
                            dataType: 'json',
                            data: postdata,
                            headers: {'Content-Type': 'application/json'}
                        }).then(function successCallback(response) {
                            showSuccessMessage("Admin "+ $scope.adminName+" Details Added Sucessfully ! ");
                            $("#entity_modal").modal('hide');
                     
                     
                         }, function errorCallback(response) {
        
                     
                     });
                        break;
                    case 2:
                        //Update Code Here 
                        var post = $http({
                            method: "POST",
                            url: "admin/updateAdmin",
                            dataType: 'json',
                            data: postdata,
                            headers: {'Content-Type': 'application/json'}
                        }).then(function successCallback(response) {
                            showSuccessMessage("Admin "+ $scope.adminName+" Details Updated Sucessfully ! ");
                            $("#entity_modal").modal('hide');
                     
                     
                         }, function errorCallback(response) {
        
                     
                     });
                        break;
                }
            }

            }]);