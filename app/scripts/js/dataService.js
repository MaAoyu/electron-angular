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
            create: createData,
            gettable2Datas: gettable2Datas,
            getNameListByName: getNameListByName,
            createTable3: createTable3,
            getAllTable3Datas: getAllTable3Datas
        };

        function getAllTable3Datas(id){
            var deferred = $q.defer();
            var query = "SELECT * FROM table1 where id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function createTable3(data) {
            var deferred = $q.defer();
            var query = "INSERT INTO table3 SET ?";
            connection.query(query, data, function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }

        function getNameListByName(name) {
            var deferred = $q.defer();
            var query = "SELECT * FROM table1 WHERE name LIKE  '" + name + "%'";
            connection.query(query, [name], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function getDatas(){
            var deferred = $q.defer();
            var query = "SELECT * FROM table1";
            connection.query(query, function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
         
        function gettable2Datas(id) {
            var deferred = $q.defer();
            var query = "SELECT * FROM table1 where id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function createData(data) {
            var deferred = $q.defer();
            var query = "INSERT INTO table1 SET ?";
            connection.query(query, data, function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
    }
})();