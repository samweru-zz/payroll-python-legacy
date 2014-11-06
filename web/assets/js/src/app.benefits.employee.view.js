jQuery(document).ready(function($){

	Benefits.Employee.renderFlexiGrid = function(){
	
		$("#employee").flexigrid({

			url: '/benefit/employee/'.concat($('#id').val()),
			autoload: false,
			dataType: 'json',
			colModel : [
				{display: '#', name : '#', sortable : true, align: 'left'},
				{display: 'EmployeeNo.', name : 'no', width : 180, sortable : true, align: 'left'},
				{display: 'Surname', name : 'surname', width : 180, sortable : true, align: 'left'},
				{display: 'Othernames', name : 'othernames', width : 180, sortable : true, align: 'left'},
				{display: 'Post', name : 'post', width : 180, sortable : true, align: 'left'},
				{display: 'Active', name : 'post', width : 180, sortable : true, align: 'left'}],
			buttons : [
				{name: 'Search', bclass: '', onpress : function(){
				
						if(!!$('#id').val()){
						
							var tblEmployee = new ui.Table('employee');
							var tableEmployee = tblEmployee.getTable();
							tableEmployee.css({display:'none'});
			
							$('#tabEmployeeDetails').children().remove();
							$('#tabEmployeeDetails').append(tableEmployee);
							Benefits.Employee.renderFlexiGrid();
						}
						else alert("Search :: Please Select Benefit.");
					}
				}
			],
			sortname: "name",
			sortorder: "asc",
			usepager: false,
			title: 'Employees',
			maskAjaxRequest:true,
			maskAjaxRequestMsg:'Searching Employees...',
			useRp: false,
			rp: 15,
			showTableToggleBtn: false,
			onRowClick:function(){
			
				Employee.renderFormsView($(this).attr('alt'));
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