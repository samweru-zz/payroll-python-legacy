jQuery(document).ready(function($){

	Benefits.renderTabView = function(){
	
		var tblBenefits = new ui.Table('benefit');
		var tableBenefits = tblBenefits.getTable();
		tableBenefits.css({display:'none'});
		
		var tblEmployee = new ui.Table('employee');
		var tableEmployee = tblEmployee.getTable();
		tableEmployee.css({display:'none'});
	
		var benefitsTabs = new ui.Tabs('tabsBenefits');
		benefitsTabs.newTab('tabBenefitsDetails',"Benefits Details",tableBenefits);
		benefitsTabs.newTab('tabEmployeeDetails',"Employee Details",tableEmployee);

		$(".right")
			.empty()
			.append(benefitsTabs.getTabs());

		Benefits.renderFlexiGrid();
		Benefits.Employee.renderFlexiGrid();

		$("#tabsBenefits").tabs()
		$("a[href=#tabBenefitsDetails]").click();

	}
});