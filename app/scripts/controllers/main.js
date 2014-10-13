'use strict';

angular.module('scrollviewTestApp')
  .controller('MainCtrl', function ($scope, $famous) {

    var EventHandler = $famous["famous/core/EventHandler"];

    $scope.scrollEvents = new EventHandler();

    var playWiggle = function() {
      $scope.play = false;
      $scope.$digest();
      $scope.play = true;
      $scope.$digest();
    };

    document.addEventListener("keypress", function(e) {
      if (e.which === 13) {
        playWiggle();
      }
    });

  });
