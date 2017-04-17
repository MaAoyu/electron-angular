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
        { "name": "自贡市富顺县代寺镇", "flag": false }, { "name": "自贡市富顺县中石镇", "flag": false },
        { "name": "泸州市泸县玉蝉街道办事处", "flag": false }, { "name": "泸州市泸县福集镇", "flag": false }, { "name": "泸州市泸县富集镇", "flag": false }, { "name": "泸州市泸县牛滩镇", "flag": false },
        { "name": "泸州市泸县德胜镇", "flag": false }, { "name": "泸州市龙马潭区双加镇", "flag": false }, { "name": "泸州市龙马潭区石洞镇", "flag": false }, { "name": "泸州市龙马潭区鱼塘镇", "flag": false },
        { "name": "泸州市龙马潭区安宁镇", "flag": false }];

        self.c4CuuList = [];
        self.c4List = new Array();
        self.c4List["内江市东兴区高桥街道办"] = ["内江市东兴区高桥街道办陡坎村", "内江市东兴区高桥街道办赛峨村"];
        self.isShowCity1 = isShowCity1;
        self.isShowCity2 = isShowCity2;
        self.isShowCity3 = isShowCity3;
        self.selectItem = selectItem;
        self.selectTable = selectTable;
        //具体表格参数
        self.paras = {
            "crop": "0", "ss": "0", "tree": "0", "b1": "0", "b2": "0", "b3": "0",
            "b4": "0", "b5": "0", "a1": "0", "a2": "0"
        }; //价格参数
        self.current = null;   //当前户主
        self.curTable1 = null; //表一当前添加数据
        self.autoID = 0;       //表一当前行数
        self.table1Datas = []; //表一所有数据
        self.table1Total = { "area": 0, "land": 0, "nonland": 0, "quantity": 0 }; //表一合计
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
        self.buildingNames = ["框架", "砖混", "砖木", "土木", "简易", "其它"];
        self.Table2Type = [];   //记录表二价格标准
        self.searchName = null;
        self.currPage = 1;
        self.totalPages = 1;

        self.saveTable1Data = saveTable1Data;              //表一保存数据、people表保存数据
        self.showTable2Data = showTable2Data;              //表二点击左侧列表选择户主后显示详细信息
        self.filter = filterCustomer;                      //表二搜索
        self.saveTable3Data = saveTable3Data;              //表三保存数据
        self.getAllTable3Datas = getAllTable3Datas;        //根据户主ID获取表三数据
        self.getAllTable4Datas = getAllTable4Datas;        //根据户主ID获取表四数据
        self.getAllTable41Datas = getAllTable41Datas;      //根据村名获取4-1数据
        self.saveTable43Data = saveTable43Data;            //表4-3保存数据
        // self.changePara = changePara;                      //更改价格参数
        self.search = search;                              //点击搜索结果
        // self.changePrice = changePrice;                    //更改价格
        self.getTable1ByPK = getTable1ByPK;
        self.getTable3ByPK = getTable3ByPK;
        self.getTable4ByPK = getTable4ByPK;
        self.deleteTable1 = deleteTable1;
        self.updateTable2 = updateTable2;                   //更改表二价格标准   
        self.outputExcel = outputExcel;                     //导出excel                 
        self.getNextPage = getNextPage;                     //分页


        //得到各参数
        getAllParas();

        //----------------------
        // Internal functions 
        //----------------------

        //分页
        function getNextPage(flag) {
            var page = 0;
            switch (flag) {
                case 0: //首页
                    page = 1;
                    self.currPage = page;
                    break;
                case 1://上一页
                    if (self.currPage == 1) {
                        alert("已经是第一页！");
                        page = 1;
                    }
                    else {
                        page = self.currPage - 1;
                        self.currPage = page;
                    }
                    break;
                case 2://下一页
                    if (self.currPage == self.totalPages) {
                        alert("已经是最后一页！");
                        page = self.currPage;
                    }
                    else {
                        page = self.currPage + 1;
                        self.currPage = page;
                    }
                    break;
                case 3://尾页
                    page = self.totalPages;
                    self.currPage = page;
                    break;
                default:
                    console.log("no datas..");
            }

            switch (self.tableIndex) {
                case '1':
                    getAllTable1Datas(page);//得到初始表一数据
                    break;
                case '2':
                    showTable2Data(self.searchName.id, page);
                    break;
                case '3':
                    getAllTable3Datas(self.searchName.id, page);
                    break;
                case '4':
                    getAllTable4Datas(self.searchName.id, page);
                    break;
                default:
                    console.log("no datas..");
            }
        }

        function updateTable2($event) {
            for (var i = 0; i < self.table2Datas.length; i++) {
                // self.table2Datas[i].price = self.Table2Type[i].type1;
                // self.table2Datas[i].price2 = self.Table2Type[i].type2;
                // self.table2Datas[i].total = self.table2Datas[i].quantity * self.table2Datas[i].price;
                // self.table2Datas[i].total2 = self.table2Datas[i].quantity2 * self.table2Datas[i].price2;
                //TODO 更新数据库
                if (self.Table2Type[i] != null) {
                    if (self.Table2Type[i].type1 != null) {
                        //更改数据库中所有该种类的价格
                        dataService.updateTable2(self.table2Datas[i].prj, self.Table2Type[i].type1).then(function (affectedRows) {
                            $mdDialog.show(
                                $mdDialog
                                    .alert()
                                    .clickOutsideToClose(true)
                                    .title('Success')
                                    .content('Data update Successfully!')
                                    .ok('Ok')
                                    .targetEvent($event)
                            );
                        });
                    }
                    if (self.Table2Type[i].type2 != null) {
                        //更改数据库中所有该种类的价格
                        dataService.updateTable2(self.table2Datas[i].prj2, self.Table2Type[i].type2).then(function (datas) {
                        });
                    }
                }
            }
            self.Table2Type = [];

            //重新加载表二
            showTable2Data(self.searchName.id, self.currPage);
        }

        function deleteTable1(pk,$event) {
            //console.log(pk);
            var confirm = $mdDialog.confirm()
                                   .title('Are you sure?')
                                   .content('Are you sure want to delete this?')
                                   .ok('Yes')
                                   .cancel('No')
                                   .targetEvent($event);
            
            
            $mdDialog.show(confirm).then(function () {
                dataService.deleteTable1(pk).then(function (affectedRows) {
                    //重新加载表单
                    getAllTable1Datas(1);//得到初始表一数据
                });
                dataService.deleteTable2(pk).then(function (affectedRows) {
                });
            }, function () { });
        }

        function getTable1ByPK(pk) {
            dataService.getTable1ByPK(pk).then(function (datas) {
                var rawDatas = [].concat(datas);
                self.curTable1 = rawDatas[0];
                //console.log(self.curTable1.name);
            });
        }

        function getTable3ByPK(pk) {
            console.log(pk);
            dataService.getTable3ByPK(pk).then(function (datas) {
                var rawDatas = [].concat(datas);
                self.curTable3 = rawDatas[0];
                console.log(self.curTable3.id);
            });
        }

        function getTable4ByPK(pk) {
            console.log(pk);
            dataService.getTable4ByPK(pk).then(function (datas) {
                var rawDatas = [].concat(datas);
                self.curTable4 = rawDatas[0];
                console.log(self.curTable4s.id);
            });
        }

        // //更改价格参数
        // function changePrice() {
        //     self.cityLevel = '0';

        // }

        // function changePara() {
        //     //更新参数表
        //     dataService.updateParas(self.paras).then(function (datas) {
        //     });
        //     //更新表二
        //     dataService.updateTable2crop(self.paras.crop).then(function (datas) {
        //     });
        //     dataService.updateTable2ss(self.paras.crop).then(function (datas) {
        //     });
        //     dataService.updateTable2ss(self.paras.crop).then(function (datas) {
        //     });
        //     //更新表四
        //     dataService.updateTable4(self.paras).then(function (datas) {
        //     });

        // }

        //得到表1-2全部数据
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
            dataService.getAllTable4Datas(id).then(function (datas) {
                var rawT4Datas = [].concat(datas);
                for (var i = 0; i < rawT4Datas.length; i++) {
                    self.table4Datas[i] = rawT4Datas[i];
                    self.table4Datas[i].total = self.table4Datas[i].area1 * self.table4Datas[i].price;
                    self.table4Datas[i].total2 = self.table4Datas[i].quantity * self.table4Datas[i].price2;
                };
            });

        }

        //添加表三数据
        function saveTable3Data($event) {
            self.curTable3.id = self.current.id;
            self.curTable3.city = self.cityName;
            //console.log(self.curTable3.city);
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
            //相应添加到表四
            var currTable4 = {};
            currTable4.id = self.curTable3.id;
            currTable4.index = self.curTable3.index;
            currTable4.type1 = self.curTable3.type2;
            currTable4.area1 = self.curTable3.area;
            switch (self.curTable3.type2) {
                case "框架":
                    currTable4.t1 = self.curTable3.area;
                    currTable4.price = self.paras.b1;
                    break;
                case "砖混":
                    currTable4.t2 = self.curTable3.area;
                    currTable4.price = self.paras.b2;
                    break;
                case "砖木":
                    currTable4.t3 = self.curTable3.area;
                    currTable4.price = self.paras.b3;
                    break;
                case "土木":
                    currTable4.t4 = self.curTable3.area;
                    currTable4.price = self.paras.b4;
                    break;
                default:
                    currTable4.t5 = self.paras.tree;
                    currTable4.price = self.paras.b5;
            }
            switch (self.curTable3.prj) {
                case "院坝":
                    currTable4.price2 = self.paras.a1;
                    break;
                default:
                    currTable4.price2 = self.paras.a2;
            }
            currTable4.arcName = self.curTable3.prj;
            currTable4.unit = self.curTable3.unit;
            currTable4.quantity = self.curTable3.quantity;
            dataService.createTable4(currTable4).then(function (affectedRows) {
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
                dataService.getNameListByName(self.cityName, self.filterText).then(function (customers) {
                    self.peopleLists = [].concat(customers);
                    self.current = customers[0];
                });
            }
            //直接显示搜索结果第一的具体信息
            showTable2Data(self.current.id, 1);
            getAllTable3Datas(self.current.id, 1);
            getAllTable4Datas(self.current.id, 1);
        }

        //选择一个户主显示表二
        function showTable2Data(id, page) {
            self.table2Datas = []

            dataService.getTable1ById(id).then(function (datas) {
                self.current = datas[0];
            });//取表头信息
            dataService.gettable2Datas(id, page).then(function (datas) {
                //console.log("length:"+datas.length);
                //表特殊处理
                var rawDatas = [].concat(datas);
                self.table2Total = { "total": 0, "total2": 0 };
                for (var i = 0; i < rawDatas.length; i++) {
                    if (2 * i + 1 > rawDatas.length)
                        break;
                    self.table2Datas[i] = rawDatas[2 * i];
                    self.table2Datas[i].total = self.table2Datas[i].quantity * self.table2Datas[i].price;
                    self.table2Total.total = self.table2Total.total + self.table2Datas[i].total;

                    if (2 * i + 1 >= rawDatas.length)
                        break;
                    self.table2Datas[i].prj2 = rawDatas[2 * i + 1].prj;
                    self.table2Datas[i].unit2 = rawDatas[2 * i + 1].unit;
                    self.table2Datas[i].quantity2 = rawDatas[2 * i + 1].quantity;
                    self.table2Datas[i].price2 = rawDatas[2 * i + 1].price;
                    self.table2Datas[i].total2 = self.table2Datas[i].quantity2 * self.table2Datas[i].price2;
                    self.table2Total.total2 = self.table2Total.total2 + self.table2Datas[i].total2;
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
        function getAllTable1Datas(page) {
            //console.log("get datas....");
            dataService.getTable1Count().then(function (affectedRows) {
                //console.log("pages:" + Math.ceil(affectedRows[0]["count(*)"]/10));
                self.totalPages = Math.ceil(affectedRows[0]["count(*)"] / 10);

            });

            dataService.getDatas(self.cityName, page).then(function (datas) {
                self.table1Datas = [].concat(datas);
                self.table1Total = { "area": 0, "land": 0, "nonland": 0, "quantity": 0 };
                for (let i = 0; i < self.table1Datas.length; i++) {
                    if (self.table1Datas[i].area != null) {
                        self.table1Total.area = self.table1Total.area + self.table1Datas[i].area;
                    }
                    if (self.table1Datas[i].land != null) {
                        self.table1Total.land = self.table1Total.land + self.table1Datas[i].land;
                    }
                    if (self.table1Datas[i].nonland != null) {
                        self.table1Total.nonland = self.table1Total.nonland + self.table1Datas[i].nonland;
                    }
                    if (self.table1Datas[i].quantity != null) {
                        self.table1Total.quantity = self.table1Total.quantity + self.table1Datas[i].quantity;
                    }
                }
            });
        }

        //添加表一数据
        function saveTable1Data($event) {
            //更新
            if (self.curTable1 != null && self.curTable1.autoID != null) {
                dataService.updateTable1(self.curTable1).then(function (affectedRows) {
                    $mdDialog.show(
                        $mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Success')
                            .content('Data Updated Successfully!')
                            .ok('Ok')
                            .targetEvent($event)
                    );
                });
                dataService.updateTable2ByT1(self.curTable1.id, self.curTable1.prj,
                    self.curTable1.unit, self.curTable1.quantity, self.curTable1.autoID).then(function (affectedRows) {
                    });
                self.curTable1 = {};
                getAllTable1Datas(1);
            }
            //添加
            else {
                self.curTable1.city = self.cityName;
                //添加表二，pID外键对应表一主键
                var currTable2 = {};
                currTable2.id = self.curTable1.id;
                currTable2.prj = self.curTable1.prj;
                currTable2.unit = self.curTable1.unit;
                currTable2.quantity = self.curTable1.quantity;
                //取到表一自增id
                dataService.create(self.curTable1).then(function (affectedRows) {
                    //console.log("affectedRows:" + affectedRows);
                    currTable2.fID = affectedRows;
                    currTable2.price = 0;
                    // currTable2.price = self.paras[self.curTable1.prj];
                    // switch (self.curTable1.prj) {
                    //     case "农作物":
                    //         currTable2.price = self.paras.crop;
                    //         break;
                    //     case "农用设施":
                    //         currTable2.price = self.paras.ss;
                    //         break;
                    //     default:
                    //         currTable2.price = self.paras.tree;
                    // }
                    //TODO 价格先按每个人都不同处理
                    dataService.addTable2(currTable2).then(function (affectedRows) {
                    });

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
                var people = { "id": "", "name": "", "city": "" };
                people.id = self.curTable1.id;
                people.name = self.curTable1.name;
                people.city = self.curTable1.city;
                dataService.addTablePeople(people).then(function (affectedRows) {
                });



                self.curTable1 = {};
                getAllTable1Datas(1);
                //添加4-1表
                // self.curTable41.name = self.curTable1.name;
                // self.curTable41.type = self.curTable1.prj;
                // self.curTable41.unit = self.curTable1.unit;
                // self.curTable41.quantity = self.curTable1.quantity;
                // self.curTable41.city = self.curTable1.city;
                // dataService.addTable41(self.curTable41).then(function (affectedRows) {
                // });
            }

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
            switch (self.tableIndex) {
                case '1':
                    getAllTable1Datas(1);//得到初始表一数据
                    break;
                case '2':
                    getPeopleList();
                    break;
                case '11':
                    getAllTable11Datas();//1-1表数据汇总
                    break;
                case '12':
                    getAllTable12Datas();//1-2表数据汇总
                    break;
                case '42':
                    getAllTable42Datas();//4-2表数据汇总
                    break;
                case '43':
                    getAllTable43Datas(self.cityName);//4-3表数据初始化
                    break;
                default:
                    console.log("no datas..");
            }
        }

        function search() {
            self.currPage = 1;
            //console.log("searchID:"+self.searchName.id);
            switch (self.tableIndex) {
                case '2':
                    showTable2Data(self.searchName.id, 1);
                    break;
                case '3':
                    getAllTable3Datas(self.searchName.id, 1);
                    break;
                case '4':
                    getAllTable4Datas(self.searchName.id, 1);
                    break;
                default:
                    console.log("no datas..");
            }
        }

        function getAllParas() {
            dataService.getAllParas().then(function (datas) {
                self.paras.crop = datas[0].crop;
                self.paras.ss = datas[0].ss;
                self.paras.tree = datas[0].tree;
                self.paras.b1 = datas[0].b1;
                self.paras.b2 = datas[0].b2;
                self.paras.b3 = datas[0].b3;
                self.paras.b4 = datas[0].b4;
                self.paras.b5 = datas[0].b5;
                self.paras.a1 = datas[0].a1;
                self.paras.a2 = datas[0].a2;
            });
        }

        //导出表格
        function outputExcel() {
            switch (self.tableIndex) {
                case '1':
                    outputExcel1();
                    break;
                case '2':
                    outputExcel2();
                    break;
                case '3':
                    outputExcel3();
                    break;
                case '4':
                    outputExcel4();
                    break;
                default:
                    console.log("no datas..");
            }
        }

        function outputExcel2() {
            const fs = require('fs');
            const xlsx = require('better-xlsx');

            const file = new xlsx.File();
            const style = new xlsx.Style();
            style.fill.patternType = 'solid';
            style.fill.fgColor = '00FF0000';
            style.fill.bgColor = 'FF000000';
            style.align.h = 'center';
            style.align.v = 'center';

            const sheet = file.addSheet('Sheet1');
            //表上面内容
            var lines = [];
            lines[0] = "建设项目名称：川南城际铁路 线   标段";
            lines[1] = "铁路建设项目（征）用集体土地面积、青苗及附着物补偿清册";
            lines[2] = self.cityName + " 年 月 日 共 " + self.totalPages + "页 第" + self.currPage + "页";
            for (let i = 0; i < 3; i++) {
                const rowLine = sheet.addRow();
                const cellLine = rowLine.addCell();
                cellLine.value = lines[i];
                cellLine.hMerge = 9;
                if (i == 1)
                    cellLine.style = style;
            }

            //多级表头
            const row1 = sheet.addRow();
            var cell1 = null;
            var table2Heads = ["铁路里程范围", self.current.rail, "户主姓名",
                self.current.name, "身份证号码", self.current.id];
            for (let i = 0; i < 3; i++) {
                cell1 = row1.addCell();
                cell1.value = table2Heads[i * 2];
                cell1 = row1.addCell();
                cell1.value = table2Heads[i * 2 + 1];
                cell1.hMerge = 1;
                cell1 = row1.addCell();
            }

            const row2 = sheet.addRow();
            var cell2 = row2.addCell();
            cell2.value = "青苗及附着物补偿";
            cell2.hMerge = 4;
            cell2.style = style;
            for (let i = 0; i < 4; i++) {
                row2.addCell();
            }
            cell2 = row2.addCell();
            cell2.value = "青苗及附着物补偿";
            cell2.hMerge = 4;
            cell2.style = style;

            const row3 = sheet.addRow();
            var cell3 = null;
            var table2Heads2 = ["类别", "单位", "数量", "标准", "补偿金额"];
            for (let i = 0; i < 5; i++) {
                cell3 = row3.addCell();
                cell3.value = table2Heads2[i];
            }
            for (let i = 0; i < 5; i++) {
                cell3 = row3.addCell();
                cell3.value = table2Heads2[i];
            }

            //表内容
            var table2Content = ["prj", "unit", "quantity", "price", "total",
                "prj2", "unit2", "quantity2", "price2", "total2"];
            for (let i = 0; i < self.table2Datas.length; i++) {
                const rowContent = sheet.addRow();
                for (let j = 0; j < table2Content.length; j++) {
                    const cellContent = rowContent.addCell();
                    cellContent.value = self.table2Datas[i][table2Content[j]];
                }
            }
            //合计行
            const rowTotal = sheet.addRow();
            var cellT1 = rowTotal.addCell();
            cellT1.value = "小计";
            for (let i = 0; i < 3; i++) {
                rowTotal.addCell();
            }
            cellT1 = rowTotal.addCell();
            cellT1.value = self.table2Total.total;
            for (let i = 0; i < 4; i++) {
                rowTotal.addCell();
            }
            cellT1 = rowTotal.addCell();
            cellT1.value = self.table2Total.total2;

            //表尾
            var tableOver = ["乡镇人民政府（公章）： ", "被拆迁人（签字/章）：", "结算人（签字）：",
                "审核人（签字）："];
            for (let i = 0; i < 2; i++) {
                const rowOver = sheet.addRow();

                const cellOver = rowOver.addCell();
                cellOver.value = tableOver[i * 2];
                cellOver.hMerge = 4;

                for (let i = 0; i < 4; i++) {
                    rowOver.addCell();
                }
                const cellOver2 = rowOver.addCell();
                cellOver2.value = tableOver[i * 2 + 1];
                cellOver2.hMerge = 4;
            }


            var excelRoot = 'table/table2/' + self.cityName + self.currPage + '.xlsx';

            file
                .saveAs()
                .pipe(fs.createWriteStream(excelRoot));
        }


        function outputExcel1() {
            const fs = require('fs');
            const xlsx = require('better-xlsx');

            const file = new xlsx.File();
            const style = new xlsx.Style();
            style.fill.patternType = 'solid';
            style.fill.fgColor = '00FF0000';
            style.fill.bgColor = 'FF000000';
            style.align.h = 'center';
            style.align.v = 'center';

            const sheet = file.addSheet('Sheet1');
            //表上面内容
            var lines = [];
            lines[0] = "建设项目名称：川南城际铁路 线   标段";
            lines[1] = "铁路建设项目（征）用集体土地面积、青苗及附着物登记清册";
            lines[2] = self.cityName + " 年 月 日 共 " + self.totalPages + "页 第" + self.currPage + "页";
            for (let i = 0; i < 3; i++) {
                const rowLine = sheet.addRow();
                const cellLine = rowLine.addCell();
                cellLine.value = lines[i];
                cellLine.hMerge = 12;
                if (i == 1)
                    cellLine.style = style;
            }

            //多级表头
            const row1 = sheet.addRow();
            var table1Head = ['姓名', '身份证号码', '家庭人口', '安置人口', '铁路里程范围', '用地性质', '用地面积（亩）', '青苗及附着物补偿', '户主签名', '小计', '耕地', '非耕地', '项目', '单位', '数量'];
            for (let i = 0; i < 9; i++) {
                if (i == 6 || i == 7) {
                    const cell2 = row1.addCell();
                    cell2.value = table1Head[i];
                    cell2.hMerge = 2;
                    cell2.style = style;
                    row1.addCell();
                    row1.addCell();
                }
                else {
                    const cell1 = row1.addCell();
                    cell1.value = table1Head[i];
                    cell1.vMerge = 1;
                    cell1.style = style;
                }
            }
            const row2 = sheet.addRow();
            for (let i = 0; i < 6; i++) {
                row2.addCell();
            }
            for (let i = 9; i < 15; i++) {
                const cell3 = row2.addCell();
                cell3.value = table1Head[i];
                //cell3.style = style;
            }
            //表内容
            var table1Content = ["name", "id", "family", "people", "rail", "type", "area",
                "land", "nonland", "prj", "unit", "quantity"];
            for (let i = 0; i < self.table1Datas.length; i++) {
                const rowContent = sheet.addRow();
                for (let j = 0; j < table1Content.length; j++) {
                    const cellContent = rowContent.addCell();
                    cellContent.value = self.table1Datas[i][table1Content[j]];
                }
            }
            //合计行
            const rowTotal = sheet.addRow();
            const cellT1 = rowTotal.addCell();
            cellT1.value = "本页合计";
            cellT1.hMerge = 1;
            for (let i = 0; i < 5; i++) {
                rowTotal.addCell();
            }
            var totalLine = [];
            totalLine[0] = self.table1Total.area;
            totalLine[1] = self.table1Total.land;
            totalLine[2] = self.table1Total.nonland;
            totalLine[3] = null;
            totalLine[4] = null;
            totalLine[5] = self.table1Total.quantity;
            for (let i = 0; i < totalLine.length; i++) {
                const cellT2 = rowTotal.addCell();
                cellT2.value = totalLine[i];
            }
            //表尾
            var tableOver = ["乡镇人民政府签字（公章）： ", "县（区）铁建办签字（公章）", "铁路建设业主单位签字（公章）：",
                "设计单位签字（公章）：", "监理单位签字（公章）：", "铁路施工单位签字（公章）："];
            for (let i = 0; i < 3; i++) {
                const rowOver = sheet.addRow();

                const cellOver = rowOver.addCell();
                cellOver.value = tableOver[i * 2];
                cellOver.hMerge = 6;

                for (let i = 0; i < 6; i++) {
                    rowOver.addCell();
                }
                const cellOver2 = rowOver.addCell();
                cellOver2.value = tableOver[i * 2 + 1];
                cellOver2.hMerge = 6;
            }

            var excelRoot = 'table/table1/' + self.cityName + self.currPage + '.xlsx';

            file
                .saveAs()
                .pipe(fs.createWriteStream(excelRoot));
        }
    }

})();
