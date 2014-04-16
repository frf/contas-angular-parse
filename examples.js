Parse.initialize("ezwTgQirFdjt1dnPiidr0nV1eqr9ARiOa3h43CgL", "S64qIhW7OhynJErsvmmYG1dV2nKw2YUk42AckFKK");

var app = angular.module('MobileAngularUiExamples', [
    "ngRoute",
    "mobile-angular-ui",
    "mobile-angular-ui.touch",
    "mobile-angular-ui.scrollable"
]);

app.config(function($routeProvider) {
    $routeProvider.when('/', {templateUrl: "home.html"});
    $routeProvider.when('/add-lancamento', {templateUrl: "add-lancamento.html"});
    $routeProvider.when('/listar-lancamento', {templateUrl: "listar-lancamento.html"});
    $routeProvider.when('/add-pgto', {templateUrl: "add-forma-pgto.html"});
    $routeProvider.when('/add-pgto/:id', {templateUrl: "add-forma-pgto.html",controller: 'EditPgtoController'});
    $routeProvider.when('/pgto', {templateUrl: "pgto.html"});
});

getPgto = function(id){
    
    console.log("ENTREI NA FNCAO");
    
    var Pgto = Parse.Object.extend("Pgto");
    var query = new Parse.Query(Pgto);
    var ObjetoReturn = {};
    
    query.get(id,{
      success: function(results) {
          ObjetoReturn = results;
      },
      error: function(error) {
        //alert("Error: " + error.code + " " + error.message);
      }
    });
    
    return ObjetoReturn;
    
}
function EditPgtoController($scope, $routeParams) {
    console.log($routeParams.id);
    
    console.log(getPgto($routeParams.id));
    
    $scope.id   = $routeParams.id;
    $scope.name = ">>";
    
    
}
app.controller('MainController', function($rootScope,$scope) {

    $rootScope.$on("$routeChangeStart", function() {
        $rootScope.loading = true;
    });

    $rootScope.$on("$routeChangeSuccess", function() {
        $rootScope.loading = false;
    });
        
    $scope.savePgto = function(){
        console.log($scope.name);
       //pgtoService.savePgto($scope.user.name);
        //$scope.user.name = '';
    }
    
    var pgtoObj = new Object();
    var aObj = [];
    
    var Pgto = Parse.Object.extend("Pgto");
    var query = new Parse.Query(Pgto);
    
    query.find({
      success: function(results) {
        //alert("Successfully retrieved " + results.length + " scores.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          aObj[i] = new Object({id:object.id,nome:object.get('nome')});
        }

        $scope.scrollItems = aObj;
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
});
