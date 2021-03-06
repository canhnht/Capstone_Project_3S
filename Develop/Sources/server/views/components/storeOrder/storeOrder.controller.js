/**
 * Created by hoanglvq on 9/22/15.
 */

function storeOrderController($scope, $state, dataService) {
    $scope.order={
        storeid: '',
        ordertypeid: '',
        pickupaddress: '',
        deliveryaddress: '',
        pickupdate: '',
        deliverydate: '',
        recipientphone: '',
        recipientname: '',
        ledgerid: '',
        statusid: '1',
        ispending: 'false',
        isdraff: '',
        fee: '',
        cod: ''
    }

    $scope.good={
        orderid: '',
        stockid: '',
        weight: '',
        lengthsize: '',
        widthsize: '',
        heightsize: '',
        description: ''
    }
    ;

    $scope.$watch('$viewContentLoaded', function (event) {
        caplet();

        ///////////////////////////////////////////////////
        //////////....Animation for wizard..../////////////
        ///////////////////////////////////////////////////
        $(document).ready(function () {
            $('#rootwizard').bootstrapWizard({
                tabClass: "nav-wizard",
                onTabShow: function (tab, navigation, index) {
                    tab.prevAll().addClass('completed');
                    tab.nextAll().removeClass('completed');
                    if (tab.hasClass("active")) {
                        tab.removeClass('completed');
                    }
                    var $total = navigation.find('li').length;
                    var $current = index + 1;
                    var $percent = ($current / $total) * 100;
                    $('#rootwizard').find('.progress-bar').css({width: $percent + '%'});
                    $('#rootwizard').find('.wizard-status span').html($current + " / " + $total);
                }
            });

            $('#validate-wizard').bootstrapWizard({
                tabClass: "nav-wizard",
                onNext: function (tab, navigation, index) {
                    var content = $('#step' + index);
                    if (typeof  content.attr("parsley-validate") != 'undefined') {
                        var $valid = content.parsley('validate');
                        if (!$valid) {
                            return false;
                        }
                    }
                    ;
                    // Set the name for the next tab
                    $('#step4 h3').find("span").html($('#fullname').val());
                },
                onTabClick: function (tab, navigation, index) {
                    $.notific8('Please click <strong>next button</strong> to wizard next step!! ', {
                        life: 5000,
                        theme: "danger",
                        heading: " Wizard Tip :); "
                    });
                    return false;
                },
                onTabShow: function (tab, navigation, index) {
                    tab.prevAll().addClass('completed');
                    tab.nextAll().removeClass('completed');
                    if (tab.hasClass("active")) {
                        tab.removeClass('completed');
                    }
                    var $total = navigation.find('li').length;
                    var $current = index + 1;
                    var $percent = ($current / $total) * 100;
                    $('#validate-wizard').find('.progress-bar').css({width: $percent + '%'});
                    $('#validate-wizard').find('.wizard-status span').html($current + " / " + $total);
                }
            });

            handleStatusChanged();

        });

        ///////////////////////////////////////////////////
        //....Disable textbox when click on checkbox....///
        ///////////////////////////////////////////////////
        function handleStatusChanged() {
            $('#disElementCb').on('change', function () {
                if ($('#disElementCb').is(':checked')) {
                    $('#elementsToDis :input').attr('disabled', true);
                } else {
                    $('#elementsToDis :input').removeAttr('disabled');
                }
            });

            $('#enElementCb').on('change', function () {
                if (!$('#enElementCb').is(':checked')) {
                    $('#elementsToEn :input').attr('disabled', true);
                } else {
                    $('#elementsToEn :input').removeAttr('disabled');
                }
            });
        }


    });
    getDataFromServer();
    //postDataToServer();

    function getDataFromServer() {
        var urlBase = 'http://localhost:3000/orders';
        dataService.getDataServer(urlBase)
            .success(function (rs) {
                $scope.ordersWaiting = rs['Waiting'];
                $scope.orderCarring = rs['Carrying'];
            })
            .error(function (error) {
                console.log('Unable to load customer data: ' + error);
            });
    }


    //function postDataToServer(){
    //    var urlBase = 'http://localhost:3000/orders';
    //    $scope.order = {
    //
    //    };
    //
    //    dataService.postDataServer(urlBase,$scope.order)
    //}
}


storeOrderController.$inject = ['$scope', '$state', 'dataService'];
angular.module('app').controller('storeOrderController', storeOrderController);

