jQuery(document).ready(function($){

	Benefits.Employee.renderFlexiGrid = function(){
	
		Employee.renderFlexiGrid({

			autoload:false,
			width: false,
			useRp:false,
			usepager: false,
			title: "Employees",
			singleSelect:true,
			onRowClick:function(){
			
				//
			},
			buttons:[

				{name:'Search', bclass:'', onpress:function(){

					//
				}},
			]
		})
	}
});		