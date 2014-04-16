'use strict';

var  meusControllers = angular.module('MeusControllers', []);

/* Controllers */
meusControllers.controller('MainController', function($rootScope, $scope, $http, CategoriaService) {

    $rootScope.$on("$routeChangeStart", function() {
        $rootScope.loading = true;
    });

    $rootScope.$on("$routeChangeSuccess", function() {
        $rootScope.loading = false;
    });

    var aListLanc = [];

    for (var i = 0; i < 10; i++) {
        aListLanc.push(new Object({id: i, nome: "Lista " + i}));
    }

    $scope.myObjsLanc = aListLanc;

});

meusControllers.controller('PgtoController', function($scope, PgtoService) {    
    PgtoService.getAll(function(data) {
        $scope.aListPgto = data.results;   
    });    
});

meusControllers.controller('CategoriaController', function($scope, CategoriaService) {    
    CategoriaService.getAll(function(data) {
        $scope.aListCat = data.results;        
    });    
});

meusControllers.controller('EditPgtoController', function($scope, $routeParams) {
    var oPgto = $scope.aListPgto;
    $scope.id = $routeParams.id;
});

meusControllers.controller('EditCategoriaController', function($scope, $routeParams, CategoriaService) {    
    
    $scope.master = {};
    
    CategoriaService.getCategoria($routeParams.id,function(data) {
        if ($routeParams.id != null) {
            $scope.master = {id: $routeParams.id, nome: data.nome};
        }
    }); 
    
    $scope.update = function(user) {
        $scope.master = angular.copy(user);
    };

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };

    $scope.isUnchanged = function(user) {
        return angular.equals(user, $scope.master);
    };

    $scope.reset();
    
});
meusControllers.controller('EditLancController', function($scope, $routeParams) {

    var oLanc = $scope.myObjsLanc;

    $scope.nome = oLanc[$routeParams.id].nome;
    $scope.id = $routeParams.id;

});

