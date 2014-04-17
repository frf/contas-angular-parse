/* App Module */
var app = angular.module('MobileAngularUiExamples', 
    ["ngRoute",
        "MinhasDirectives",
        "MeusControllers",
        "MeusServicos",
        "mobile-angular-ui",
        "mobile-angular-ui.touch",
        "mobile-angular-ui.scrollable"]);


app.config(function($routeProvider) {
    $routeProvider.when('/', {templateUrl: "home.html"});
    $routeProvider.when('/add-lanc', {templateUrl: "add-lancamento.html"});
    $routeProvider.when('/add-lanc/:id', {templateUrl: "add-lancamento.html"});
    $routeProvider.when('/lancamento', {templateUrl: "listar-lanc.html",controller:'lancamentoController'});
    $routeProvider.when('/add-pgto', {templateUrl: "add-forma-pgto.html",controller: 'EditPgtoController'});
    $routeProvider.when('/add-pgto/:id', {templateUrl: "add-forma-pgto.html",controller: 'EditPgtoController'});
    $routeProvider.when('/pgto', {templateUrl: "pgto.html",controller: "PgtoController"});
    $routeProvider.when('/categoria', {templateUrl: "categoria.html",controller:'CategoriaController'});
    $routeProvider.when('/add-cat', {templateUrl: "add-cat.html",controller: 'EditCategoriaController'});
    $routeProvider.when('/add-cat/:id', {templateUrl: "add-cat.html",controller: 'EditCategoriaController'});
});

