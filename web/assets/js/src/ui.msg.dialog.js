jQuery(document).ready(function($){
	
	ui.MessageDialog = function(title, msg){

		$(document.createElement("DIV"))
			.html(msg)
			.dialog({
				"title": title,
				modal: true,
				buttons: {

					Ok: function() {

					  $(this).dialog( "close" );
					}
				}
		    });
	}

	ui.ConfirmDialog = function(title, msg, actions){

		$(document.createElement("DIV"))
			.html(msg)
			.dialog({
				"title":title,
		      	resizable: false,
		      	height:140,
		      	modal: true,
		      	buttons: actions
		    })
	}
})