app.controller('employeesController',function($scope,$http,API_URL){

	$http.get(API_URL+"employees")
		  .success(function(response){
		  	$scope.employees=response;
		  });	

	$scope.toggle=function(modalstate,id){
		$scope.modalstate=modalstate;

		switch(modalstate){
			case 'add':
				$scope.form_title="Add New Employee ";
				break;
			case 'edit':
				$scope.form_title="Employee Detail";
				$scope.id=id;
				$http.get(API_URL+'employees/'+id)
				.success(function(response){
					console.log(response);
					$scope.employee=response;
				});
				break;
			default:
				break;
		}
		console.log(id);
		$("#myModal").modal("show");
	}	  
		
	 $scope.save=function(modalstate,id){
	 	var url=API_URL+"employees";

	 	if(modalstate==='edit'){
	 		url+="/"+id;
	 	}

	 	$http({
	 		method:"POST",
	 		url:url,
	 		data:$.param($scope.employee),
	 		headers:{'Content-Type':'application/x-www-form-urlencoded'}
	 	}).success(function(response){
	 		console.log(response);
	 		location.reload();
	 	}).error(function(response){
	 		console.log(response);
	 		alert("This is embrassing.An error has occured.Please check the log for details.");
	 	});
	 }

	 $scope.confirmDelete=function(id){
	 	var isConfirmDelete=confirm("Are you sure you want this record.");
	 	if(isConfirmDelete){
	 		$http({
	 			method:'DELETE',
	 			url:API_URL+'employees/'+id
	 		}).
	 		success(function(data){
	 			console.log(data);
	 			location.reload();
	 		}).
	 		error(function(data){
	 			console.log(data);
	 			alert("Unable to delete");
	 		})

	 	}else{
	 		return false;
	 	}
	 }
	 

});