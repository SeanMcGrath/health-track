'use strict';

angular.module('healthTrackApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.trackers = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $http.get('/api/trackers').success(function(trackers) {
      $scope.trackers = trackers;
      socket.syncUpdates('tracker', $scope.trackers);
    });

    $scope.deleteTracker = function(thing) {
      $http.delete('/api/trackers/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('tracker');
    });
  });
