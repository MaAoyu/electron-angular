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
        self.current = null;   //当前户主
        self.curTable1 = null; //表一当前添加数据
        self.table1Datas = []; //表一所有数据
        self.peopleLists = []; //所有户主的列表
        self.table2Datas = []; //表二所有数据
        self.filterText = null //搜索关键字
        self.curTable3 = null; //表三当前添加数据
        self.table3Datas = []; //表三所有数据
        self.table4Datas = []; //表四所有数据

        self.saveTable1Data = saveTable1Data;              //表一保存数据、people表保存数据
        self.showTable2Data = showTable2Data;              //表二点击左侧列表选择户主后显示详细信息
        self.filter = filterCustomer;                      //表二搜索
        self.saveTable3Data = saveTable3Data;              //表三保存数据
        self.getAllTable3Datas = getAllTable3Datas;        //根据户主ID获取表三数据
        self.getAllTable4Datas = getAllTable4Datas;        //根据户主ID获取表四数据


        //得到初始表一数据
        getAllTable1Datas();
        //得到初始户主列表
        getPeopleList();

        //----------------------
        // Internal functions 
        //----------------------

        //得到表四全部数据
        function getAllTable4Datas(id) {
            getAllTable3Datas(id);  //先取表三原始数据到table3Datas
            //转换所需格式数据
            for (var i = 0; i < table3Datas.length; i++) {
                table4Datas[i].index = table3Datas[i].index;
                switch (table3Datas[i].type2) {
                    case "框架结构":
                        table4Datas[i].t1 = table3Datas[i].area;
                        break;
                    case "框架结构":
                        table4Datas[i].t2 = table3Datas[i].area;
                        break;
                    case "框架结构":
                        table4Datas[i].t3 = table3Datas[i].area;
                        break;
                    case "框架结构":
                        table4Datas[i].t4 = table3Datas[i].area;
                        break;
                    default:
                        table4Datas[i].t5 = table3Datas[i].area;
                }
            }
        }

        //添加表三数据
        function saveTable3Data($event) {
            self.curTable3.id = self.current.id;
            self.curTable3.city = self.cityName;
            dataService.createTable3(self.curTable3).then(function (affectedRows) {
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
            getAllTable3Datas(self.current.id);
        }

        //得到表三全部数据
        function getAllTable3Datas(id) {
            dataService.gettable2Datas(id).then(function (datas) {
                self.current = datas[0];
            });//取表头信息
            dataService.getAllTable3Datas(id).then(function (datas) {
                self.table3Datas = [].concat(datas);
            });//取表格信息
        }

        //搜索户主
        function filterCustomer() {
            if (self.filterText == null || self.filterText == "") {
                getPeopleList();
            }
            else {
                dataService.getNameListByName(self.cityName, self.filterText).then(function (customers) {
                    self.peopleLists = [].concat(customers);
                    self.current = customers[0];
                });
            }
            //直接显示搜索结果第一的具体信息
            showTable2Data(self.current.id);
            getAllTable3Datas(self.current.id);
        }

        //选择一个户主显示表二
        function showTable2Data(id) {
            //self.current = angular.isNumber(customer) ? self.peopleLists[customer] : customer;
            dataService.gettable2Datas(id).then(function (datas) {
                self.current = datas[0];
                //表特殊处理
                var rawDatas = [].concat(datas);
                for (var i = 0; i < rawDatas.length; i++) {
                    if (2 * i + 1 > rawDatas.length)
                        break;

                    self.table2Datas[i] = rawDatas[2 * i];
                    self.table2Datas[i].prj2 = rawDatas[2 * i + 1].prj;
                    self.table2Datas[i].unit2 = rawDatas[2 * i + 1].unit;
                    self.table2Datas[i].quantity2 = rawDatas[2 * i + 1].quantity;
                }
            });
        }

        //得到户主列表
        function getPeopleList() {
            dataService.getPeopleList(self.cityName).then(function (datas) {
                self.peopleLists = [].concat(datas);
            });
        }


        //得到表一全部数据
        function getAllTable1Datas() {
            dataService.getDatas(self.cityName).then(function (datas) {
                self.table1Datas = [].concat(datas);
            });
        }

        //添加表一数据
        function saveTable1Data($event) {
            self.curTable1.city = self.cityName;
            //console.log("self.curTable1:" + self.curTable1);
            dataService.create(self.curTable1).then(function (affectedRows) {
                //console.log("affectedRows:" + affectedRows);
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
            //添加用户表，身份证为主键
            var people = null;
            people.id = self.curTable1.id;
            people.name = self.curTable1.name;
            people.city = self.curTable1.city;
            dataService.addTablePeople(people).then(function (affectedRows) {
            });
            self.curTable1 = {};
            getAllTable1Datas();
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
