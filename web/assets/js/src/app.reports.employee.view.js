jQuery(document).ready(function($){

	Reports.Employee.renderView = function(){
	
		$(".right").html("");
		
		var tblEmployee = new ui.Table('employee');
		var tableEmployee = tblEmployee.getTable();
		tableEmployee.css({display:'none'});
		tableEmployee.appendTo($(".right"));
		
		Reports.Employee.renderFlexiGrid();
	};
	
	Reports.Employee.renderFlexiGrid = function(){
	
		$("#employee").flexigrid({

			url: '../index.php?action=employee',
			dataType: 'json',
			colModel : [
				{display: '#', name : '#', sortable : true, align: 'left'},
				{display: 'EmployeeNo.', name : 'no', width : 180, sortable : true, align: 'left'},
				{display: 'Surname', name : 'surname', width : 180, sortable : true, align: 'left'},
				{display: 'Othernames', name : 'othernames', width : 180, sortable : true, align: 'left'},
				{display: 'Post', name : 'post', width : 180, sortable : true, align: 'left'},
				{display: 'Active', name : 'post', width : 180, sortable : true, align: 'left'}],
			buttons : [
				{name: 'Employee Details', bclass: '', onpress : function(){
				
						if(!!$(".trSelected").attr('alt')){
						
							Employee.renderFormsView($(".trSelected").attr('alt'));
						}
						else alert("Please Select Employee.");
					}
				},
				{separator: true},
				{name: 'Pay Report', bclass: '', onpress : function(){
				
						var employees = new String('employees[]=');
						
						$(".trSelected").each(function(i,e){

							employees += (!i)?$(e).attr('alt'):'&employees[]='+$(e).attr('alt');
						});	
						
						window.open('../reports/payslip/?'.concat(employees));
					}
				}
			],
			sortname: "name",
			sortorder: "asc",
			usepager: false,
			title: 'Employee Payment Report',
			singleSelect:false,
			maskAjaxRequest:true,
			maskAjaxRequestMsg:'Searching Employees...',
			useRp: false,
			rp: 15,
			showTableToggleBtn: false,
			onRowClick:function(){
			
				window.open("../reports/payslip/?employees[]="+$(this).attr('alt'));
			},
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#employee").flexOptions({params: dt});

				return true;
			},
			height: 200
		});
	}
});		