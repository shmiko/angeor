/**
 * Created by pauljones on 23/09/15.
 */
angular.module('angeor').controller('PartiesListCtrl', [ '$scope','$meteor',  function ( $scope,$meteor) {
    var vm = this;
    vm.parties = $meteor.collection(Parties);

    vm.remove = function(party){
        vm.parties.remove(party);
    };

    vm.removeAll = function(){
        vm.parties.remove();
    };

}]);