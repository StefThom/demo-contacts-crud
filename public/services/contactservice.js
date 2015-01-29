/**
 * Created by in134bel on 29-1-2015.
 */
var myApp = angular.module('ContactService',[]);

myApp.service('DataService', function($http){

    this.save = function(data,callback) {
        $http({
            method: 'POST',
            url: '/contact/save',
            data: data,
            headers: {
                'Content-type': 'application/json'
            }
        }).success(function(resp){
                callback(resp);
            }).error(function(){
                callback(undefined);
            });

    };
    this.read = function(callback) {
        $http({
            method: 'GET',
            url: '/contact/getall',
            headers: {
                'Content-type': 'application/json'
            }
        }).success(function(resp){
                callback(resp);
            }).error(function(){
                callback(undefined);
            });

    };
    this.delete = function(id,callback) {
        var postdata = {
            id: id
        };
        $http({
            method: 'POST',
            url: '/contact/delete',
            data: postdata,
            headers: {
                'Content-type': 'application/json'
            }
        }).success(function(resp){
                callback(resp);
            }).error(function(){
                callback(undefined);
            });

    };

});


myApp.controller('MyControlller', function($scope,DataService) {
    $scope.contacts = [];
    $scope.contact = {};
    $scope.result = {};

    $scope.getAllData = function() {
        DataService.read(function(data){
            $scope.contacts = data;
        });

    };
    $scope.edit = function(contact) {
        $scope.contact = contact;
    };
    $scope.delete = function(id) {
        var r = confirm("Are you sure to delete this item?");
        if(r==true) {
            DataService.delete(id,function(code,err){
                if(code==1) {
                    alert("Deleted data was success");
                }else {
                    alert("Deleted data was failed. Error: " + err);
                }

            });
        }
    };
    $scope.save = function() {
        DataService.save($scope.contact,function(code,err){
            if(code==1) {
                alert("Deleted data was success");
            }else {
                alert("Save failed. Error: ");
            }
            $scope.result = err;
            $scope.contact = {};

        });
    };

});