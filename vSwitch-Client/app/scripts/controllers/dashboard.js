angular.module('app')
    .controller('DashboardCtrl', function($scope, $state, $timeout, OrgService, VpnService) {

        $scope.connect = connect;
        $scope.disconnect = disconnect;
        $scope.connected = false;
        $scope.view_organization = view_organization;

        list_organizations();


        function list_organizations() {
            OrgService.list(function(orgs) {
                $scope.organizations = orgs;
                refresh_status();
            });
        }

        function refresh_status() {
            $scope.organizations.map(details);
            $scope.organizations.map(vpn_status);
            $timeout(refresh_status, 5000)
        }

        function details(organization) {
            OrgService.details(organization);
        }

        function connect(organization) {
            organization.connecting = true;
            VpnService.connect(organization);
            vpn_status(organization);
        }

        function disconnect(organization) {
            VpnService.disconnect();
            organization.connecting = false;
            organization.connected = false;
        }

        function vpn_status(organization) {
            VpnService.monitor(organization);

            if (organization.connected) {
                organization.connecting = false;
                return
            }

            $timeout(function() {
                vpn_status(organization);
            }, 500);
        }

        function view_organization(organization) {
            $state.go('organization', {id:organization.id});
        }

    });