jQuery(document).ready(function($){	

	Post.renderFormView = function(postId){
		
		var frmDialog = $(document.createElement("DIV"));
		var txtName = new TextBox('name','name');
		txtName.focus(function(){
		
			$(this).css({backgroundColor:'#fff'});
		});
		
		var txtDescr = new TextArea('descr','descr');
		txtDescr.setRows(5);
		txtDescr.setCols(30);
		var cdoDept = new ComboBox('dept','dept');
		
		var frmPost = new ui.widget.Form("dept-form","/post/".concat((!!postId)?'update':'add'));
		
		if(!!postId)		
			$.read('/post/view/'.concat(postId),function(post){

				frmPost.addId('id',post.id);
				txtName.val(post.name);
				txtDescr.html(post.descr);
				
				$(post.depts).each(function(i,dept){
					
					cdoDept.addOption(dept.id,dept.name);
					if(post.department == dept.name)	
						cdoDept.val(dept.id);
					
					$("body").unmask();
				});
			})
			.error(function(){

				new ui.MessageDialog("Post", "Failed to retrieve data!");
			});
		else
			$.read("/post/depts", function(json){

				$.each(json.depts, function(i,dept){

					cdoDept.addOption(dept.id,dept.name);
				})
			})
			.error(function(){

				new ui.MessageDialog("Post", "Failed to retrieve data!");
			})

		frmPost.onSubmit(function(){
			
			if(!!$('#name').val()){
				
				$("body").mask('Saving Post...');
				frmPost.valid(true);
			}	
			else	
				$('#name').css({backgroundColor:'pink'});
		});

		frmPost.onError(function(){

			$("body").unmask();
			ui.MessageDialog("Post", "Failed to save data!");
		})
		
		frmPost.onComplete(function(jsonResult){
			
			$("body").unmask();
			Post.renderView();
			frmDialog.remove();
		});
		
		frmPost.addRow();
		frmPost.add("Post",txtName);
		frmPost.addRow();
		frmPost.add("Description",txtDescr);
		frmPost.addRow();
		frmPost.add("Department",cdoDept);
		frmPost.addDefaultButtons();

		frmDialog
			.append(frmPost.getForm())
			.dialog({

				title: (!!postId)?"Edid Role":"Add Role",
				height: "auto",
				width: "auto",
				modal: true,
			});
	}
});	