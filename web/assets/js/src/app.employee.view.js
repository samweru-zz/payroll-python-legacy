jQuery(document).ready(function($){
		
	Employee.renderView = function(){
		
		var tblEmployee = new ui.Table('employee');
		var tableEmployee = tblEmployee.getTable();
		tableEmployee.css({display:'none'});

		$(".right")
			.empty()
			.append(tableEmployee);
		
		Employee.renderFlexiGrid();
	};
	
	Employee.renderFlexiGrid = function(){
		
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
			buttons : [
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
			],
			searchitems : [
				{display: 'EmployeeNo.', name : 'name'},
				{display: 'Surname', name : 'surname', isdefault: true},
				{display: 'Othernames', name : 'othernames', isdefault: true},
				{display: 'Post', name : 'post', isdefault: true},
				{display: 'Active', name : 'active', isdefault: true}],
			sortname: "name",
			sortorder: "asc",
			usepager: true,
			title: 'Employees',
			useRp: false,
			rp: 15,
			showTableToggleBtn: false,
			width: $('.right').width()-10,//700,
			onRowClick:function(){
			
				Employee.renderTabView($(this).attr('alt'))
			},
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#employee").flexOptions({params: dt});

				return true;
			},
			height: 200
		});
	};
}); 