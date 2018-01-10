var app = angular.module('directive_content', []);
app.directive('content', [function() {
    return {
        templateUrl: './templates/demo_template.html',
        replace: true,
        restrict: 'ECMA',
        scope: {
            title: '@',
            author: '@',
            date: '@',
            img: '@'
        }
    };
}]);