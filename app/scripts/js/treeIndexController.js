(function () {
    'use strict';
    angular.module('app')
        .controller('treeIndexController', ['customerService', '$q', '$mdDialog', treeIndexController]);

    function treeIndexController(customerService, $q, $mdDialog) {
        console.log("载入treeIndexController");

        var self = this;
        self.cityName= "";
        self.cityLevel='1';
        self.tableIndex='0';
        self.citys1 = [{"name":"内江市","flag":false}, {"name":"自贡市","flag":false}, {"name":"泸州市","flag":false}];
        self.citys2 = [{"name":"内江市东兴区","flag":false}, {"name":"内江市市中区","flag":false},{"name":"大安区","flag":false}, {"name":"沿滩区","flag":false},
                       {"name":"富顺县","flag":false}, {"name":"泸县","flag":false},{"name":"龙马潭区","flag":false}];
        self.citys3 = [{"name":"内江市东兴区高桥街道办","flag":false}, {"name":"内江市东兴区郭北镇","flag":false}, {"name":"内江市东兴区东兴街道","flag":false}, {"name":"内江市东兴区胜利街道","flag":false},
                       {"name":"内江市东兴区新江街道","flag":false}, {"name":"内江市市中区乐贤街道","flag":false}, {"name":"内江市市中区白马镇","flag":false}, {"name":"内江市市中区凤鸣镇","flag":false},
                       {"name":"内江市市中区交通镇","flag":false}, {"name":"内江市市中区永安镇","flag":false}, {"name":"内江市市中区伏龙镇","flag":false}, {"name":"内江市市中区凌家镇","flag":false}];
        self.isShowCity1 = isShowCity1;
        self.isShowCity2 = isShowCity2;
        self.isShowCity3 = isShowCity3;
        self.selectItem = selectItem;
        self.selectTable = selectTable;

        //----------------------
        // Internal functions 
        //----------------------

        function isShowCity1(index) {  //第一层展开
            if (self.citys1[index].flag == false)
                self.citys1[index].flag = true;
            else
                self.citys1[index].flag = false;
            self.cityName=self.citys1[index].name;
            self.cityLevel='1';
            //console.log("self.citys1[index].flag:"+self.citys1[index].flag);
        }
        function isShowCity2(index) {  //第二层展开
            if (self.citys2[index].flag == false)
                self.citys2[index].flag = true;
            else
                self.citys2[index].flag = false;
            self.cityName=self.citys2[index].name;
            self.cityLevel='2';
            //console.log("self.citys2[index].flag:"+self.citys2[index].flag);
        }
        function isShowCity3(index) {  //第三层展开
            if (self.citys3[index].flag == false)
                self.citys3[index].flag = true;
            else
                self.citys3[index].flag = false;
            self.cityName=self.citys3[index].name;
            self.cityLevel='3';
            //console.log("self.citys3[index].flag:"+self.citys3[index].flag);
        }
        function selectItem(item) {    //第四层选择
            //console.log("cityName:" + item);
            self.cityName=item;
            self.cityLevel='4';
        }
        function selectTable(index){
            self.tableIndex=index;
        }
    }

})();