jQuery(document).ready(function($){
		
	App.Login = function(){	
		
		var txtUsername = new TextBox('uname','uname');		
		var txtPassword = new TextBox('pword','pword');
		txtPassword.attr('type','password');
		
		txtPassword.keydown(function(e){
		
			if(e.keyCode == 13)
				$("#pword").closest("form").find("input[id=submit-login-form]").click();
		})
		
		$("#tree").hide();

		var frmLogin = new ui.widget.Form("login-form","/auth/login");
		frmLogin.onSubmit(function(){
			
			frmLogin.valid(true);
			$("body").mask("Wait...");
		});

		frmLogin.onError(function(){

			$("body").unmask();
			new ui.MessageDialog("Login", "Failed to login!");

			txtUsername.removeAttr('disabled');
			txtPassword.removeAttr('disabled');
			
			txtPassword.val("");
			txtUsername.val("");
			txtPassword.blur();
			txtUsername.blur();
		})

		frmLogin.onComplete(function(jsonResult){
			
			$("body").unmask();
			frmDialog.remove();

			txtUsername.removeAttr('disabled');
			txtPassword.removeAttr('disabled');
			
			if(jsonResult.msg == 'Succeded'){
			
				App.TreeMenu.renderView();
				$("#tree").show();
				$("BODY").unmask();
			}
			else{
			
				txtPassword.val("");
				txtUsername.val("");
				txtPassword.blur();
				txtUsername.blur();
			}
		});

		frmLogin.addRow()
		frmLogin.add("Username", txtUsername);
		frmLogin.addRow()
		frmLogin.add("Password", txtPassword);
		frmLogin.addDefaultButtons();

		var frmDialog = $(document.createElement("DIV"));
		frmDialog
			.append(frmLogin.getForm())
			.dialog({

				title: "Login",
				height: 125,
				width: "auto",
				modal: true,
				closeOnEscape: false,
				draggable:false,
				open: function(event, ui) {

					 $(".ui-dialog-titlebar-close", ui.dialog).hide();
				}
			});
	};

	App.Logout = function(){

		new ui.ConfirmDialog("Logout", "Are you sure?", {"Yes":function(){

			$('BODY').mask('loginout....');
			$.read('/auth/logout',function(json){
				
				if(json.msg == 'Succeded'){
				
					document.location.reload()
				}	
			});
		}})	
	};	
}); 
