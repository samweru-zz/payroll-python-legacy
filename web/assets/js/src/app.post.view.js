jQuery(document).ready(function($){
		
	Post.renderView = function(){
	
		$(".right").html("");
		
		var tblPost = new ui.Table('posts');
		var tablePost = tblPost.getTable();
		tablePost.css({display:'none'});
		tablePost.appendTo($(".right"));
		
		Post.renderFlexiGrid();
	};
	
	Post.renderFlexiGrid = function(){
		
		$("#posts").flexigrid({

			url: '/post/all',
			dataType: 'json',
			colModel : [
				{display: '#', name : '#', width : 180, hide:true, sortable : true, align: 'left'},
				{display: 'Name', name : 'name', width : 180, sortable : true, align: 'left'},
				{display: 'Department', name : 'department', width : 180, sortable : true, align: 'left'}],
			buttons : [
				{name: 'Add', bclass: '', onpress : function(){Post.renderFormView();}},
				{separator: true},
				{name: 'Delete', bclass: '', onpress : function(){
				
					if($('.trSelected').attr('alt')!=undefined)
						new ui.ConfirmDialog("Delete Post", "Are you sure?", {"Yes":function(){

								$("BODY").mask("wait...");
								$.destroy('/post/delete/'.concat($('.trSelected').attr('alt')),function(){
								
									setTimeout(function(){

										$(".pReload").click();
										$("BODY").unmask();

									},1000)
								})
								.error(function(){

									$("BODY").unmask();
									new ui.MessageDialog("Post", "Failed to delete post!");
								});

								$(this).dialog("close").remove();
							}
						})
						
				}},
			],
			searchitems : [
				{display: 'Name', name : 'name'},
				{display: 'Department', name : 'department', isdefault: true}],
			sortname: "name",
			sortorder: "asc",
			usepager: true,
			title: 'Posts',
			useRp: false,
			rp: 15,
			showTableToggleBtn: false,
			width: $('.right').width()-10,//700,
			onRowClick:function(){
			
				Post.renderFormView($(this).attr('alt'));
			},
			onError:function(){

				new ui.MessageDialog("Posts", "Failed to load posts!");
			},
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#posts").flexOptions({params: dt});

				return true;
			},
			height: 200
		});
	};
}); 