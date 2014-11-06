jQuery(document).ready(function($){	

	User.renderFormView = function(userId){
	
		// $(".right").html("");
		// $("body").mask('wait...');
		
		var frmDialog = $(document.createElement("DIV"));
		var txtUsername = new TextBox('uname','uname');
		var txtPassword = new TextBox('pword','pword');
		txtPassword.attr('type','password');
		
		var txtCPassword = new TextBox('cpword','cpword');
		txtCPassword.attr('type','password');
		
		var cboRole = new ComboBox('role','role');
		
		var frmUser = new ui.widget.Form("user-form","/user/".concat((!!userId)?'update':'add'),'user');
		
		if(!!userId)
			$.read('/user/view/'.concat(userId),function(user){
				
				frmUser.addId('id',user.id);
				txtUsername.val(user.uname);
				
				$(user.roles).each(function(i,role){
					
					cboRole.addOption(role.id,role.name);
					if(user.role == role.name)
						cboRole.val(role.id);

					$("body").unmask();
				});
			})
			.error(function(){

				new ui.MessageDialog("User", "Failed to retrieve information!");
			});
		else
			$.read("/user/roles", function(json){

				$.each(json.roles, function(i,role){

					cboRole.addOption(role.id,role.name);
				})	
			})
		
		frmUser.onSubmit(function(){
			
			
			var validationCallback = function(){
			
				if(txtUsername.val() ==  "" || txtUsername.val().length < 6)
					txtUsername.focus();
				else{
				
					txtPassword.val('');
					txtCPassword.val('');
					txtPassword.focus();
				}
			}
			
			frmUser.valid(User.validate(txtUsername.val(),txtPassword.val(),txtCPassword.val()));
			
			if(!frmUser.getForm().isValid)
				validationCallback();
			else	
				$("body").mask('saving...');	
		});

		frmUser.onError(function(){

			new ui.MessageDialog("User", "Failed to save data!");
		})
		
		frmUser.onComplete(function(jsonResult){
			
			$("body").unmask();
			frmDialog.remove();
			User.renderView();
		});
		
		frmUser.addRow();
		frmUser.add("Username",txtUsername);
		frmUser.addRow();
		frmUser.add("Password",txtPassword);
		frmUser.addRow();
		frmUser.add("Confirm Password",txtCPassword);
		frmUser.addRow();
		frmUser.add("Role",cboRole);
		frmUser.addDefaultButtons();
		// frmUser.getForm().appendTo($(".right"));

		frmDialog
			.append(frmUser.getForm())
			.dialog({

				title: "Edit Role",
				height: "auto",
				width: "auto",
				modal: true,
			});
	}
});	