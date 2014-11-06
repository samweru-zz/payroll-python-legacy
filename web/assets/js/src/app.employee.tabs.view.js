jQuery(document).ready(function($){

	Employee.renderTabView = function(empId){
	// Employee.renderTabView = function(empId,payDetails){
	
		var frmEmployee = Employee.renderFormView(empId);
		// var frmEmployeePayrollDetails = Employee.PayrollDetails.renderView(empId,payDetails);
		
		var employeeTabs = new ui.Tabs('tabsEmployee');
		employeeTabs.newTab('tabEmployeeDetails', "Employee Details", frmEmployee.getForm());
		// employeeTabs.newTab('tabPayrollDetails',"Payroll Details",frmEmployeePayrollDetails.getForm());
		$('.right')
			.empty()
			.append(employeeTabs.getTabs());

		// $($('table')[1]).find('tr:nth-child(3) td:nth-child(2)').attr('align','right');	
		$("#tabsEmployee").tabs();
		
		$( "#dob" ).datepicker({maxDate:"-18Y", dateFormat:"yy-mm-dd"});
		$( "#start" ).datepicker({minDate:"0D", dateFormat:"yy-mm-dd"});
		$( "#end" ).datepicker({minDate:"+1D", dateFormat:"yy-mm-dd"});
	}
	
	// Employee.renderFormsView = function(empId){
	
	// 	$('BODY').mask("Loading Employee Details...");
	// 	if(!!empId)
	// 		$.read('/employee/benefits/'.concat(empId),function(payDetails){
			
	// 			Employee.getEmployeeWidget(empId,payDetails);
	// 		});
	// 	else	Employee.getEmployeeWidget("",{id:'',salary:'',hasnhif:'',benefits:{}});
	// }	
});

