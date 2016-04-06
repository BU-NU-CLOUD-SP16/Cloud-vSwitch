'use strict';
angular.module('vSwitchUiApp')
    .controller('OrgCtrl', function($scope, $timeout, $location, OrgService, InstanceService) {

        // $scope variables
        $scope.code = "";
        $scope.active = $scope.active == null ? 3 : $scope.active;

        // Scope functions
        $scope.add_instance = add_instance;
        $scope.rem_instance = rem_instance;
        $scope.edit_instance = edit_instance;
        $scope.start = start;
        $scope.stop = stop;

        $scope.edit_organization = edit_organization;

        $scope.user = JSON.parse(localStorage.getItem('user'));

        $scope.details = details;
        $scope.ovpn = ovpn;

        get_organization();

        // Functions

        function get_organization() {
            var id = localStorage.getItem("current");
            OrgService.get(id, function(org) {
                $scope.organization = org;
                OrgService.details(org)
            });

            list_instances();
        }

        function list_instances() {
            InstanceService.list(function(instances) {
                $scope.instances = instances;
                refresh_status();
                $scope.new_instance = ! (instances.length > 0);
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

        function edit_organization() {
            var organization = $scope.organization;
            OrgService.update(organization);
        }

        function details(instance) {
            InstanceService.details(instance);
        }

        function ovpn(organization) {
            var content = "client\n" +
            "dev tun\n"+
            "proto tcp\n"+
            "remote " + organization.float_ip + " 80\n"+
            "resolv-retry infinite\n"+
            "nobind\n"+
            "comp-lzo\n"+
            "persist-tun\n"+
            "persist-key\n"+
            "verb 4\n";

            var blob = new Blob([ content ], { type : 'text/plain' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = "client.txt";
            a.click();
            window.URL.revokeObjectURL(url);
        }

        function refresh_status() {
            $scope.instances.map(details);
            $timeout(refresh_status, 5000)
        }
    });
