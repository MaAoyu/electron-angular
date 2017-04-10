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
            getAllParas: getAllParas,       //获取参数
            updateParas: updateParas,       //更新参数
            updateTable2crop: updateTable2crop,     //更新表二crop价格
            updateTable2ss: updateTable2ss,         //更新表二ss价格
            updateTable2tree: updateTable2tree,     //更新表二tree价格
            getDatas: getDatas,             //取表一数据
            create: createData,             //添加表一
            addTablePeople: addTablePeople, //添加people表
            addTable2: addTable2,
            getPeopleList: getPeopleList,   //得到户主列表
            getTable1ById: getTable1ById,   
            gettable2Datas: gettable2Datas,
            getNameListByName: getNameListByName,
            createTable3: createTable3,
            createTable4: createTable4,
            getAllTable3Datas: getAllTable3Datas,
            getAllTable4Datas: getAllTable4Datas,
            addTable41: addTable41,          //添加表4-1
            getAllTable41Datas: getAllTable41Datas,
            saveTable43Data: saveTable43Data,
            getAllTable43Datas: getAllTable43Datas
        };

        //todo
        function updateTable4(paras) {
            var deferred = $q.defer();
            var query = "UPDATE table4 SET price = ? WHERE type1 = '土木'";
            connection.query(query, [paras.b4], function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }

        function updateTable2crop(crop) {
            var deferred = $q.defer();
            var query = "UPDATE table2 SET price = ? WHERE prj = '农作物'";
            connection.query(query, [crop], function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }
        function updateTable2ss(ss) {
            var deferred = $q.defer();
            var query = "UPDATE table2 SET price = ? WHERE prj = '农用设施'";
            connection.query(query, [ss], function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }
        function updateTable2tree(tree) {
            var deferred = $q.defer();
            var query = "UPDATE table2 SET price = ? WHERE prj = '树木'";
            connection.query(query, [tree], function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }

        function updateParas(paras) {
            var deferred = $q.defer();
            var query = "UPDATE para SET ? WHERE id = 1";
            connection.query(query, paras, function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }

        function getAllParas(){
            var deferred = $q.defer();
            var query = "SELECT * FROM para where id = 1";
            connection.query(query, function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function getAllTable43Datas(c2){
            var deferred = $q.defer();
            var query = "SELECT * FROM table43 where city = ?";
            connection.query(query, [c2], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function saveTable43Data(data) {
            var deferred = $q.defer();
            var query = "INSERT INTO table43 SET ?";
            connection.query(query, data, function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }

        function getAllTable41Datas(c4){
            var deferred = $q.defer();
            var query = "SELECT * FROM table41 where city = ?";
            connection.query(query, [c4], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function getAllTable4Datas(id){
            var deferred = $q.defer();
            var query = "SELECT * FROM table4 where id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function getAllTable3Datas(id){
            var deferred = $q.defer();
            var query = "SELECT * FROM table3 where id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function createTable4(data) {
            var deferred = $q.defer();
            var query = "INSERT INTO table4 SET ?";
            connection.query(query, data, function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
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
            connection.query(query, [city,name], function (err, rows) {
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
            var query = "SELECT * FROM table2 where id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
         
        function getTable1ById(id) {
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
        
        function addTable41(data) {
            var deferred = $q.defer();
            var query = "INSERT INTO table41 SET ?";
            connection.query(query, data, function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }

        function addTable2(data) {
            var deferred = $q.defer();
            var query = "INSERT INTO table2 SET ?";
            connection.query(query, data, function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
        
    }
})();