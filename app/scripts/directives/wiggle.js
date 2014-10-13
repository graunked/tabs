'use strict';

angular.module('scrollviewTestApp')
  .directive('wiggle', function () {
    return {
      transclude: true,
      template: '<fa-modifier fa-origin="[0.5, 0.5]" fa-rotate-z="rotate(t.get())"><div ng-transclude></div></fa-modifier>',
      restrict: 'E',
      controller: function($scope, $famous, $timeline) {

        var Transitionable = $famous["famous/transitions/Transitionable"];
        var Easing = $famous["famous/transitions/Easing"];

        $scope.t = new Transitionable(0);
        window.t = $scope.t;

        $scope.$watch("play", function(newVal, oldVal) {
          if (newVal) {
            $scope.t.set(0);
            $scope.t.set(1, {duration: 500});
          }
        });

        var wiggle = function(t) {
          var r = (1 - t*t*t) * Math.sin(t * Math.PI * 4) * Math.PI / 10;
          return r;
        };

        window.wiggle  = wiggle

        $scope.rotate = $timeline([
          [0, 0, wiggle],
          [1.01, 1]
        ]);

        window.rotate = $scope.rotate;

      }
    };
  });
