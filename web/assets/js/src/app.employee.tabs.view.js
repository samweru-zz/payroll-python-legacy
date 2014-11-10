jQuery(document).ready(function($){

	Employee.renderTabView = function(empId){

		var frmEmployee = Employee.renderFormView(empId);

		var employeeTabs = new ui.Tabs('tabsEmployee');
		employeeTabs.newTab('tabEmployeeDetails', "Employee Details", frmEmployee.getForm());
		employeeTabs.newTab('tabPayrollDetails',"Payroll Details");
		employeeTabs.newTab('tabBenefits',"Benefits");
		employeeTabs.newTab('tabTaxRelief',"Tax Relief");

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

						if(!$("#cbenefits").get(0)){

							$("body").mask("loading benefits...");

							var cdoBenefits = new ComboBox('cbenefits','cbenefits');
							cdoBenefits.addOption("","--Select Benefit--")

							$.read("/benefit/list", function(response){

								$.each(response.benefits, function(i,benefit){
						
									cdoBenefits.addOption(benefit.id,benefit.name);
								});

								$("body").unmask();
							})
							.error(function(){

								$("body").unmask();
								cdoBenefits.attr("disabled", true);
								new ui.MessageDialog("Employee Benefits","Error occured while loading benefits!");
							})

							var tblEmployeeBenefits = new window.ui.Table('employee-benefits');
							tblEmployeeBenefits.newRow()
							tblEmployeeBenefits.newCell(cdoBenefits)
							tblEmployeeBenefits.newRow()
							tblEmployeeBenefits.newCell(Employee.Benefits.renderView())
							tblEmployeeBenefits
								.getTable()
									.css({width:"100%"})
									.appendTo($("#tabBenefits"))
						}
								
						Employee.Benefits.renderFlexiGrid();

					break;
					case 3:

						if(!$("#crelief").get(0)){

							$("body").mask("loading tax relief entries...");

							var cdoRelief = new ComboBox('crelief','crelief');
							cdoRelief.addOption("","--Select Tax Relief Type--")

							$.read("/relief/list", function(response){

								$.each(response.rates, function(i,relief){
						
									cdoRelief.addOption(relief.id,relief.name);
								});

								$("body").unmask();
							})
							.error(function(){

								$("body").unmask();
								cdoRelief.attr("disabled", true);
								new window.ui.MessageDialog("Employee Relief","Error occured while loading relief entries!");
							})

							var tblEmployeeRelief = new window.ui.Table('employee-relief');
							tblEmployeeRelief.newRow()
							tblEmployeeRelief.newCell(cdoRelief)
							tblEmployeeRelief.newRow()
							tblEmployeeRelief.newCell(Employee.Relief.renderView())
							tblEmployeeRelief
								.getTable()
									.css({width:"100%"})
									.appendTo($("#tabTaxRelief"))
						}

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

