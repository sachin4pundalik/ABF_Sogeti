webappApp.controller('MasterSkillCtrl', [ '$scope', '$location',
                                         'toastr','dataSetService', 'masterDataService', 'ABF_CONSTANTS', MasterSkillCtrl_Fn ]);

function MasterSkillCtrl_Fn($scope, $location,toastr, dataSetService, masterDataService, ABF_CONSTANTS){
	
	$scope.skills = dataSetService.skills;
	
	$scope.skill= {
			skillId:'',
			skillName:''
	};
	$scope.currentView='';
	
	$scope.getskills = function (){
		var url = './json/skills.json'; //'./masterdata/skills';
		
		masterDataService.fetchAll(url)
		.then(function(response){
			if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
				console.log("Success : " + JSON.stringify(response.data.successResponse));
				$scope.skills = dataSetService.skills = response.data.successResponse;
				toastr.info("skills updated from server.", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.SKILLS);
			}else{
				toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
			}
			
		}, function(error){
			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
			console.log(JSON.stringify(error));
		});
	};
	
	$scope.newSkill = function(){
		$scope.currentView ="new";
	}
	
	$scope.update=function(){
		masterDataService.update('./masterdata/skill/update', $scope.skill)
		.then(function(response){
			if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
				console.log("Success : " + JSON.stringify(response));
				$scope.skills = dataSetService.skills = response.data.successResponse;
				goBack();
				toastr.info("rTypes updated from server.", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.RESOURCE_TYPES);
			}else{
				toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
			}
		}, function(error){
			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
			console.log(JSON.stringify(error));
		});
	}
	
	$scope.save= function(){
		
		masterDataService.save('./masterdata/skill/save', $scope.skill)
		.then(function(response){
			if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
				console.log("Success : " + JSON.stringify(response.data.successResponse));
				$scope.skills = dataSetService.skills = response.data.successResponse;
				goBack();
				toastr.info("skills updated from server.", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.SKILLS);
			}else{
				toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
			}
			
		}, function(error){
			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
			console.log(JSON.stringify(error));
		});
	};
	
	$scope.edit= function(skillId){
		$scope.currentView = 'edit';
		$scope.getskill(skillId);
	};
	
	$scope.getskill = function ( skillId ){
		masterDataService.fetch('./masterdata/skill/', skillId)
		.then(function(response){
			if(angular.equals(response.data.status, ABF_CONSTANTS.SUCCESS)){
				console.log("Success : " + JSON.stringify(response.data.successResponse));
				$scope.skill=response.data.successResponse;
				toastr.info("skill is loaded!!", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.SKILLS);
			}else{
				toastr.error(response.data.failureResponse, ABF_CONSTANTS.FAILURE_HEADER);
			}
			
		}, function(error){
			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
			console.log(JSON.stringify(error));
		});
	}
	
	$scope.remove=function(skillId){
		masterDataService.remove('./skill/delete/', skillId)
		.then(function(response){
			$scope.getskills();
			toastr.success("Skill is deleted!!", ABF_CONSTANTS.MASTER_DATA+ ABF_CONSTANTS.SKILLS);
		}, function(error){
			toastr.error("Unable to perform operation!!", ABF_CONSTANTS.FAILURE_HEADER);
			console.log(JSON.stringify(error));
		});
	};
	
	$scope.goBack = function(){
		
		$scope.currentView ='';
		$scope.skill= {
				skillId:'',
				skillName:''
		};
	}
	
	$scope.getskills();
}