(function () {
    'use strict';
    var mysql = require('mysql');

    // Creates MySql database connection
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "143555",
        database: "table_manager"
    });

    angular.module('app')
        .service('dataService', ['$q', DataService]);

    function DataService($q) {
        return {
            getDatas: getDatas,
            create: createData
        };

        function getDatas() {
            var deferred = $q.defer();
            var query = "SELECT * FROM table1";
            connection.query(query, function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function createData(data) {
            var deferred = $q.defer();
            var query = "INSERT INTO table1 SET ?";
            connection.query(query, data, function (err, res) {
                console.log(err)
                if (err) deferred.reject(err);
                console.log(res)
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
    }
})();