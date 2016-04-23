angular.module('app')
    .controller('OrgCtrl', function($scope, $stateParams, $timeout, InstanceService, OrgService) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        get_organization();


        function get_organization() {
            var id = $stateParams.id;
            OrgService.get(id, function(org) {
                $scope.organization = org;
                OrgService.details(org);
                list_instances(id);
            });
        }


        function list_instances(id) {
            InstanceService.list(id,function(instances) {
                $scope.instances = instances;
                refresh_status();
            });
        }

        function refresh_status() {
            $scope.instances.map(details);
            $timeout(refresh_status, 5000)
        }

        function details(instance) {
            if (instance) {
                InstanceService.details(instance);
            }
        }

        });