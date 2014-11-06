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
				{display: 'Tax Relief', name : 'relief', width : 80, sortable : true, align: 'left'},
				{display: 'NHIF', name : 'nhif', width : 80, sortable : true, align: 'left'},
				{display: 'NSSF', name : 'nssf', width : 80, sortable : true, align: 'left'},
				{display: 'Active', name : 'active', width : 80, sortable : true, align: 'left'},
				{display: 'Created At', name : 'created_at', width : 80, sortable : true, align: 'left'}],
			buttons : [
				{name: 'Add', bclass: '', onpress : function(){
				
					Employee.PayDetails.renderFormView();

				}},
				{separator: true},
				{name: 'Delete', bclass: '', onpress : function(){
				
					// if($('.trSelected').attr('alt')!=undefined)
					// 	new ui.ConfirmDialog("Delete Post", "Are you sure?", {"Yes":function(){

					// 			$("BODY").mask("wait...");
					// 			$.destroy('/post/delete/'.concat($('.trSelected').attr('alt')),function(){
								
					// 				setTimeout(function(){

					// 					$(".pReload").click();
					// 					$("BODY").unmask();

					// 				},1000)
					// 			})
					// 			.error(function(){

					// 				$("BODY").unmask();
					// 				new ui.MessageDialog("Post", "Failed to delete post!");
					// 			});

					// 			$(this).dialog("close").remove();
					// 		}
					// 	})
						
				}},
				{name: 'Benefits', bclass: '', onpress : function(){
				
					// Post.renderFormView();
					if(!$("#paydetails .trSelected").attr("alt")){

						new ui.MessageDialog("Pay Details", "Please select an entry!");
					}
					else{

						$("#tabsEmployee").tabs({active:2});
						$("#benefits").flexReload();
					}
				}},
				{name: 'Tax Relief', bclass: '', onpress : function(){
				
					// Post.renderFormView();
					if(!$("#paydetails .trSelected").attr("alt")){

						new ui.MessageDialog("Pay Details", "Please select an entry!");
					}
					else{

						$("#tabsEmployee").tabs({active:3});
						$("#taxrelief").flexReload();
					}
				}},
			],
			// searchitems : [
			// 	{display: 'Name', name : 'name'},
			// 	{display: 'Department', name : 'department', isdefault: true}],
			sortname: "name",
			sortorder: "asc",
			usepager: true,
			title: 'Employee Payroll Information',
			useRp: false,
			rp: 15,
			showTableToggleBtn: false,
			// width: $('.right').width()-10,//700,
			onRowClick:function(){
			
				Employee.PayDetails.renderFormView($(this).attr('alt'));
			},
			onError:function(){

				new ui.MessageDialog("Pay Details", "Failed to load information!");
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