jQuery(document).ready(function($){	
	
	Employee.PayrollDetails.renderView = function(employeeId,employeePayDetails){
	
		var frmEmployeePayrollDetails = new ui.widget.Form("payroll-form","/employee/payroll");
		//frmEmployeePayrollDetails.register(((!!employeePayDetails.id)?'edit':'new'),'payroll');
		frmEmployeePayrollDetails.addId('employee',employeeId);
		frmEmployeePayrollDetails.addId('id',employeePayDetails.id);
		
		frmEmployeePayrollDetails.onSubmit(function(){
			
			$("body").mask('saving...');
			frmEmployeePayrollDetails.valid(true);
		});
		
		frmEmployeePayrollDetails.onComplete(function(jsonResult){
			
			$("body").unmask();
			
			if(jsonResult.msg == "Succeded");
			else alert("Failure :: Update Unsuccessful!");	
		});
		
		txtSalary = new TextBox('salary','salary');
		txtSalary.get(0).CharType = EnumCharType.Numeral; 
		txtSalary.attr('maxlength',7);
		txtSalary.css({textAlign:'right'});
		txtSalary.keydown(ui.custom.Event.KeyEvent);
		txtSalary.val(employeePayDetails.salary);
		txtSalary.focus(function(){
			
			if(!!$(this).val())
				$(this).val(parseInt($(this).val()));
		})
		
		txtDummySalary = new TextBox('dummysalary','dummysalary');
		txtDummySalary.get(0).CharType = EnumCharType.Numeral;
		txtDummySalary.val(employeePayDetails.salary);
		txtDummySalary.attr("type","password");
		txtDummySalary.attr('maxlength',7);
		txtDummySalary.css({textAlign:'right'});
		txtDummySalary.focus(function(){
			
			if(!!$(this).val())
				$(this).val(parseInt($(this).val()));
		})
		
		btnMask = $("<input type='button' value='Mask'>");
		var showDummy = function(e){
		
			txtDummySalary.val(txtSalary.val());
			txtDummySalary.show();
			txtSalary.hide();
			$(this).val("Unmask");
		}
		
		var showSalary = function(e){
		
			txtSalary.val(txtDummySalary.val());
			txtDummySalary.hide();
			txtSalary.show();
			$(this).val("Mask");
		}
		
		if(!!txtSalary.val()){
			
			btnMask.val("Unmask");	
			btnMask.toggle(showSalary,showDummy);
			txtSalary.hide();
		}	
		else{
		
			btnMask.toggle(showDummy,showSalary);
			txtDummySalary.hide();
		}	
		
		
		// var EnumBool = ['Exempt','Deduct'];
		
		// var cboNHIF = new ComboBox("nhif","nhif");
		// cboNHIF.addOption("Deduct","Deduct");
		// cboNHIF.addOption("Exempt","Exempt");
		
		// cboNHIF.val(EnumBool[employeePayDetails.hasnhif]);
		
		// var cboNSSF = new ComboBox("nssf","nssf");
		// cboNSSF.addOption("Deduct","Deduct");
		// cboNSSF.addOption("Exempt","Exempt");
		
		var btnDeduction = $("<input type='button' value='Add'/>");
		btnDeduction.click(function(){
			
			var btnRemove = $("<input type='button' value='Remove'/>");
			btnRemove.click(function(){
			
				$(this.parentNode.parentNode).remove();
			});
			
			var newRow = $("<tr></tr>");
			var cellCaption = $("<td></td>");
			var cellElement = $("<td></td>");
			var tableDeduction = $("#benefit");
			
			cellCaption.append(btnRemove);
			cellElement.append(cboDeduction.clone());
			newRow.append(cellCaption);
			newRow.append(cellElement);

			tableDeduction.append(newRow);
		});
		
		var tblDeduction = new ui.Table('benefit');
		tblDeduction.newRow();
		tblDeduction.newCell(btnDeduction);
		
		$('BODY').mask("Loading Benefits...");
		var cboDeduction = new ComboBox("","benefits[]");
		$.read('/benefit/list',function(benefits){
		
			$(benefits).each(function(i,benefit){
				
				cboDeduction.addOption(benefit.id,benefit.name);
			});
			
			var tblDeduct = tblDeduction.getTable();
			$(employeePayDetails.benefits).each(function(i,e){

				var cboDeduct = cboDeduction.clone();
				cboDeduct.val(e.benefit);
				
				var btnRemove = $("<input type='button' value='Remove'/>");
				btnRemove.click(function(){
				
					$(this.parentNode.parentNode).remove();
				});
				
				tblDeduction.newRow();
				tblDeduction.newCell(btnRemove);
				tblDeduction.newCell(cboDeduct);
			});
			$('BODY').unmask();
		});
		
		spanSalary = $("<span></span>");
		spanSalary.append(txtSalary);
		spanSalary.append(txtDummySalary);
		spanSalary.append(btnMask);
		
		// var btnPayReportDetailed = $('<input type="button" value="Detailed Report">');
		// btnPayReportDetailed.click(function(){
		
			// window.open("../reports/payslip/?employeeId="+employeeId);
		// });
		
		// var tblReports = new ui.Table('reports');
		// tblReports.newRow();
		// tblReports.newCell(btnPayReportDetailed);
		
		frmEmployeePayrollDetails.addRow();
		frmEmployeePayrollDetails.add("Salary",spanSalary);
		// frmEmployeePayrollDetails.addRow();
		// frmEmployeePayrollDetails.add("NHIF",cboNHIF);
		frmEmployeePayrollDetails.addDefaultButtons(EnumFormButtonAlign.FirstCell);
		//frmEmployeePayrollDetails.addRow();
		//frmEmployeePayrollDetails.add("Reports",tblReports.getTable());
		frmEmployeePayrollDetails.addRow();
		frmEmployeePayrollDetails.add("Benefits",tblDeduction.getTable());
		
		return frmEmployeePayrollDetails;
	}
}); 
