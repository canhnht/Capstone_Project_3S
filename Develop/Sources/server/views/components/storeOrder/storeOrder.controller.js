/**
 * Created by hoanglvq on 9/22/15.
 */

function storeOrderController($scope,$state){

    $scope.$watch('$viewContentLoaded', function(event) {
        caplet();
    });

}

storeOrderController.$inject = ['$scope','$state'];
angular.module('app').controller('storeOrderController',storeOrderController);

