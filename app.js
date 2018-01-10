var app = angular.module('myApp', ['type', 'service_getTouTiao', 'directive_content']);

var dataSource = { 'tou': null, 'shehui': null, 'guonei': null, 'guoji': null, 'yule': null, 'tiyu': null, 'junshi': null, 'keji': null, 'caijing': null, 'shishang': null };
var current = [];

app.controller('myController', ['$scope', 'type', 'getTouTiao', function($scope, type, getTouTiao) {


    $scope.types = ['tou', 'shehui', 'guonei', 'guoji', 'yule', 'tiyu', 'junshi', 'keji', 'caijing', 'shishang'];
    // type值为注入的服务type
    $scope.type = type;

    $scope.currType = null;

    $scope.getData = function(event, tp) {
            console.log(tp);
            $scope.currType = tp;
            //刷新加载动画
            $scope.current = [];

            getTouTiao.request(tp)
                .then(function(data) {

                    // 判定没有错误再赋值
                    if (data.error_code == 0)
                        dataSource[tp] = data.result.data;

                    // 容错机制
                    if (dataSource[tp] != null) {
                        current = dataSource[tp].slice(0, 10);
                        $scope.current = current;
                    }
                    // 需要写在$scope.current赋值后面
                    if (event == null) {
                        $('#tou').addClass('active');
                        $('#tou').addClass('in');
                        $('.navbar-nav li:nth-child(1)').addClass('active');
                    }


                }, function(error) {
                    console.log(error);
                });


        }
        // 首次加载数据
    $scope.getData(null, 'tou');
    $scope.loadmore = function() {
            var start = current.length;
            var end = start + 10;
            current = current.concat(dataSource[$scope.currType].slice(start, end));
            $scope.current = current;
        }
        // 决定加载更多是否显示
    $scope.isShow = function() {
        if ($scope.current != null && $scope.current.length == 30) {
            return false;
        }
        if ($scope.current != null && $scope.current.length > 0) {
            return true;
        }
        return false;
    };
    // 决定加载动画是否显示
    $scope.isHide = function() {

        if ($scope.current == null || $scope.current.length == 0) {
            return true;
        } else
            return false;
    };
    // 收起响应式菜单
    $scope.collapse = function() {
        $('#myCollapse').collapse('toggle');
    }
}]);