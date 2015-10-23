/**
 * Created by Kaka Hoang Huy on 9/30/2015.
 */
app.controller('IssueCtrl',['$scope', 'dataService', 'mySharedService', function ($scope, dataFactory, mySharedService) {

  //Fill data to List
  $scope.issueCategories = [
    {categoryID: 1, categoryName: 'Accident or Personal working' },
    {categoryID: 2, categoryName: 'Goods is broken' }
  ];

  $scope.countries = [
    {id: 1, text: 'USA', checked: false, icon: null},
    {id: 2, text: 'France', checked: false, icon: null},
    {id : 3, text: 'Japan3', checked: true, icon: null}
  ];

  $scope.types_text = 'Choose Type of Issue';
  $scope.orders_text = 'Order get an Issue';
  $scope.val =  {single: null, multiple: null};

  if (undefined !== mySharedService.message && mySharedService.message !== '') {

    //console.log('rs', mySharedService.message);
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
    if (undefined !== rs['Pickup'] && rs['Pickup'].length) {
      $scope.pickupTasks = rs['Pickup'];
      $scope.badgeCountPick = rs['Pickup'].length;
    } else {
      $scope.pickupTasks = [];
      $scope.badgeCountPick = 0;
    }
    if (undefined !== rs['Ship'] && rs['Ship'].length) {
      $scope.shipTasks = rs['Ship'];
      $scope.badgeCountShip = rs['Ship'].length;
    } else {
      $scope.shipTasks = [];
      $scope.badgeCountShip = 0;
    }
    if (undefined !== rs['Express'] && rs['Express'].length) {
      $scope.expressTasks = rs['Express'];
      $scope.badgeCountExpress = rs['Express'].length;
    } else {
      $scope.expressTasks = [];
      $scope.badgeCountExpress = 0;
    }
  }

}]);

/*
 * By QuyenNV - 23/10/2015
 *
 * Create fancy select directive
 *
 * */
app.directive('fancySelect',[
  '$ionicModal',
  function($ionicModal) {
    return {
      /* Only use as <fancy-select> tag */
      restrict : 'E',

      /* Our template */
      templateUrl: 'fancy-select.html',

      /* Attributes to set */
      scope: {
        'items'        : '=', /* Items list is mandatory */
        'text'         : '=', /* Displayed text is mandatory */
        'value'        : '=', /* Selected value binding is mandatory */
        'callback'     : '&'
      },

      link: function (scope, element, attrs) {

        /* Default values */
        scope.multiSelect   = attrs.multiSelect === 'true' ? true : false;
        scope.allowEmpty    = attrs.allowEmpty === 'false' ? false : true;

        /* Header used in ion-header-bar */
        scope.headerText    = attrs.headerText || '';

        /* Text displayed on label */
        // scope.text          = attrs.text || '';
        scope.defaultText   = scope.text || '';

        $ionicModal.fromTemplateUrl(
          'fancy-select-items.html',
          {'scope': scope}
        ).then(function(modal) {
            scope.modal = modal;
          });

        /* Validate selection from header bar */
        scope.validate = function (event) {
          // Construct selected values and selected text
          if (scope.multiSelect == true) {

            // Clear values
            scope.value = '';
            scope.text = '';

            // Loop on items
            scope.items.forEach(function(item){
              if (item.checked) {
                scope.value = scope.value + item.id+';';
                scope.text = scope.text + item.text+', ';
              }
            });

            // Remove trailing comma
            scope.value = scope.value.substr(0,scope.value.length - 1);
            scope.text = scope.text.substr(0,scope.text.length - 2);
          }

          // Select first value if not nullable
          if (typeof scope.value == 'undefined' || scope.value == '' || scope.value == null ) {
            if (scope.allowEmpty == false) {
              if (scope.multiSelect == true) {
                scope.value = scope.items[0].id;
                scope.text = scope.items[0].text;
              } else {
                scope.value = scope.items[0].categoryID;
                scope.text = scope.items[0].categoryName;
              }

              // Check for multi select
              scope.items[0].checked = true;
            } else {
              scope.text = scope.defaultText;
            }
          }

          // Hide modal
          scope.hideItems();

          // Execute callback function
          if (typeof scope.callback == 'function') {
            scope.callback (scope.value);
          }
        }

        /* Show list */
        scope.showItems = function (event) {
          event.preventDefault();
          scope.modal.show();
        }

        /* Hide list */
        scope.hideItems = function () {
          scope.modal.hide();
        }

        /* Destroy modal */
        scope.$on('$destroy', function() {
          scope.modal.remove();
        });

        /* Validate single with data */
        scope.validateSingle = function (item) {

          // Set selected text
          scope.text = item.categoryName;

          // Set selected value
          scope.value = item.categoryID;

          // Hide items
          scope.hideItems();

          // Execute callback function
          if (typeof scope.callback == 'function') {
            scope.callback (scope.value);
          }
        }
      }
    };
  }
]);


