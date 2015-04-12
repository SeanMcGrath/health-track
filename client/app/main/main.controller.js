'use strict';

function escapeRegExp(string){
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

angular.module('healthTrackApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.trackers = [];

    $http.get('/api/trackers').success(function(trackers) {
      $scope.trackers = trackers;
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

    $scope.search = ''
    var regex;
    $scope.$watch('search', function (value) {
        regex = new RegExp('\\b' + escapeRegExp(value), 'i');
    });

    $scope.filterBySearch = function(tracker) {
        if (!$scope.search) return true;
        return regex.test(tracker.first + ' ' + tracker.last);
    };
  });
