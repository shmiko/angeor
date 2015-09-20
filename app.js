if (Meteor.isClient) {
  angular.module('angeor',['angular-meteor']);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
