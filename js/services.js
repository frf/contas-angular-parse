var services = angular.module('MeusServicos', ['ngResource']);

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
    
});
