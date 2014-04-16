'use strict';

var meusControllers = angular.module('MeusControllers', []);

/* Controllers */
meusControllers.controller('MainController', function($rootScope, $scope) {

    $rootScope.$on("$routeChangeStart", function() {
        $rootScope.loading = true;
    });

    $rootScope.$on("$routeChangeSuccess", function() {
        $rootScope.loading = false;
    });

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

    CategoriaService.getCategoria($routeParams.id, function(data) {
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
meusControllers.controller('addLancController', function($scope, $location, $routeParams, CategoriaService, PgtoService, LancamentoService) {

    $scope.lancamento = {};
    $scope.lancamentos = [];

    $scope.save = function() {
        var novoLancamento = {};

        novoLancamento.nome = $scope.lancamento.nome;
        novoLancamento.pgto = $scope.lancamento.pgto.objectId;
        novoLancamento.categoria = $scope.lancamento.categoria.objectId;
        novoLancamento.data = $scope.lancamento.data;

        $scope.lancamentos.push(novoLancamento);

        LancamentoService.save(novoLancamento, function(data) {
            if (data.objectId != null) {
                $location.path("/lancamento");
            }
        });

        $scope.lancamento = {};
    };

    CategoriaService.getAll(function(data) {
        $scope.aListCat = data.results;
    });
    PgtoService.getAll(function(data) {
        $scope.aListPgto = data.results;
    });

    if ($routeParams.id != null) {
        $scope.master = {id: $routeParams.id};
    }

    $scope.update = function(user) {
        console.log($scope.master);
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
meusControllers.controller('lancamentoController',
        function($scope, $location, $routeParams, CategoriaService, PgtoService, LancamentoService) {
            LancamentoService.getAll(function(data) {
                console.log(data.results);
            });
});


