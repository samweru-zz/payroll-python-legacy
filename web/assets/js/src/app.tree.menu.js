jQuery(document).ready(function($){

	App.TreeMenu.renderView = function(){

		$("#sidetree").show()
		$("#tree").treeview({
			collapsed: false,
			animated: "medium",
			control:"#sidetreecontrol",
			persist: "location"
		});
		
		$("#tree").show();
	}		
});	