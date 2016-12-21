var maslow = angular.module('maslow', [
  'ngRoute',
  'ngAnimate'
  ])
  .controller('maslowCTRL', function($scope, $http) {
    $scope.formData = {};

    $scope.emptyCheck = function(item) {
      if(item === ""){
        return false;
      } else {
        return true;
      }
    }

    $http.get('/api/maslows')
      .success(function(data){
        $scope.maslows = data;
        // console.log(data, 'so this is data?!?!?');
      })
      .error(function(data){
        console.log(`Error: ${data}`);
      });

    $scope.createMaslow = function() {

        // console.log(id, 'heres id in create maslow');

        $http.post('/api/maslows/', $scope.formData)
          .success(function(data){
            console.log(data, 'data in ');
            console.log(data, 'data after adding');
            $scope.formData = {};
            $scope.maslows = data;
          })
          .error(function(data){
            console.log(`Error: ${data}`);
          })

    };

    $scope.deleteMaslow = function(id) {
      console.log(id, 'id should be workingin here')

      $http.delete('/api/maslows/' + id)
        .success(function(data) {
          $scope.maslows = data;
          // console.log(data, 'after deleting');
        })
        .error(function(data) {
          console.log(`Error: ${data}`);
        });
    };

  })
  .directive( "mwConfirmClick", [
  function( ) {
    return {
      priority: -1,
      restrict: 'A',
      scope: { confirmFunction: "&mwConfirmClick" },
      link: function( scope, element, attrs ){
        element.bind( 'click', function( e ){
          // message defaults to "Are you sure?"
          var message = attrs.mwConfirmClickMessage ? attrs.mwConfirmClickMessage : "Are you sure?";
          // confirm() requires jQuery
          if( confirm( message ) ) {
            scope.confirmFunction();
          }
        });
      }
    }
  }
])
