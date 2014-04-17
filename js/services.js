var services = angular.module('MeusServicos', ['ngResource']);

services.service('LancamentoService', function($http) {

    this.save = function(data,callback) {
        $http({method: 'POST',
            url: 'https://api.parse.com/1/classes/Lancamento',
            headers: {
                'X-Parse-Application-Id': 'ezwTgQirFdjt1dnPiidr0nV1eqr9ARiOa3h43CgL',
                'X-Parse-REST-API-Key': '8DeetvMlYKqQ3VI6uHp08oOhpBrDsK3eoYXlTsfx',
                'Content-Type': 'application/json'
            },
            data:{
                  nome:data.nome,
                  data:data.data,
                  categoria:{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Categoria","objectId":data.categoria}]},
                  pgto:{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"Pgto","objectId":data.pgto}]}
            }
            
        }).success(callback);
    };
    this.getAll = function(callback) {
        $http({method: 'GET',//where={"post":{"__type":"Pointer","className":"Post","objectId":"8TOXdXf3tz"}}
            url: 'https://api.parse.com/1/classes/Lancamento',
            headers: {
                'X-Parse-Application-Id': 'ezwTgQirFdjt1dnPiidr0nV1eqr9ARiOa3h43CgL',
                'X-Parse-REST-API-Key': '8DeetvMlYKqQ3VI6uHp08oOhpBrDsK3eoYXlTsfx',
                'Content-Type': 'application/json'
                
            }
        }).success(callback);
    };
    
    
});
services.service('CategoriaService', function($http) {

    this.getAll = function(callback) {
        $http({method: 'GET',
            url: 'https://api.parse.com/1/classes/Categoria',
            headers: {
                'X-Parse-Application-Id': 'ezwTgQirFdjt1dnPiidr0nV1eqr9ARiOa3h43CgL',
                'X-Parse-REST-API-Key': '8DeetvMlYKqQ3VI6uHp08oOhpBrDsK3eoYXlTsfx'
            }
        }).success(callback);
    };
    
    this.getCategoria = function(id,callback) {        
        if (id != null) {
            $http({method: 'GET',
                url: 'https://api.parse.com/1/classes/Categoria/'+id,
                headers: {
                    'X-Parse-Application-Id': 'ezwTgQirFdjt1dnPiidr0nV1eqr9ARiOa3h43CgL',
                    'X-Parse-REST-API-Key': '8DeetvMlYKqQ3VI6uHp08oOhpBrDsK3eoYXlTsfx'
                }
            }).success(callback);
        };
    };
    
});
services.service('PgtoService', function($http) {

    this.getAll = function(callback) {
        $http({method: 'GET',
            url: 'https://api.parse.com/1/classes/Pgto',
            headers: {
                'X-Parse-Application-Id': 'ezwTgQirFdjt1dnPiidr0nV1eqr9ARiOa3h43CgL',
                'X-Parse-REST-API-Key': '8DeetvMlYKqQ3VI6uHp08oOhpBrDsK3eoYXlTsfx'
            }
        }).success(callback);
    };
    this.getPgto = function(callback, id) {

        if (id != null) {
            $http({method: 'GET',
                url: 'https://api.parse.com/1/classes/Pgto/'+id,
                headers: {
                    'X-Parse-Application-Id': 'ezwTgQirFdjt1dnPiidr0nV1eqr9ARiOa3h43CgL',
                    'X-Parse-REST-API-Key': '8DeetvMlYKqQ3VI6uHp08oOhpBrDsK3eoYXlTsfx'
                }
            }).success(callback);
        };
    };
    this.save = function(data,callback) {
        
            if(data.objectId == null){
                var methodType = "POST";
                var urlTarget = 'https://api.parse.com/1/classes/Pgto';
            }else{
                var methodType = "PUT";
                var urlTarget = 'https://api.parse.com/1/classes/Pgto/'+data.objectId;
            }
            
            $http({method: methodType,
                url: urlTarget,
                headers: {
                    'X-Parse-Application-Id': 'ezwTgQirFdjt1dnPiidr0nV1eqr9ARiOa3h43CgL',
                    'X-Parse-REST-API-Key': '8DeetvMlYKqQ3VI6uHp08oOhpBrDsK3eoYXlTsfx'
                },
                data:{
                  nome:data.nome
                }
            }).success(callback);

    };
    
});
