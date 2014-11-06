jQuery(document).ready(function($){
		
	Dept.renderView = function(){
	
		$(".right").html("");
		
		var tblDept = new ui.Table('depts');
		var tableDept = tblDept.getTable();
		tableDept.css({display:'none'});
		tableDept.appendTo($(".right"));
		
		Dept.renderFlexiGrid();
	};
	
	Dept.renderFlexiGrid = function(){
		
		$("#depts").flexigrid({

			url: '/dept/all',
			dataType: 'json',
			colModel : [
				{display: '#', name : '#',width : 180, hide:true, sortable : true, align: 'left'},
				{display: 'Name', name : 'name', width : 180, sortable : true, align: 'left'},
				{display: 'Descr', name : 'descr', width : 180, sortable : true, align: 'left'}],
			buttons : [
				{name: 'Add', bclass: '', onpress : function(){Dept.renderFormView();}},
				{separator: true},
				{name: 'Delete', bclass: '', onpress : function(){
				
					if($('.trSelected').attr('alt')!=undefined)
						new ui.ConfirmDialog("Delete Department", "Are you sure?", {"Yes":function(){

								$("BODY").mask("wait...");
								$.destroy('/dept/delete/'.concat($('.trSelected').attr('alt')),function(){
								
									setTimeout(function(){

										$(".pReload").click();
										$("BODY").unmask();

									}, 1000)
									
								})
								.error(function(){

									$("BODY").unmask();
									new ui.MessageDialog("Department", "Failed to delete Department!");
								});

								$(this).dialog("close").remove();
							}
						})
						
				}}
			],
			searchitems : [
				{display: 'Name', name : 'name'},
				{display: 'Descr', name : 'descr', isdefault: true}],
			sortname: "name",
			sortorder: "asc",
			usepager: true,
			title: 'Departments',
			useRp: false,
			rp: 15,
			showTableToggleBtn: false,
			width: $('.right').width()-10,//700,
			onRowClick:function(){
			
				Dept.renderFormView($(this).attr('alt'));
			},
			onError:function(){

				ui.MessageDialog("Departments", "Failed to retrieve departments!");
			},
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#depts").flexOptions({params: dt});

				return true;
			},
			height: 200
		});
	};
}); 