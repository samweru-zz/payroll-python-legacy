jQuery(document).ready(function($){
		
	Employee.PayDetails.renderView = function(){
		
		var tblPayDetails = new ui.Table('paydetails');
		var tablePayDetails = tblPayDetails.getTable();
		tablePayDetails.css({display:'none'});
		
		return tablePayDetails	
	};
	
	Employee.PayDetails.renderFlexiGrid = function(employee_id){
		
		$("#paydetails").flexigrid({

			url: '/payroll/employee/'.concat(employee_id).concat('/pay/details/entries'),
			dataType: 'json',
			colModel : [
				{display: '#', name : '#', width : 180, hide:true, sortable : true, align: 'left'},
				{display: 'Gross Salary', name : 'gross_salary', width : 180, sortable : true, align: 'left'},
				{display: 'NHIF', name : 'nhif', width : 80, sortable : true, align: 'left'},
				{display: 'NSSF', name : 'nssf', width : 80, sortable : true, align: 'left'},
				{display: 'Active', name : 'active', width : 80, sortable : true, align: 'left'},
				{display: 'Created At', name : 'created_at', width : 80, sortable : true, align: 'left'}],
			buttons : [
				{name: 'Add', bclass: '', onpress : function(){
				
					Employee.PayDetails.renderFormView(employee_id);

				}},
				{separator: true},
				{name: 'Delete', bclass: '', onpress : function(){
				
					if($('.trSelected').attr('alt')!=undefined)
						new ui.ConfirmDialog("Employee Payroll Details", "Are you sure?", {"Yes":function(){

								$("BODY").mask("wait...");
								$.destroy('/payroll/employee/pay/details/entry/delete/'.concat($('#paydetails .trSelected').attr('alt')),function(){
								
									setTimeout(function(){

										$("#paydetails").flexReload();
										$("BODY").unmask();

									},1000)
								})
								.error(function(){

									$("BODY").unmask();
									new ui.MessageDialog("Employee Payroll Details", "Failed to delete entry!");
								});

								$(this).dialog("close").remove();
							}
						})
						
				}},
				{name: 'Benefits', bclass: '', onpress : function(){
				
					if(!$("#paydetails .trSelected").attr("alt")){

						new ui.MessageDialog("Employee Pay Details", "Please select an entry!");
					}
					else{

						var pay_details_id = $("#paydetails .trSelected").attr("alt")
						$("#tabsEmployee").tabs({active:2});
						$("#benefits")
							.flexOptions({

								url: '/payroll/employee/pay/details/'.concat(pay_details_id).concat('/benefits'),
							})
							.flexReload();
					}
				}},
				{name: 'Tax Relief', bclass: '', onpress : function(){
				
					if(!$("#paydetails .trSelected").attr("alt")){

						new ui.MessageDialog("Employee Pay Details", "Please select an entry!");
					}
					else{

						var pay_details_id = $("#paydetails .trSelected").attr("alt");
						$("#tabsEmployee").tabs({active:3});
						$("#taxrelief")
							.flexOptions({

								url: '/payroll/employee/pay/details/'.concat(pay_details_id).concat('/tax/relief/details'),
							})
							.flexReload();
					}
				}},
			],
			sortname: "name",
			sortorder: "asc",
			title: 'Employee Payroll Information',
			useRp: false,
			rp: 15,
			showTableToggleBtn: false,
			onRowClick:function(){
			
				Employee.PayDetails.renderFormView(employee_id, $(this).attr('alt'));
			},
			onError:function(){

				new ui.MessageDialog("Employee Pay Details", "Failed to load information!");
			},
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#paydetails").flexOptions({params: dt});

				return true;
			},
			height: 200
		});
	};
}); 