angular.module('detailView', []).
  component('detailView', {
    templateUrl: 'detail-view/detail-view.template.html',
    controller: function($scope){
      console.log($scope.maslow);
    }
  });
