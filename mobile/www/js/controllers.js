angular.module('starter.controllers', ['firebase'])

.controller('DashCtrl', function($scope,$firebaseObject) {
  var ref  = new Firebase("https://debatest.firebaseio.com/");
  var fbTemp = $firebaseObject(ref.child('temp'));
  fbTemp.$bindTo($scope, 'temp');

  var fbSwitch = $firebaseObject(ref.child('switch'));
  fbSwitch.$bindTo($scope, 'switch');
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
