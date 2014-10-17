'use strict';

angular.module('scrollviewTestApp')
  .controller('MainCtrl', function ($scope, $famous, $timeline) {

    var EventHandler = $famous["famous/core/EventHandler"];
    var Transitionable = $famous["famous/transitions/Transitionable"];
    var TouchSync = $famous["famous/inputs/TouchSync"];

    $scope.tabs = ["mountains", "lake", "shore"];

    $scope.scrollEvents = new EventHandler();

    $scope.width = function() {
      return window.innerWidth * 5;
    };

    var sync = new TouchSync();
    $scope.scrollEvents.pipe(sync);

    sync.on("update", function(data) {
      console.log(position.get());
      position.set(Math.min(Math.max(0, position.get() - data.delta[0] / 200), 2));
    });

    sync.on("end", function(data) {
      console.log(position.get());
      position.set(Math.round(position.get()), {duration: 100});
    });

    var position = new Transitionable(0);

    $scope.goTo = function(i) {
      position.set(i, {duration: 200, transition: "inOutQuartic"});
    };

    $scope.timeline = function(i) {
      return  i - position.get();
    };

    $scope.xTranslate = function(t) {
      return t * 40 - 100;
    };

    $scope.zTranslate = $timeline([
        [-1, -100],
        [0, 0],
        [1, -100],
    ]);

    $scope.opacity = $timeline([
      [0, 1],
      [1, 0]
    ]);

    $scope.tabOpacity = $timeline([
      [-1, 0.5],
      [0, 0],
      [1, 0.5]
    ]);

  });
