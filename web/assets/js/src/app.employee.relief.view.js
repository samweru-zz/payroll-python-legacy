jQuery(document).ready(function($){
		
	Employee.Relief.renderView = function(){
		
		var tblRelief = new ui.Table('taxrelief');
		var tableRelief = tblRelief.getTable();
		tableRelief.css({display:'none'});
		
		return tableRelief;
	};
	
	Employee.Relief.renderFlexiGrid = function(){

		var pay_details_id = $("#paydetails .trSelected").attr("alt");

		$("#taxrelief").flexigrid({

			url: '/payroll/employee/pay/details/'.concat(pay_details_id).concat('/tax/relief/details'),
			dataType: 'json',
			autoload: false,
			colModel : [
				{display: '#', name : '#', width : 180, hide:true, sortable : true, align: 'left'},
				{display: 'Name', name : 'relief', width : 180, sortable : true, align: 'left'}],
			buttons : [
				{name: 'Add', bclass: '', onpress : function(){
				
					var payDetailsId = $("#paydetails .trSelected").attr("alt");
					var taxReliefId = $("#crelief").val();
					if(!payDetailsId){

						$("#tabsEmployee").tabs({active:1});
						new ui.MessageDialog("Employee Tax Relief", "Please select employee payroll details entry!");
					}
					else{

						if(!taxReliefId){

							new ui.MessageDialog("Employee Tax Relief", "Please select tax relief type from combo box!")	
						}
						else{

							$("body").mask("saving tax relief type....");
							$.create("/payroll/employee/tax/relief/add", {

								"pay_details":payDetailsId,
								"relief": taxReliefId
							}, 
							function(response){

								if(response.success){

									setTimeout(function(){

										$("#taxrelief").flexReload();
										$("BODY").unmask();

									},1000)
								}
								else{

									$("body").unmask();
									if(response.msg == undefined){

										new ui.MessageDialog("Employee Tax Relief", "Failed to save employee tax relief type!")	
									}
									else{

										new ui.MessageDialog("Employee Tax Relief", response.msg)	
									}
								}
							})
							.error(function(){

								$("body").unmask();
								new ui.MessageDialog("Employee Tax Relief", "Failed to add tax relief type to employee!")
							});
						}
					}

				}},
				{separator: true},
				{name: 'Delete', bclass: '', onpress : function(){
				
					if($('#taxrelief .trSelected').attr('alt')!=undefined)
						new ui.ConfirmDialog("Delete Employee Tax Relief Entry", "Are you sure?", {"Yes":function(){

								$("BODY").mask("wait...");
								$.destroy('/payroll/employee/tax/relief/delete/'.concat($('#taxrelief .trSelected').attr('alt')),function(){
								
									setTimeout(function(){

										$("#taxrelief").flexReload();
										$("BODY").unmask();

									},1000)
								})
								.error(function(){

									$("BODY").unmask();
									new ui.MessageDialog("Employee Tax Relief Entry", "Failed to delete employee tax relief entry!");
								});

								$(this).dialog("close").remove();
							}
						})
				}},
				{name: 'Refresh', bclass: '', onpress : function(){

					var pay_details_id = $("#paydetails .trSelected").attr("alt")
					if(!!pay_details_id)
						$("#taxrelief")
							.flexOptions({

								url: '/payroll/employee/pay/details/'.concat(pay_details_id).concat('/tax/relief/details')
							})
							.flexReload();
				}}
			],
			sortname: "name",
			sortorder: "asc",
			title: 'Employee Tax Relief',
			showTableToggleBtn: false,
			onRowClick:function(){
			
				//
			},
			onError:function(){

				new ui.MessageDialog("Tax Relief", "Failed to load information!");
			},
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#taxrelief").flexOptions({params: dt});

				return true;
			},
			height: 200
		});
	}
}); 