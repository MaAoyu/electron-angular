(function () {
    'use strict';
    angular.module('app')
        .controller('treeIndexController', ['dataService', '$q', '$mdDialog', treeIndexController]);

    function treeIndexController(dataService, $q, $mdDialog) {
        console.log("载入treeIndexController");

        var self = this;
        //框架参数
        self.cityName = "";
        self.cityLevel = '1';
        self.tableIndex = '1';
        self.citys1 = [{ "name": "内江市", "flag": false }, { "name": "自贡市", "flag": false }, { "name": "泸州市", "flag": false }];
        self.citys2 = [{ "name": "内江市东兴区", "flag": false }, { "name": "内江市市中区", "flag": false }, { "name": "大安区", "flag": false }, { "name": "沿滩区", "flag": false },
        { "name": "富顺县", "flag": false }, { "name": "泸县", "flag": false }, { "name": "龙马潭区", "flag": false }];
        self.citys3 = [{ "name": "内江市东兴区高桥街道办", "flag": false }, { "name": "内江市东兴区郭北镇", "flag": false }, { "name": "内江市东兴区东兴街道", "flag": false }, { "name": "内江市东兴区胜利街道", "flag": false },
        { "name": "内江市东兴区新江街道", "flag": false }, { "name": "内江市市中区乐贤街道", "flag": false }, { "name": "内江市市中区白马镇", "flag": false }, { "name": "内江市市中区凤鸣镇", "flag": false },
        { "name": "内江市市中区交通镇", "flag": false }, { "name": "内江市市中区永安镇", "flag": false }, { "name": "内江市市中区伏龙镇", "flag": false }, { "name": "内江市市中区凌家镇", "flag": false }];
        self.isShowCity1 = isShowCity1;
        self.isShowCity2 = isShowCity2;
        self.isShowCity3 = isShowCity3;
        self.selectItem = selectItem;
        self.selectTable = selectTable;
        //具体表格参数
        self.selected = null;  //表一当前添加数据或表二当前显示数据
        self.selectedTable3 = null; //表三当前添加数据
        self.datas = [];       //表一所有数据
        self.table2Datas = []; //表二所有数据
        self.filterText = null //表二搜索关键字
        self.table3Datas = []; //表三所有数据
        self.saveData = saveData;              //表一保存数据
        self.selectCustomer = selectCustomer;  //表二点击左侧列表选择户主
        self.filter = filterCustomer;          //表二搜索
        self.saveTable3Data = saveTable3Data;  //表三保存数据
        self.getAllTable3Datas = getAllTable3Datas; //根据户主获取表三数据


        //Load initial data
        getAllDatas();

        //----------------------
        // Internal functions 
        //----------------------

        //添加表三数据
        function saveTable3Data($event) {
            self.selectedTable3.id = self.selected.id;
            dataService.createTable3(self.selectedTable3).then(function (affectedRows) {
                $mdDialog.show(
                    $mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Data Added Successfully!')
                        .ok('Ok')
                        .targetEvent($event)
                );
            });
            self.selectedTable3 = {};
            getAllTable3Datas();
        }

         //得到表三全部数据
        function getAllTable3Datas(customer, index) {
            self.selected = angular.isNumber(customer) ? self.customers[customer] : customer;
            dataService.getAllTable3Datas(self.selected.id).then(function (datas) {
                self.table3Datas = [].concat(datas);
            });
        }

        //搜索户主显示表二
        function filterCustomer() {
            if (self.filterText == null || self.filterText == "") {
                getAllDatas();
            }
            else {
                dataService.getNameListByName(self.filterText).then(function (customers) {
                    self.datas = [].concat(customers);
                    self.selected = customers[0];
                });
                dataService.gettable2Datas(self.selected.id).then(function (datas) {
                var rawDatas = [].concat(datas);
                for (var i = 0; i < rawDatas.length; i++) {
                    if(2*i+1>rawDatas.length)
                        break;

                    self.table2Datas[i] = rawDatas[2*i];
                    self.table2Datas[i].prj2 = rawDatas[2*i+1].prj;
                    self.table2Datas[i].unit2 = rawDatas[2*i+1].unit;
                    self.table2Datas[i].quantity2 = rawDatas[2*i+1].quantity;
                }
            });
            }
        }

        //选择一个户主显示表二
        function selectCustomer(customer, index) {
            self.selected = angular.isNumber(customer) ? self.customers[customer] : customer;
            dataService.gettable2Datas(self.selected.id).then(function (datas) {
                var rawDatas = [].concat(datas);
                for (var i = 0; i < rawDatas.length; i++) {
                    if(2*i+1>rawDatas.length)
                        break;

                    self.table2Datas[i] = rawDatas[2*i];
                    self.table2Datas[i].prj2 = rawDatas[2*i+1].prj;
                    self.table2Datas[i].unit2 = rawDatas[2*i+1].unit;
                    self.table2Datas[i].quantity2 = rawDatas[2*i+1].quantity;
                }
            });
        }

        //得到表一全部数据
        function getAllDatas() {
            dataService.getDatas().then(function (datas) {
                self.datas = [].concat(datas);
            });
        }

        //添加表一数据
        function saveData($event) {
            console.log("self.selected:" + self.selected);
            dataService.create(self.selected).then(function (affectedRows) {
                console.log("affectedRows:" + affectedRows);
                $mdDialog.show(
                    $mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .content('Data Added Successfully!')
                        .ok('Ok')
                        .targetEvent($event)
                );
            });
            self.selected = {};
            getAllDatas();
        }



        function isShowCity1(index) {  //第一层展开
            if (self.citys1[index].flag == false)
                self.citys1[index].flag = true;
            else
                self.citys1[index].flag = false;
            self.cityName = self.citys1[index].name;
            self.cityLevel = '1';
            //console.log("self.citys1[index].flag:"+self.citys1[index].flag);
        }
        function isShowCity2(index) {  //第二层展开
            if (self.citys2[index].flag == false)
                self.citys2[index].flag = true;
            else
                self.citys2[index].flag = false;
            self.cityName = self.citys2[index].name;
            self.cityLevel = '2';
            //console.log("self.citys2[index].flag:"+self.citys2[index].flag);
        }
        function isShowCity3(index) {  //第三层展开
            if (self.citys3[index].flag == false)
                self.citys3[index].flag = true;
            else
                self.citys3[index].flag = false;
            self.cityName = self.citys3[index].name;
            self.cityLevel = '3';
            //console.log("self.citys3[index].flag:"+self.citys3[index].flag);
        }
        function selectItem(item) {    //第四层选择
            //console.log("cityName:" + item);
            self.cityName = item;
            self.cityLevel = '4';
        }
        function selectTable(index) {
            self.tableIndex = index;
        }
    }

})();
