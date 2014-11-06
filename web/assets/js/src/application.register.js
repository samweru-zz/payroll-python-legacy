var App = {};

jQuery(document).ready(function($){
	
	App.Reg = function(strReg){

		var arrReg = strReg.split(".");

		eval("if(!window."+arrReg[0]+")window."+arrReg[0]+" = {}");

		$(arrReg).each(function(i,e){
		
			var variable = strReg.split('.',i).join('.')+"."+arrReg[i];
			if(i>0)
				eval("if(!"+variable+")"+variable+" = {};");
		});
	}
});	

jQuery(document).ready(function($){

	App.Reg("App.TreeMenu");
	
	// App.Reg("Employee.BasicDetails");	
	App.Reg("Employee.PayDetails");	
	App.Reg("Employee.Benefits");	
	App.Reg("Employee.Relief");
	App.Reg("Employee");
	App.Reg("Role");
	App.Reg("User");
	App.Reg("Dept");
	App.Reg("Post");
	App.Reg("Period");
	App.Reg("EnumCharType");
	App.Reg("EnumFormButtonAlign");
	App.Reg("Benefits");
	App.Reg("Benefits.Employee");
	App.Reg("Reports.Employee");
	
	App.Reg("ui.custom.basic");
	App.Reg("ui.Table");
	App.Reg("ui.Form");
	App.Reg("ui.widget.two.dimension");
	App.Reg("ui.custom.Event");
	App.Reg("ui.TreeView");
	App.Reg("ui.Tabs");
	App.Reg("ui.MessageDialog")
	App.Reg("ui.ConfirmDialog")
	
	App.Reg("Setup");
	App.Reg("Setup.Nhif");
	App.Reg("Setup.Paye");
	App.Reg("Setup.TaxRelief");
	
	EnumFormButtonAlign.FirstCell = 0;
	EnumFormButtonAlign.SecondCell = 1;
	
	EnumCharType.Alpha = 'Text';
	EnumCharType.Numeral = 'Numbers';
	EnumCharType.AlphaNumeric = 'Both';
});