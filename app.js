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
            controller: 'PartiesListCtrl',
            controllerAs: 'vm'
        })
        .state('partyDetails', {
          url: '/parties/:partyId',
          templateUrl: 'party-details.ng.html',
          //controllerAs: 'PartyDetailsCtrl as partyDetail'
            controller: 'PartyDetailsCtrl'
        });

      $urlRouterProvider.otherwise("/parties");
    }]);

  angular.module('angeor').controller('PartiesListCtrl', [ '$scope','$meteor', '$stateParams', function ( $scope,$meteor,$stateParams) {
    var vm = this;
    vm.parties = $meteor.collection(Parties);

    vm.remove = function(party){
      vm.parties.remove(party);
    };

    vm.removeAll = function(){
      vm.parties.remove();
    };

    vm.partyId = $stateParams.partyId;
  }]);

  //angular.module("angeor").controller("PartyDetailsCtrl", [ '$scope','$stateParams',
  //  function( $scope, $stateParams){
  //    var vm = this;
  //    vm.partyId = $stateParams.partyId;
  //
  //  }]);
  angular.module("angeor").controller("PartyDetailsCtrl", ['$scope', '$stateParams',
      function($scope, $stateParams){

        $scope.party = $meteor.object(Parties, $stateParams.partyId);

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