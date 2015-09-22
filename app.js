Parties = new Mongo.Collection("parties");

if (Meteor.isClient) {
  angular.module('angeor', ['angular-meteor', 'ui.router']);

  angular.module('angeor').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('parties', {
          url: '/parties',
          templateUrl: 'parties-list.ng.html',
          controllerAs: 'PartiesListCtrl as partyList'
        })
        .state('partyDetails', {
          url: '/parties/:partyId',
          templateUrl: 'party-details.ng.html',
          //controllerAs: 'PartyDetailsCtrl as partyDetail'
            controllerAs: 'PartiesListCtrl as partyList'
        });

      $urlRouterProvider.otherwise("/parties");
    }]);

  angular.module('angeor').controller('PartiesListCtrl', [ '$scope','$meteor', '$stateParams', function ( $scope,$meteor,$stateParams) {
    var vm = this;
    $scope.parties = $meteor.collection(Parties);

    $scope.remove = function(party){
      $scope.parties.remove(party);
    };

    $scope.removeAll = function(){
      $scope.parties.remove();
    };

    $scope.partyId = $stateParams.partyId;
  }]);

  //angular.module("angeor").controller("PartyDetailsCtrl", [ '$scope','$stateParams',
  //  function( $scope, $stateParams){
  //    var vm = this;
  //    vm.partyId = $stateParams.partyId;
  //
  //  }]);
  angular.module("angeor").controller("PartyDetailsCtrl", ['$scope', '$stateParams',
      function($scope, $stateParams){

      $scope.partyId = $stateParams.partyId;
     }]);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Parties.find().count() === 0) {
      var parties = [
        {'name': 'Dubstep-Free Zone',
          'description': 'Fast just got faster with Nexus S.'},
        {'name': 'All dubstep all the time',
          'description': 'Get it on!'},
        {'name': 'Savage lounging',
          'description': 'Leisure suit required. And only fiercest manners.'}
      ];
      for (var i = 0; i < parties.length; i++)
        vm.Parties.insert(parties[i]);
    }
  });
}