'use strict';

angular.module('vSwitchUiApp')
    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
    .controller('OrgCtrl', function($scope, $timeout, $location, OrgService, InstanceService, CertificateService) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // $scope variables
        $scope.code = "";

        // Scope functions
        $scope.add_instance = add_instance;
        $scope.rem_instance = rem_instance;
        $scope.edit_instance = edit_instance;
        $scope.start = start;
        $scope.stop = stop;

        $scope.generateCsr = generateCsr;
        $scope.upload = upload;
        $scope.edit_organization = edit_organization;

        $scope.user = JSON.parse(localStorage.getItem('user'));

        $scope.apple_client = apple_client;

        $scope.active = $scope.active == null ? 3 : $scope.active;
        get_organization();

        // Functions

        function get_organization() {
            var id = localStorage.getItem("current");
            OrgService.get(id, function(org) {
                $scope.organization = org;
            })

            list_instances();
        }

        function list_instances() {
            InstanceService.list(function(instances) {
                $scope.instances = instances
                if ($scope.instances.length > 0 ) {
                    $scope.new_instance = false;
                } else {
                    $scope.new_instance = true;

                }
            });
            $scope.instance = {};
        }

        function add_instance() {
            var instance = $scope.instance;
            InstanceService.add(instance, list_instances);
            $scope.new_instance = false;
        }


        function rem_instance(index) {
            var instance = $scope.instances[index];
            if (confirm("Are yoy sure you want to delete instance " + $scope.instances[index].name))
                InstanceService.delete(instance, list_instances);
        }

        function edit_instance(index) {
            var instance = $scope.instances[index];
            instance.edit = instance.edit ? false : true;
            if (!instance.edit)
                InstanceService.update(instance);
        }

        function stop(index) {
            var instance = $scope.instances[index];
            InstanceService.stop(instance);
        }

        function start(index) {
            var instance = $scope.instances[index];
            InstanceService.start(instance);
        }

        function generateCsr() {
            CertificateService.csr($scope.organization);
        }

        function upload() {
            var file = $scope.file;
            console.log('file is ' );
            console.dir(file);
            CertificateService.sign(file);
        }

        function edit_organization() {
            var organization = $scope.organization;
            console.log(organization)
            OrgService.update(organization);
        }

        function apple_client() {
            window.open('https://tunnelblick.net/downloads.html');
        }
    });
