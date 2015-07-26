angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('HomeCtrl', function($scope) {
 
})

.controller('DocumentosCtrl',function($scope,$ionicLoading,$http,$ionicPopup){
    
    var company_id = 1;
    
    $scope.document_status = [
        {
            nome: "Todos"
        },
        {
            nome: "Vigente"
        },
        {
            nome: "Vencidos"
        },
        {
            nome: "A vencer"
        }
    ];
    
    $http({
        method : 'POST',
        url : 'http://104.131.46.59/edocApp/responsavel.php',
        data : {dados:company_id},
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data,status,headers,config){
            $scope.responsaveis = data;
        })
        .error(function(data,status,headers,config){
            var alertPopup = $ionicPopup.alert({
            title: 'Erro inesperado'
        });
    }); 
    
    
    $http({
        method : 'POST',
        url : 'http://104.131.46.59/edocApp/document_type.php',
        data : {dados:company_id},
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data,status,headers,config){
            $scope.document_type = data;
        })
        .error(function(data,status,headers,config){
            var alertPopup = $ionicPopup.alert({
            title: 'Erro inesperado'
        });
    });
    
    $scope.pesquisar = function($documento){
       $ionicLoading.show({
          template: 'Carregando Aguarde...'
       });
        
       $http({
        method : 'POST',
        url : 'http://104.131.46.59/edocApp/index.php',
        data : {dados:$documento}, // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data,status,headers,config){
            $ionicLoading.hide();
            console.log(data);
            $scope.dataDocuments = data;
        })
        .error(function(data,status,headers,config){
            var alertPopup = $ionicPopup.alert({
            title: 'Erro inesperado'
            });
        });
    }
    
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
