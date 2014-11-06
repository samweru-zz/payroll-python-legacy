jQuery(document).ready(function($){	


	User.validate = function(username,password, confirmPassword){
	
		if(!username.length){
		
			new ui.MessageDialog("User", 'Missing Username!');
			
			return false;
		}	
		// else if(username.length <= 5){
		
		// 	new ui.MessageDialog("User", "Username should be greater or equal to 6 characters!");
			
		// 	return false;
		// }
		else if(!password.length || !confirmPassword.length){ //Check Emptiness
		
			new ui.MessageDialog("User", "Enter Password(s)!");

			return false;
		}	
		else if(password != confirmPassword){
		
			new ui.MessageDialog("User", "Passwords donnot match!");

			return false;
		}
		else if(password.length < 8 || confirmPassword.length < 8){
		
			new ui.MessageDialog("User", "Password should be greater or equal to 8 characters!")

			return false;
		}
		else return true; 	
	}
	
});