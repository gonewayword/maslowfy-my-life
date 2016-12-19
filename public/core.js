var maslow = angular.module('maslow', [

  ])
  .controller('maslowCTRL', function($scope, $http) {
    $scope.formData = {};

    $http.get('/api/maslows')
      .success(function(data){
        $scope.maslows = data;
        console.log(data, 'so this is data?!?!?');
      })
      .error(function(data){
        console.log(`Error: ${data}`);
      });

    $scope.createMaslow = function() {
      $http.post('/api/maslows', $scope.formData)
        .success(function(data){
          $scope.formData = {};
          $scope.maslows = data;
          console.log(data, 'heres data in createmaslow');
        })
        .error(function(data){
          console.log(`Error: ${data}`);
        })
    };

    $scope.deleteMaslow = function(id) {
      $http.delete('/api/maslows/' + id)
        .success(function(data) {
          $scope.maslows = data;
          console.log(data);
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
