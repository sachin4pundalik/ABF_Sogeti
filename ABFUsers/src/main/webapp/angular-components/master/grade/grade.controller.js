webappApp.controller('MasterGradeCtrl', [ '$scope', '$location',
                                         'toastr','DataSetService', 'MasterDataService', 'ABF_CONSTANTS', MasterGradeCtrl_Fn ]);

function MasterGradeCtrl_Fn($scope, $location,toastr, DataSetService, MasterDataService, ABF_CONSTANTS){
	
	$scope.grades = DataSetService.grades;
	
	$scope.grade= {
			gradeId:'',
			gradeType:''
	};
	$scope.currentView='';
	
	$scope.getgrades = function (){
		var url = './grade/all'; //'./masterdata/grades';
		
		MasterDataService.fetchAll(url)
		.then(function(response){
			if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
				$scope.grades = DataSetService.grades = response.data.successResponse;
				$scope.goBack();
				toastr.info("Grades updated from server.", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.GRADES);
			}else{
				toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
			}
		}, function(error){
			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
			console.log(JSON.stringify(error));
		});
	};
	
	$scope.newGrade = function(){
		$scope.currentView ="new";
		$scope.reset();
	}
	
	$scope.update=function(){
		MasterDataService.update('./grade/update', $scope.grade)
		.then(function(response){
			if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
				$scope.getgrades();
				$scope.goBack();
				toastr.info("Grades updated from server.", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.GRADES);
			}else{
				toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
			}
		}, function(error){
			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
			console.log(JSON.stringify(error));
		});
	}
	
	$scope.save= function(){
		
		MasterDataService.save('./grade/create', $scope.grade)
		.then(function(response){
			if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
				$scope.getgrades();
				$scope.goBack();
				toastr.info("Grades updated from server.", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.GRADES);
			}else{
				toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
			}
		}, function(error){
			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
			console.log(JSON.stringify(error));
		});
	};
	
	$scope.edit= function(gradeId){
		$scope.currentView = "edit";
		$scope.getgrade(gradeId);
	};
	
	$scope.getgrade = function ( gradeId ){
		MasterDataService.fetch('./grade/find/', gradeId)
		.then(function(response){
			if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
				$scope.grade = response.data.successResponse;
				toastr.info("Grade updated from server.", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.GRADES);
			}else{
				toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
			}
		}, function(error){
			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
			console.log(JSON.stringify(error));
		});
	}
	
	$scope.remove=function(gradeId){
		MasterDataService.remove('./grade/delete/', gradeId)
		.then(function(response){
			$scope.getgrades();
			toastr.success("Grade is deleted!!", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.GRADES);
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
		$scope.grade= {
				gradeId:'',
				gradeType:''
		};
	};
	
	$scope.getgrades();
}