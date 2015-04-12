'use strict';

angular.module('healthTrackApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.trackers = [];

    $http.get('/api/trackers').success(function(trackers) {
      $scope.trackers = trackers;
      // trackers.forEach(function(tracker){
      //   tracker.editable = false;
      // });
      socket.syncUpdates('tracker', $scope.trackers);
    });

    $scope.deleteTracker = function(tracker) {
      $http.delete('/api/trackers/' + tracker._id);
    };

    $scope.updateTracker = function(tracker) {
      if(tracker.editable){
        socket.unsyncUpdates('tracker')
      }
      else{
        socket.syncUpdates('tracker', $scope.trackers);
      }
      $http.put('/api/trackers/' + tracker._id, tracker);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('tracker');
    });
  });
