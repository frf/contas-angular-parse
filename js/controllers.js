'use strict';

var meusControllers = angular.module('MeusControllers', []);
var aCategoria = [];
var aPgto = [];

var getObj = function(id,aObj){
    console.log(id + " - " + aObj);
                var log = [];
                angular.forEach(aObj, function(value, key) {
                    
                    if(id == value.objectId){
                        value.keyId = key;
                        this.push(value);
                    }
                },log);                
                return log;
            }
            
var getAllLancamentos = function(aObj){
    var log = [];

    angular.forEach(aObj.results, function(value, key) {
        console.log(value.categoria);
        console.log(getObj(value.categoria,aCategoria));
            value.keyId = key;
            value.categoriaNome = getObj(value.categoria,aCategoria)[0].nome;
            this.push(value);
    },log);                
    return log;
}

/* Controllers */
meusControllers.controller('MainController', function($rootScope, $scope,CategoriaService,PgtoService) {

    $rootScope.$on("$routeChangeStart", function() {
        $rootScope.loading = true;
    });

    $rootScope.$on("$routeChangeSuccess", function() {
        $rootScope.loading = false;
    });
    
    CategoriaService.getAll(function(data) {
        aCategoria = data.results;
    });
    PgtoService.getAll(function(data) {
        aPgto = data.results;
    });
});

meusControllers.controller('PgtoController', function($scope) {
    $scope.aListPgto = aPgto;
});

meusControllers.controller('CategoriaController', function($scope) {
    $scope.aListCat = aCategoria;
});

meusControllers.controller('EditPgtoController', function($scope, $routeParams, $location, PgtoService) {
    
    $scope.id = $routeParams.id;
    $scope.master = {};
    
    if($routeParams.id != null){
        var Pgto = getObj($routeParams.id,aPgto);
        $scope.master = {id:$routeParams.id,nome:Pgto[0].nome,keyId:Pgto[0].keyId};        
    }
        
    $scope.update = function(user) {
        var Pgto = {
            objectId:'',
            nome:""
        }
        
        Pgto.objectId = $scope.user.id;
        Pgto.nome = $scope.user.nome;
        
        if($scope.master.keyId == null){
            aPgto.push(Pgto);
        }else{
            aPgto[$scope.master.keyId] = Pgto;
        }
        
        PgtoService.save(Pgto, function(data) {
           $location.path("/pgto");
        });

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
        function($scope, $location, $routeParams, LancamentoService) {
            LancamentoService.getAll(function(data) {
                $scope.aListLancamento = getAllLancamentos(data);
            });
        });
 
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
/*
var Comment = Parse.Object.extend("Comment");

var query = new Parse.Query(Comment);
 
// Retrieve the most recent ones
query.descending("createdAt");
 
// Only retrieve the last ten
query.limit(10);
 
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
        var Post = comments[i].get('parent');
        Post.fetch({
            success: function(post) {
              var title = post.get("title");
               console.log(title);
            }
        });
    }
  }});*/
