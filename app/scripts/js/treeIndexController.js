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
        self.citys2 = [{ "name": "内江市东兴区", "flag": false }, { "name": "内江市市中区", "flag": false }, { "name": "自贡市大安区", "flag": false }, { "name": "自贡市沿滩区", "flag": false },
        { "name": "自贡市富顺县", "flag": false }, { "name": "泸州市泸县", "flag": false }, { "name": "泸州市龙马潭区", "flag": false }];
        self.citys3 = [{ "name": "内江市东兴区高桥街道办", "flag": false }, { "name": "内江市东兴区郭北镇", "flag": false }, { "name": "内江市东兴区东兴街道", "flag": false }, { "name": "内江市东兴区胜利街道", "flag": false },
        { "name": "内江市东兴区新江街道", "flag": false }, { "name": "内江市市中区乐贤街道", "flag": false }, { "name": "内江市市中区白马镇", "flag": false }, { "name": "内江市市中区凤鸣镇", "flag": false },
        { "name": "内江市市中区交通镇", "flag": false }, { "name": "内江市市中区永安镇", "flag": false }, { "name": "内江市市中区伏龙镇", "flag": false }, { "name": "内江市市中区凌家镇", "flag": false },
        { "name": "自贡市大安区何市镇", "flag": false }, { "name": "自贡市大安区三多寨镇", "flag": false }, { "name": "自贡市沿滩区仙市镇", "flag": false }, { "name": "自贡市沿滩区瓦市镇", "flag": false },
        { "name": "自贡市富顺县互助镇", "flag": false }, { "name": "自贡市富顺县富世镇", "flag": false }, { "name": "自贡市富顺县狮市镇", "flag": false }, { "name": "自贡市富顺县东湖镇", "flag": false },
        { "name": "自贡市富顺县骑龙镇", "flag": false }, { "name": "自贡市富顺县童寺镇", "flag": false }, { "name": "自贡市富顺县古佛镇", "flag": false }, { "name": "自贡市富顺县龙万乡", "flag": false },
        { "name": "自贡市富顺县代寺镇", "flag": false }, { "name": "自贡市富顺县中石镇", "flag": false }, { "name": "自贡市富顺县", "flag": false }, { "name": "自贡市富顺县", "flag": false }];
        
        self.c4CuuList = [];
        self.c4List = new Array();
        self.c4List["内江市东兴区高桥街道办"] = ["内江市东兴区高桥街道办陡坎村","内江市东兴区高桥街道办赛峨村"];
        self.isShowCity1 = isShowCity1;
        self.isShowCity2 = isShowCity2;
        self.isShowCity3 = isShowCity3;
        self.selectItem = selectItem;
        self.selectTable = selectTable;
        //具体表格参数
        self.paras = {"crop":"0","ss":"0","tree":"0"}; //价格参数
        self.current = null;   //当前户主
        self.curTable1 = null; //表一当前添加数据
        self.table1Datas = []; //表一所有数据
        self.peopleLists = []; //所有户主的列表
        self.table2Datas = []; //表二所有数据
        self.filterText = null //搜索关键字
        self.curTable3 = null; //表三当前添加数据
        self.table3Datas = []; //表三所有数据
        self.table4Datas = []; //表四所有数据
        self.table41Datas = []; //表4-1所有数据
        self.table42Datas = []; //表4-1所有数据
        self.table43Datas = []; //表4-1所有数据
        self.curTable43 = null; //表4-3当前添加数据
        self.table11Datas = []; //表1-1所有数据
        self.table12Datas = []; //表1-2所有数据

        self.saveTable1Data = saveTable1Data;              //表一保存数据、people表保存数据
        self.showTable2Data = showTable2Data;              //表二点击左侧列表选择户主后显示详细信息
        self.filter = filterCustomer;                      //表二搜索
        self.saveTable3Data = saveTable3Data;              //表三保存数据
        self.getAllTable3Datas = getAllTable3Datas;        //根据户主ID获取表三数据
        self.getAllTable4Datas = getAllTable4Datas;        //根据户主ID获取表四数据
        self.getAllTable41Datas = getAllTable41Datas;      //根据村名获取4-1数据
        self.saveTable43Data = saveTable43Data;            //表4-3保存数据
        self.changePara = changePara;                      //更改价格参数

        //得到各参数
        getAllParas();

        //----------------------
        // Internal functions 
        //----------------------

        //更改价格参数
        function changePara() {
            //更新参数表
            dataService.updateParas(self.paras).then(function (datas) {
            });
            //更新表二
            dataService.updateTable2crop(self.paras.crop).then(function (datas) {
            });
            dataService.updateTable2ss(self.paras.crop).then(function (datas) {
            });
            dataService.updateTable2ss(self.paras.crop).then(function (datas) {
            });
        }

        //得到表1-1全部数据
        function getAllTable12Datas() {
            // var currC4List = self.c4List[self.cityName];//该镇下所有村的数组
            // for (var i = 0; i < currC4List.length; i++) {
            //     dataService.getAllTable3Datas(currC4List[i]).then(function (datas) {
            //     //TODO:表三增加村字段，再汇总数据
            //     self.table11Datas.city4 = currC4List[i];

            // });
            // }
        }

        //得到表1-1全部数据
        function getAllTable11Datas() {
            var currC4List = self.c4List[self.cityName];//该镇下所有村的数组
            for (var i = 0; i < currC4List.length; i++) {
                dataService.getAllTable3Datas(currC4List[i]).then(function (datas) {
                //TODO:表三增加村字段，再汇总数据
                self.table11Datas.city4 = currC4List[i];

            });
            }
        }

        //得到表4-3全部数据
        function getAllTable43Datas(city2Name) {
            dataService.getAllTable43Datas(city2Name).then(function (datas) {
                self.table43Datas = [].concat(datas);
            });
        }

        //添加表4-3数据
        function saveTable43Data($event) {
            self.curTable43.city = self.cityName;
            dataService.saveTable43Data(self.curTable43).then(function (affectedRows) {
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
            self.curTable43 = {};
            getAllTable43Datas(self.cityName);
        }

        //得到表4-2全部数据
        function getAllTable42Datas() {
            var currC4List = self.c4List[self.cityName];//该镇下所有村的数组
            for (var i = 0; i < currC4List.length; i++) {
                dataService.getAllTable41Datas(currC4List[i]).then(function (datas) {
                self.table41Datas = [].concat(datas);
                self.table42Datas.name = currC4List[i];
                //TODO:补偿类别固定则直接从数据库取和

            });
            }
        }

        //得到表4-1全部数据
        function getAllTable41Datas(city4Name) {
            dataService.getAllTable41Datas(city4Name).then(function (datas) {
                self.table41Datas = [].concat(datas);
            });
        }

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
                    case "砖混结构":
                        table4Datas[i].t2 = table3Datas[i].area;
                        break;
                    case "砖木结构":
                        table4Datas[i].t3 = table3Datas[i].area;
                        break;
                    case "土木结构":
                        table4Datas[i].t4 = table3Datas[i].area;
                        break;
                    default:
                        table4Datas[i].t5 = table3Datas[i].area;
                }
                table4Datas[i].index2 = table3Datas[i].index;
                table4Datas[i].arcName = table3Datas[i].prj;
                table4Datas[i].unit = table3Datas[i].unit;
                table4Datas[i].quantity = table3Datas[i].quantity;
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
            self.curTable3 = {};
            getAllTable3Datas(self.current.id);
        }

        //得到表三全部数据
        function getAllTable3Datas(id) {
            dataService.getTable1ById(id).then(function (datas) {
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
                dataService.getNameListByName(self.cityName,self.filterText).then(function (customers) {
                    self.peopleLists = [].concat(customers);
                    self.current = customers[0];
                });
            }
            //直接显示搜索结果第一的具体信息
            showTable2Data(self.current.id);
            getAllTable3Datas(self.current.id);
            getAllTable4Datas(self.current.id);
        }

        //选择一个户主显示表二
        function showTable2Data(id) {
             dataService.getTable1ById(id).then(function (datas) {
                self.current = datas[0];
            });//取表头信息
            dataService.gettable2Datas(id).then(function (datas) {
                //表特殊处理
                var rawDatas = [].concat(datas);
                for (var i = 0; i < rawDatas.length; i++) {
                    if (2 * i + 1 > rawDatas.length)
                        break;

                    self.table2Datas[i] = rawDatas[2 * i];
                    self.table2Datas[i].total = self.table2Datas[i].quantity * self.table2Datas[i].price;
                    self.table2Datas[i].prj2 = rawDatas[2 * i + 1].prj;
                    self.table2Datas[i].unit2 = rawDatas[2 * i + 1].unit;
                    self.table2Datas[i].quantity2 = rawDatas[2 * i + 1].quantity;
                    self.table2Datas[i].price2 = rawDatas[2 * i + 1].price;
                    self.table2Datas[i].total2 = self.table2Datas[i].quantity2 * self.table2Datas[i].price2;
                }
            });//表信息
        }

        //得到户主列表
        function getPeopleList() {
            dataService.getPeopleList(self.cityName).then(function (datas) {
                self.peopleLists = [].concat(datas);
            });
        }


        //得到表一全部数据
        function getAllTable1Datas() {
            console.log("get datas....");
            console.log(self.cityName);
            dataService.getDatas(self.cityName).then(function (datas) {
                self.table1Datas = [].concat(datas);
                console.log("data:"+self.table1Datas[0].name);
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
            var people = {"id":"","name":"","city":""};
            people.id = self.curTable1.id;
            people.name = self.curTable1.name;
            people.city = self.curTable1.city;
            dataService.addTablePeople(people).then(function (affectedRows) {
            });
            
            //添加相应数据到表二
            var currTable2 = {};
            currTable2.id = self.curTable1.id;
            currTable2.prj = self.curTable1.prj;
            currTable2.unit = self.curTable1.unit;
            currTable2.quantity = self.curTable1.quantity;
            switch (self.curTable1.prj) {
                    case "农作物":
                        currTable2.price = self.paras.crop;
                        break;
                    case "农用设施":
                        currTable2.price = self.paras.ss;
                        break;
                    default:
                        currTable2.price = self.paras.tree;
                }
            //currTable2.total = currTable2.price * currTable2.quantity;
            dataService.addTable2(currTable2).then(function (affectedRows) {
            });

            self.curTable1 = {};
            getAllTable1Datas();
            //添加4-1表
            self.curTable41.name = self.curTable1.name;
            self.curTable41.type = self.curTable1.prj;
            self.curTable41.unit = self.curTable1.unit;
            self.curTable41.quantity = self.curTable1.quantity;
            self.curTable41.city = self.curTable1.city;
            dataService.addTable41(self.curTable41).then(function (affectedRows) {
            });
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
            //console.log(self.citys2[index].name+self.citys2[index].flag);
        }
        function isShowCity3(index) {  //第三层展开
            if (self.citys3[index].flag == false)
                self.citys3[index].flag = true;
            else
                self.citys3[index].flag = false;
            self.cityName = self.citys3[index].name;
            self.c4CuuList = self.c4List[self.cityName];
            self.cityLevel = '3';
            //console.log("self.citys3[index].flag:"+self.citys3[index].flag);
        }
        function selectItem(item) {    //第四层选择
            console.log("cityName:" + item);
            self.cityName = item;
            self.cityLevel = '4';
        }
        function selectTable(index) {
            self.tableIndex = index;
            if(index == 1)
                getAllTable1Datas();//得到初始表一数据
            if(index == 2)
                getPeopleList();
            if(index == 42)
                getAllTable42Datas();//4-2表数据汇总
            if(index == 43)
                getAllTable43Datas(self.cityName);//4-3表数据初始化
            if(index == 12)
                getAllTable12Datas();//1-2表数据汇总
            if(index == 11)
                getAllTable11Datas();//1-1表数据汇总
                
        }

        function getAllParas(){
            dataService.getAllParas().then(function (datas) {
                self.paras.crop=datas[0].crop;
                self.paras.ss=datas[0].ss;
                self.paras.tree=datas[0].tree;
            });
        }
    }

})();
