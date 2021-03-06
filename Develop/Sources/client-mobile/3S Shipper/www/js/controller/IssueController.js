/**
 * Created by Kaka Hoang Huy on 9/30/2015.
 */
app.controller('IssueCtrl',['$scope','$ionicPopup' , 'dataService', 'mySharedService', function ($scope, $ionicPopup, dataFactory, mySharedService) {

  if (undefined !== mySharedService.message && mySharedService.message !== '') {
    formatData(mySharedService.message);
  } else {
    console.log('save message sharing');
    getDataFromServer();
  }

/*
 * By QuyenNV - 23/10/2015
 *
 * This function is call API
 *
 * */
  function getDataFromServer() {
    var urlBase = 'http://localhost:3000/api/tasks';
    dataFactory.getDataServer(urlBase)
      .success(function (rs) {
        mySharedService.prepForBroadcast(rs);
        formatData(rs);
      })
      .error(function (error) {
        console.log('Unable to load customer data: ' + error);
      });
  }

/*
 * By QuyenNV - 23/10/2015
 *
 * This function is format data respon from from server
 * @param: rs
 * */
  function formatData(rs) {
    var listOrders = [];
    if (undefined !== rs['Pickup'] && rs['Pickup'].length) {
      rs['Pickup'].forEach(function(item) {
        listOrders.push({
          'val': item.orderid,
          'text': item.orderid
          //'statusId': item.statusid,
          //'statusName': item.statusname,
          //'pickupAdd': item.pickupaddress,
          //'deliveryAdd': item.deliveryaddress
        });
      });
    }
    if (undefined !== rs['Ship'] && rs['Ship'].length) {
      rs['Ship'].forEach(function(item) {
        listOrders.push({
          'val': item.orderid,
          'text': item.orderid
        });
      });
    }
    if (undefined !== rs['Express'] && rs['Express'].length) {
      rs['Express'].forEach(function(item) {
        listOrders.push({
          'val': item.orderid,
          'text': item.orderid
        });
      });
    }
    //Fill to "Order" dropdown list
    $scope.selectable = listOrders;
  }

  //Fill to "Type" dropdown list
  $scope.issueCategories = [
    {categoryID: "1", categoryName: 'Accident' },
    {categoryID: "2", categoryName: 'Goods is broken' }
  ];
  //Item lable display
  $scope.parseMulti = function(items){
    if(items){
      return items.map(function(item){ return item.text; }).join(', ');
    }
  };

  /*
   * By QuyenNV - 24/10/2015
   *
   * This function submit
   * @param: issue
   * */
  $scope.submitData = function (issue) {
    //Validation
      if ( typeof issue === "undefined" || issue.category === null) {
        $ionicPopup.alert({
          title: 'Information',
          content: 'Please choose Type !'
        }).then(function(res) {
        });
      } else if (typeof issue.issuedOrder === "undefined" || issue.issuedOrder.length == 0) {
        $ionicPopup.alert({
          title: 'Information',
          content: 'Please choose Order !'
        }).then(function(res) {
        });
      } else if (typeof issue.content === "undefined" || issue.content === "") {
        $ionicPopup.alert({
          title: 'Information',
          content: 'Please write Content !'
        }).then(function(res) {
        });
      } else {
        //post an API
        var urlCreateBase = 'http://localhost:3000/api/issue';
        dataFactory.postDataServer(urlCreateBase, issue)
          .success(function (rs) {
            $ionicPopup.alert({
              title: 'Success',
              content: 'Your Issue is sent to Admin'
            }).then(function(res) {
              //Reset Values
              var delIndex;
              issue.issuedOrder.forEach(function(item) {
                $scope.selectable.forEach(function(i) {
                  if (i.val === item.val) {
                    delIndex = $scope.selectable.indexOf(i);
                    if (delIndex != -1) {
                      $scope.selectable.splice(delIndex, 1);
                    }
                  }
                });
              });
              issue.content = '';
              issue.category = null;
              issue.issuedOrder = [];

              //call API
              getDataFromServer();
            });
          })
          .error(function (error) {
            console.log('Unable to load customer data: ' + error);
          });
      }
  }
}]);


