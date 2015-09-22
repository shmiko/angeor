/**
 * Created by pauljones on 23/09/15.
 */
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
                controller: 'PartyDetailsCtrl'
            });

        $urlRouterProvider.otherwise("/parties");
    }]);