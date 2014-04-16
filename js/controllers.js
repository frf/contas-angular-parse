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
            /*LancamentoService.getAll(function(data) {
                angular.forEach(data.results, function(value, key) {
                  //  console.log(value.categoria);
                    
                });
            });*/
        });
        
        
        
         Parse.initialize("ezwTgQirFdjt1dnPiidr0nV1eqr9ARiOa3h43CgL", "S64qIhW7OhynJErsvmmYG1dV2nKw2YUk42AckFKK");
        /*
        // Declare the types.
var Post = Parse.Object.extend("Post");
var Comment = Parse.Object.extend("Comment");
 
// Create the post
var myPost = new Post();
myPost.set("title", "I'm Hungry");
myPost.set("content", "Where should we go for lunch?");
 
// Create the comment
var myComment = new Comment();
myComment.set("content", "Let's do Sushirrito.");
 
// Add the post as a value in the comment
myComment.set("parent", myPost);
 
// This will save both myPost and myComment
myComment.save();*/

var Comment = Parse.Object.extend("Comment");

var query = new Parse.Query(Comment);
 
// Retrieve the most recent ones
query.descending("createdAt");
 
// Only retrieve the last ten
query.limit(1);
 
// Include the post data with each comment
query.include("Post");
//query.include(["post.author"]);


query.find({
  success: function(comments) {
     // console.log(comments.parent);
     
    // Comments now contains the last ten comments, and the "post" field
    // has been populated. For example:
    for (var i = 0; i < comments.length; i++) {
        console.log(comments[i].get('content'));
        var Post = comments[i].get('parent').fetch();
        
        console.log(Post.get('content'));
      // This does not require a network access.
      //var post = comments[i].get("post.nome");
      
     // console.log(post);
    }
  }
});