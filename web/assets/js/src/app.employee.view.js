jQuery(document).ready(function($){

	Employee.renderReportView = function(){

		Employee.renderView();
		Employee.renderFlexiGrid({

			title: "Employee Payment Report",
			singleSelect:false,
			onRowClick:function(){
			
				//
			},
			buttons:[

				{name:'View Details', bclass:'', onpress:function(){

					switch($("#employee .trSelected").length){

						case 0:
							new ui.MessageDialog("Employee Payment Report", "Please select an employee!");
						break;
						case 1:
							Employee.renderTabView($("#employee .trSelected").attr('alt'));
						break;
						default:
							new ui.MessageDialog("Employee Payment Report", "Please select a single employee!");
					}
				}},
				{name:"Pay Report", bclass:'', onpress:function(){

					//
				}}
			]
		})
	}

	Employee.renderDetailsView = function(){

		Employee.renderView();
		Employee.renderFlexiGrid({

			title: "Employees",
			singleSelect: true,
			onRowClick:function(){
			
				Employee.renderTabView($(this).attr('alt'))
			},
			buttons:[

				{name: 'Add', bclass: '', onpress : function(){
					
					Employee.renderTabView();
				}},
				{name: 'Delete', bclass: '', onpress : function(){
				
					if($('.trSelected').attr('alt')!=undefined)
						new ui.ConfirmDialog("Delete Employee", "Are you sure?", {"Yes":function(){

								$("BODY").mask("wait...");
								$.destroy('/employee/delete/'.concat($('.trSelected').attr('alt')),function(){
								
									setTimeout(function(){

										$("#employee").flexReload();
										$("BODY").unmask();

									},1000)
								})
								.error(function(){

									$("BODY").unmask();
									new ui.MessageDialog("Employee", "Failed to delete employee!");
								});

								$(this).dialog("close").remove();
							}
						})
				}},
				{separator: true}
			]
		})
	}

	Employee.renderView = function(){
		
		var tblEmployee = new ui.Table('employee');
		var tableEmployee = tblEmployee.getTable();
		tableEmployee.css({display:'none'});

		$(".right")
			.empty()
			.append(tableEmployee);
	};
	
	Employee.renderFlexiGrid = function(options){
		
		$("#employee").flexigrid({

			url: '/employee/all',
			dataType: 'json',
			colModel : [
				{display: '#', name : '#', width : 180, hide:true, sortable : true, align: 'left'},
				{display: 'EmployeeNo.', name : 'no', width : 180, sortable : true, align: 'left'},
				{display: 'Surname', name : 'surname', width : 180, sortable : true, align: 'left'},
				{display: 'Othernames', name : 'othernames', width : 180, sortable : true, align: 'left'},
				{display: 'Post', name : 'post', width : 180, sortable : true, align: 'left'},
				{display: 'Active', name : 'post', width : 180, sortable : true, align: 'left'}],
			singleSelect : options.singleSelect,
			buttons : options.buttons,
			title : options.title,
			onRowClick: options.onRowClick,
			searchitems : [
				{display: 'EmployeeNo.', name : 'name'},
				{display: 'Surname', name : 'surname', isdefault: true},
				{display: 'Othernames', name : 'othernames', isdefault: true},
				{display: 'Post', name : 'post', isdefault: true},
				{display: 'Active', name : 'active', isdefault: true}],
			sortname: "name",
			sortorder: "asc",
			usepager: true,
			useRp: false,
			rp: 15,
			showTableToggleBtn: false,
			width: $('.right').width()-10,//700,
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#employee").flexOptions({params: dt});

				return true;
			},
			height: 200
		});
	};
}); 