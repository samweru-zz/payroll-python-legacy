jQuery(document).ready(function($){	

	Role.renderFormView = function(roleId){
		
		var frmDialog = $(document.createElement("DIV"));
		var txtName = new TextBox('name','name');
		txtName.focus(function(){
		
			$(this).css({backgroundColor:'#fff'});
		});
		
		var txtDescr = new TextArea('descr','descr');
		txtDescr.setRows(10);
		txtDescr.setCols(30);
		
		var frmRole = new ui.widget.Form("role-form","/role/".concat((!!roleId)?'update':'add'));
		
		if(!!roleId)
			$.read('/role/view/'.concat((!!roleId)?roleId:''),function(role){
					
				frmRole.addId('id',role.id);
				txtName.val(role.name);
				txtDescr.html(role.descr);				
			})
			.error(function(resp){

				$("body").unmask();
				new ui.MessageDialog("Error", "Error occured while tyring to retrieve data!")
			});

		frmRole.onSubmit(function(){
			
			if(!!$('#name').val()){
				
				$("body").mask('Saving Role...');
				frmRole.valid(true);
			}	
			else	
				$('#name').css({backgroundColor:'pink'});	
		});

		frmRole.onError(function(){

			$("body").unmask();
			new ui.MessageDialog("Error", "Error occured while tyring to save!");
		});
		
		frmRole.onComplete(function(jsonResult){
			
			$("body").unmask();
			frmDialog.remove();
			Role.renderView();
		});
		
		frmRole.addRow();
		frmRole.add("Role",txtName);
		frmRole.addRow();
		frmRole.add("Description",txtDescr);
		frmRole.addDefaultButtons();
		
		frmDialog
			.append(frmRole.getForm())
			.dialog({

				title: "Edit Role",
				height: "auto",
				width: "auto",
				modal: true,
			});
	}
});	