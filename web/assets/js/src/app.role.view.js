jQuery(document).ready(function($){
		
	Role.renderView = function(){
	
		$(".right").html("");
		
		var tblRole = new ui.Table('roles');
		var tableRole = tblRole.getTable();
		tableRole.css({display:'none'});
		tableRole.appendTo($(".right"));
		
		Role.renderFlexiGrid();
	};
	
	Role.renderFlexiGrid = function(){
		
		$("#roles").flexigrid({

			url: '/role/all',
			dataType: 'json',
			colModel : [
				{display: '#', name : '#', width : 180, hide:true, sortable : true, align: 'left'},
				{display: 'Name', name : 'name', width : 180, sortable : true, align: 'left'},
				{display: 'Descr', name : 'descr', width : 180, sortable : true, align: 'left'}],
			buttons : [
				{name: 'Add', bclass: '', onpress : function(){Role.renderFormView();}},
				{name: 'Delete', bclass: '', onpress : function(){
				
					if($('.trSelected').attr('alt')!= undefined)
						new ui.ConfirmDialog("Delete Role", "Are you sure?",{"Yes":function(){

								$("BODY").mask("Wait...");
								$.destroy('/role/delete/'.concat($('.trSelected').attr('alt')),function(){
								
									setTimeout(function(){

										$(".pReload").click();
										$("BODY").unmask();

									},1000);
								})
								.error(function(){

									$("BODY").unmask();
									new ui.MessageDialog("Role", "Failed to delete role!");
								});

								$(this).dialog('close').remove();
							}
						});				
				}},
				{separator: true}
			],
			searchitems : [
				{display: 'Name', name : 'name'},
				{display: 'Descr', name : 'descr', isdefault: true}],
			sortname: "name",
			sortorder: "asc",
			usepager: true,
			title: 'Roles',
			useRp: false,
			rp: 15,
			showTableToggleBtn: false,
			width: $('.right').width()-10,//700,
			onRowClick:function(){
			
				Role.renderFormView($(this).attr('alt'));
			},
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#roles").flexOptions({params: dt});

				return true;
			},
			onError:function(){

				new ui.MessageDialog("Roles", "Error occured while trying to retrieve data!");
			},
			height: 200
		});
	};
}); 