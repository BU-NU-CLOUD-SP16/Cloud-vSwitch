'use strict';

/**
 * @ngdoc function
 * @name vSwitchUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vSwitchUiApp
 */
angular.module('vSwitchUiApp')
    .controller('DashboardCtrl', function($scope, $rootScope, $location, $timeout, OrgService, toastr) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // Scope variables
        $scope.organization = {};

        // Scope functions
        $scope.new_org = new_org;
        $scope.add_organization = add_organization;
        $scope.join_organization = join_organization;
        $scope.rem_organization = rem_organization;
        $scope.edit_organization = edit_organization;
        $scope.view_organization = view_organization;
        $scope.details = details;


        $scope.active = 1;

        list_organizations();

        // Functions

        function list_organizations() {
            OrgService.list(function(orgs) {
                $scope.organizations = orgs;
                if ($scope.organizations.length > 0 ) {
                    $scope.new_organization = false;

                    for (var i in orgs) {
                        details(orgs[i]);
                    }
                } else {
                    $scope.new_organization = true;

                }
            })

        }

        function new_org() {
            $scope.new_organization = true;
            $scope.organization = {};
            OrgService.geo(function(geo) {
                $scope.organization.providence = geo.region;
                $scope.organization.city = geo.city;
                $scope.organization.country = geo.country;
            })
        }

        function add_organization() {
            if ($scope.provider == "moc") {
                $scope.organization.moc = $scope.moc.id;
            }
            OrgService.add($scope.organization, list_organizations);
        }


        function join_organization() {
            var code = $scope.code;
            OrgService.join(code, list_organizations);
            $scope.code = "";
        }

        function edit_organization(index) {
            var organization = $scope.organizations[index];
            organization.edit = organization.edit ? false : true;
            if (!organization.edit)
                OrgService.update(organization);
        }

        function rem_organization(index) {

            if (confirm("Are you sure you want to remove " + $scope.organizations[index].name)) {
                var organization = $scope.organizations[index];
                OrgService.delete(organization, list_organizations);
            }
        }

        function view_organization(index) {
            localStorage.setItem('current', $scope.organizations[index].id);
            $location.path('/organization');
        }

        function details(organization) {
            OrgService.details(organization);
        }

    });
