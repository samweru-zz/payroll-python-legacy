jQuery(document).ready(function($){
		
	User.renderView = function(){
	
		$(".right").html("");
		
		var tblUser = new ui.Table('users');
		var tableUser = tblUser.getTable();
		tableUser.css({display:'none'});
		tableUser.appendTo($(".right"));
		
		User.renderFlexiGrid();
	};
	
	User.renderFlexiGrid = function(){
		
		$("#users").flexigrid({

			url: '/user/all',
			dataType: 'json',
			colModel : [
				{display: '#', name : '#', width : 180, hide:true, sortable : true, align: 'left'},
				{display: 'Username', name : 'uname', width : 180, sortable : true, align: 'left'},
				{display: 'Role', name : 'role', width : 180, sortable : true, align: 'left'}],
			buttons : [
				{name: 'Add', bclass: '', onpress : function(){User.renderFormView();}},
				{name: 'Delete', bclass: '', onpress : function(){
				
					if($('.trSelected').attr('alt')!=undefined)
						new ui.ConfirmDialog("Delete User", "Are you sure?", {"Yes":function(){

								$("BODY").mask("Wait...");
								$.destroy('/user/delete/'.concat($('.trSelected').attr('alt')),function(){
								
									setTimeout(function(){

										$('.pReload').click();
										$("BODY").unmask();

									}, 1000);
								})
								.error(function(){

									$("BODY").unmask();
									new ui.MessageDialog("User", "Failed to delete user!");
								})

								$(this).dialog('close').remove();
							}
						})
				}},
				{separator: true}
			],
			searchitems : [
				{display: 'Username', name : 'uname'},
				{display: 'Role', name : 'role', isdefault: true}],
			sortname: "name",
			sortorder: "asc",
			usepager: true,
			title: 'Users',
			useRp: false,
			rp: 15,
			showTableToggleBtn: false,
			width: $('.right').width()-10,//700,
			onRowClick:function(){
			
				User.renderFormView($(this).attr('alt'));
			},
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#users").flexOptions({params: dt});

				return true;
			},
			onError:function(){

				new ui.MessageDialog("Users", "Error occured while trying to retrieve data!");
			},
			height: 200
		});
	};
}); 