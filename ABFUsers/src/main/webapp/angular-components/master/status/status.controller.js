webappApp.controller('MasterApprovalStatusCtrl', [ '$scope', '$location',
                                         'toastr','DataSetService', 'MasterDataService', 'ABF_CONSTANTS', MasterApprovalStatusCtrl_Fn ]);

function MasterApprovalStatusCtrl_Fn($scope, $location,toastr, DataSetService, MasterDataService, ABF_CONSTANTS){
	
	$scope.statuses = DataSetService.statuses;
	
	$scope.statuse= {
			statusId:'',
			description:'',
			statusName:''	
	};
	
	$scope.currentView='';
	
	$scope.getstatuses = function (){
		MasterDataService.fetchAll('./status/all')
		.then(function(response){
			$scope.statuses = DataSetService.statuses = response.data.successResponse;
			toastr.info("statuses updated from server.", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.STATUS);
		}, function(error){
			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
			console.log(JSON.stringify(error));
		});
	};
	
	$scope.newAStatus = function(){
		$scope.currentView ="new";
		$scope.reset();
	}
	
	$scope.update=function(){
		MasterDataService.update('./grade/update', $scope.grade)
		.then(function(response){
			if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
				$scope.getstatuses();
				$scope.goBack();
				toastr.success("Grades updated from server.", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.STATUS);
			}else{
				toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
			}
		}, function(error){
			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
			console.log(JSON.stringify(error));
		});
	}
	
	$scope.save= function(){
		
		MasterDataService.save('./status/create', $scope.status)
		.then(function(response){
			$scope.getstatuses();
			$scope.goBack();
			toastr.success("Grades saved to server.", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.STATUS);
		}, function(error){
			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
			console.log(JSON.stringify(error));
		});
	};
	
	$scope.edit= function(statuseId){
		$scope.currentView = 'edit';
		$scope.getstatus(statuseId);
	};
	
	$scope.getstatus = function ( statuseId ){
		MasterDataService.fetch('./status/find/', statuseId)
		.then(function(response){
			$scope.status=response.data.successResponse;
			toastr.info("statuse is loaded!!", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.STATUS);
		}, function(error){
			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
			console.log(JSON.stringify(error));
		});
	}
	$scope.remove=function(statusId){
		MasterDataService.remove('./status/delete/', statusId)
		.then(function(response){
			$scope.getstatuses();
			toastr.success("Status is deleted!!", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.STATUS);
		}, function(error){
			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
			console.log(JSON.stringify(error));
		});
	};
	
	$scope.goBack = function(){
		
		$scope.currentView ='';
		$scope.reset();
	}
	$scope.reset=function(){
		$scope.status= {
				statusId:'',
				description:'',
				statusName:''	
		};
	};
	$scope.getstatuses();
}