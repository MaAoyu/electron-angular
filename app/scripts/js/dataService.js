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
            getDatas: getDatas,             //取表一数据
            create: createData,             //添加表一
            addTablePeople: addTablePeople, //添加people表
            getPeopleList: getPeopleList,   //得到户主列表
            gettable2Datas: gettable2Datas,
            getNameListByName: getNameListByName,
            createTable3: createTable3,
            getAllTable3Datas: getAllTable3Datas
        };

        function getAllTable3Datas(id){
            var deferred = $q.defer();
            var query = "SELECT * FROM table3 where id = ?";
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

        function getNameListByName(city,name) {
            var deferred = $q.defer();
            var query = "SELECT * FROM table1 WHERE city = ? and name LIKE  '" + name + "%'";
            connection.query(query, [city], [name], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }


        function getPeopleList(city){
            var deferred = $q.defer();
            var query = "SELECT * FROM people where city = ?";
            connection.query(query, [city], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function getDatas(city){
            var deferred = $q.defer();
            var query = "SELECT * FROM table1 where city = ?";
            connection.query(query, [city], function (err, rows) {
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

        function addTablePeople(data) {
            var deferred = $q.defer();
            var query = "INSERT INTO people SET ?";
            connection.query(query, data, function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }

        
    }
})();