jQuery(document).ready(function($){

	Employee.renderTabView = function(empId){

		var frmEmployee = Employee.renderFormView(empId);
		var tblBenefit = Employee.Benefits.renderView();
		var tblRelief = Employee.Relief.renderView();
		
		var employeeTabs = new ui.Tabs('tabsEmployee');
		employeeTabs.newTab('tabEmployeeDetails', "Employee Details", frmEmployee.getForm());
		employeeTabs.newTab('tabPayrollDetails',"Payroll Details");
		employeeTabs.newTab('tabBenefits',"Benefits", tblBenefit);
		employeeTabs.newTab('tabTaxRelief',"Tax Relief", tblRelief);

		$('.right')
			.empty()
			.append(employeeTabs.getTabs());

		$("#tabsEmployee").tabs({

			active: 0,
			activate: function(event, ui){

				switch(ui.newTab.index()){
					case 1:
						if(!$("#paydetails").get(0)){

							$("#tabPayrollDetails")
								.append(Employee.PayDetails.renderView())

							Employee.PayDetails.renderFlexiGrid(empId);
						}
					break;
					case 2:

						Employee.Benefits.renderFlexiGrid();
					break;
					case 3:
						Employee.Relief.renderFlexiGrid();
					break;
				}
			}
		});
		
		$( "#dob" ).datepicker({maxDate:"-18Y", dateFormat:"yy-mm-dd"});
		$( "#start" ).datepicker({minDate:"0D", dateFormat:"yy-mm-dd"});
		$( "#end" ).datepicker({minDate:"+1D", dateFormat:"yy-mm-dd"});
	}	
});

