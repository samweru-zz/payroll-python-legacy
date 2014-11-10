jQuery(document).ready(function($){
		
	Employee.Benefits.renderView = function(){
		
		var tblBenefits = new ui.Table('benefits');
		var tableBenefits = tblBenefits.getTable();
		tableBenefits.css({display:'none'});
		
		return tableBenefits;
	};
	
	Employee.Benefits.renderFlexiGrid = function(){

		var pay_details_id = $("#paydetails .trSelected").attr("alt");

		$("#benefits").flexigrid({

			url: '/payroll/employee/pay/details/'.concat(pay_details_id).concat('/benefits'),
			dataType: 'json',
			autoload: false,
			colModel : [
				{display: '#', name : '#', width : 180, hide:true, sortable : true, align: 'left'},
				{display: 'Name', name : 'benefit', width : 180, sortable : true, align: 'left'}],
			buttons : [
				{name: 'Add', bclass: '', onpress : function(){
				
					var payDetailsId = $("#paydetails .trSelected").attr("alt");
					var benefitId = $("#cbenefits").val();
					if(!payDetailsId){

						$("#tabsEmployee").tabs({active:1});
						new ui.MessageDialog("Employee Benefits", "Please select employee payroll details entry!");
					}
					else{

						if(!benefitId){

							new ui.MessageDialog("Employee Benefits", "Please select benefit from combo box!")	
						}
						else{

							$("body").mask("saving benefit....");
							$.create("/payroll/employee/benefit/add", {

								"pay_details":payDetailsId,
								"benefit": benefitId
							}, 
							function(response){

								if(response.success){

									setTimeout(function(){

										$("#benefits").flexReload();
										$("BODY").unmask();

									},1000)
								}
								else{

									$("body").unmask();
									if(response.msg == undefined){

										new ui.MessageDialog("Employee Benefits", "Failed to save employee benefit!")	
									}
									else{

										new ui.MessageDialog("Employee Benefits", response.msg)	
									}
								}
							})
							.error(function(){

								$("body").unmask();
								new ui.MessageDialog("Employee Benefits", "Failed to add benefit to employee!")
							});
						}
					}
				}},
				{separator: true},
				{name: 'Delete', bclass: '', onpress : function(){
				
					if($('#benefits .trSelected').attr('alt')!=undefined)
						new ui.ConfirmDialog("Delete Employee Benefit", "Are you sure?", {"Yes":function(){

								$("BODY").mask("wait...");
								$.destroy('/payroll/employee/benefit/delete/'.concat($('#benefits .trSelected').attr('alt')),function(){
								
									setTimeout(function(){

										$("#benefits").flexReload();
										$("BODY").unmask();

									},1000)
								})
								.error(function(){

									$("BODY").unmask();
									new ui.MessageDialog("Employee Benefits", "Failed to delete employee benefit!");
								});

								$(this).dialog("close").remove();
							}
						})
				}},
				{name: 'Refresh', bclass: '', onpress : function(){

					var pay_details_id = $("#paydetails .trSelected").attr("alt")
					if(!!pay_details_id)
						$("#benefits")
							.flexOptions({

								url: '/payroll/employee/pay/details/'.concat(pay_details_id).concat('/benefits'),
							})
							.flexReload();
				}}
			],
			sortname: "name",
			sortorder: "asc",
			title: 'Employee Benefits',
			showTableToggleBtn: false,
			onRowClick:function(){
			
				//
			},
			onError:function(){

				new ui.MessageDialog("Benefits", "Failed to load information!");
			},
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#benefits").flexOptions({params: dt});

				return true;
			},
			height: 200
		});
	}
}); 