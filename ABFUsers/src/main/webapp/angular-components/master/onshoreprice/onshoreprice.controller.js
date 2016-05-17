webappApp.controller('MasterOnshorePriceCtrl', [ '$scope', '$location',
                                         'toastr','DataSetService', 'Session', 'masterDataService', 'ABF_CONSTANTS', 'Session', MasterOnshorePriceCtrl_Fn ]);

 function MasterOnshorePriceCtrl_Fn($scope, $location,toastr, DataSetService, masterDataService, ABF_CONSTANTS, Session){
 	
 	$scope.onshoreprices = DataSetService.onshoreprices;
 	$scope.blines = DataSetService.blines;
 	$scope.grades = DataSetService.grades;
 	$scope.roles = DataSetService.roles;
	
 	$scope.price= {
 			onshorepriceId:'0',
 			description:'',
 			price:'',
 			businessLineId:'-1',
 			businessLineName:'',
 			gradeId:'-1',
 			gradeType:'',
 			roleId:'-1',
 			roleType:'',
 			lastUpdatedBy:Session.sessionUser.loginId
 	};
 	
 	$scope.currentView='';
 	
 	$scope.getonshoreprices = function (){
 		var url = './onshorePrice/all'; //'./json/roles.json';
 		
 		masterDataService.fetchAll(url)
 		.then(function(response){
 			if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
 				$scope.onshoreprices = DataSetService.onshoreprices = response.data.successResponse;
 				$scope.goBack();
 				toastr.info("Onshore price updated from server.", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.ONSHORE_PRICES);
 			}else{
 				toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
 			}
 		}, function(error){
 			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
 			console.log(JSON.stringify(error));
 		});
 	};
 	
 	$scope.newprice = function(){
 		$scope.currentView ="new";
 		$scope.reset();
 	}
 	
 	$scope.update=function(){
 		masterDataService.update('./onshorePrice/update', $scope.price)
 		.then(function(response){
 			if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
 				
 				$scope.goBack();
 				$scope.getonshoreprices();
 				toastr.info("Onshore price updated from server.", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.ONSHORE_PRICES);
 			}else{
 				toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
 			}
 		}, function(error){
 			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
 			console.log(JSON.stringify(error));
 		});
 	}
 	
 	$scope.save= function(){
 		
 		masterDataService.save('./onshorePrice/create', $scope.price)
 		.then(function(response){
 			if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
 				
 				$scope.goBack();
 				$scope.getonshoreprices();
 				toastr.info("Onshore price updated from server.", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.ONSHORE_PRICES);
 			}else{
 				toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
 			}
 		}, function(error){
 			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
 			console.log(JSON.stringify(error));
 		});
 	};
 	
 	$scope.edit= function(priceId){
 		$scope.currentView = 'edit';
 		$scope.getprice(priceId);
 	};
 	
 	$scope.getprice = function ( priceId ){
 		masterDataService.fetch('./onshorePrice/find/', priceId)
 		.then(function(response){
 			if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
 				console.log("Success : " + JSON.stringify(response));
 				$scope.price=response.data.successResponse;
 				toastr.info("Onshore price is loaded!!", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.ONSHORE_PRICES);
 				
 			}else{
 				toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
 			}
 		}, function(error){
 			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
 			console.log(JSON.stringify(error));
 		});
 	}
 	
 	$scope.remove=function(priceId){
 		masterDataService.remove('./onshorePrice/delete/', priceId)
 		.then(function(response){
 			$scope.getonshoreprices();
 			toastr.success("Onshore price is deleted!!", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.ONSHORE_PRICES);
 		}, function(error){
 			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
 			console.log(JSON.stringify(error));
 		});
 	};
 	
 	$scope.reset= function(){
 		
 		$scope.price= {
 	 			onshorepriceId:'0',
 	 			description:'',
 	 			price:'',
 	 			businessLineId:'-1',
 	 			businessLineName:'',
 	 			gradeId:'-1',
 	 			gradeType:'',
 	 			roleId:'-1',
 	 			roleType:'',
 	 	 		lastUpdatedBy:DataSetService.loggedInUser.loginId
 	 	};
 	};
 	
 	$scope.goBack = function(){
 		
 		$scope.currentView ='';
 		$scope.reset();
 	}
 	
 	$scope.getonshoreprices();
 	
 	masterDataService.fetchAll('./businessline/all')
 	.then(function(response){
 		if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
 			$scope.blines = DataSetService.blines = response.data.successResponse;
 		}else{
 			toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
 		}
 	}, function(error){
 		toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
 		console.log(JSON.stringify(error));
 	});
 	
 	masterDataService.fetchAll('./role/all')
 	.then(function(response){
 		if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
 			$scope.roles = DataSetService.roles = response.data.successResponse;
 		}else{
 			toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
 		}
 	}, function(error){
 		toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
 		console.log(JSON.stringify(error));
 	});
 	
 	masterDataService.fetchAll('./grade/all')
 	.then(function(response){
 		if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
 			$scope.grades = DataSetService.grades = response.data.successResponse;
 		}else{
 			toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
 		}
 	}, function(error){
 		toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
 		console.log(JSON.stringify(error));
 	});
 	
 }