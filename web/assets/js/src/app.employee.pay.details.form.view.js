jQuery(document).ready(function(){

	Employee.PayDetails.renderFormView = function(payDetailsId){

		var frmDialog = $(document.createElement("DIV"));
		var txtGrossSalary = new TextBox('gross_salary','gross_salary');
		var chkNhif = new CheckBox("enable_nhif", "enable_nhif", true, 1);
		var chkNssf = new CheckBox("enable_nssf", "enable_nssf", true, 1);
		var chkActive = new CheckBox("active", "active", true, 1);
		
		var frmPayDetails = new ui.widget.Form("dept-form","/payroll/employee/pay/details/".concat((!!payDetailsId)?'update':'add'));
		
		if(!!payDetailsId)		
			$.read('/payroll/employee/pay/details/'.concat(payDetailsId),function(payDetails){

				frmPayDetails.addId('id',payDetails.id);
				txtGrossSalary.val(payDetails.gross_salary);
				chkNhif.val(payDetails.enable_nhif == "True");
				chkNssf.val(payDetails.enable_nssf == "True");
				chkActive.val(payDetails.active == "True");
			})
			.error(function(){

				new ui.MessageDialog("Pay Details", "Failed to retrieve data!");
			});

		frmPayDetails.onSubmit(function(){
			
			$("body").mask('Saving Pay Employee Details...');
			frmPayDetails.valid(true);
		});

		frmPayDetails.onError(function(){

			$("body").unmask();
			ui.MessageDialog("Pay Details", "Failed to save data!");
		})
		
		frmPayDetails.onComplete(function(jsonResult){
			
			("#paydetails").flexReload();
			frmDialog.remove();
			$("body").unmask();
		});
		
		frmPayDetails.addRow();
		frmPayDetails.add("Gross Salary",txtGrossSalary);
		frmPayDetails.addRow();
		frmPayDetails.add("",$("<label for='enable_nhif'>&nbsp;NHIF</label>").prepend(chkNhif));
		frmPayDetails.addRow();
		frmPayDetails.add("",$("<label for='enable_nssf'>&nbsp;NSSF</label>").prepend(chkNssf));
		frmPayDetails.addRow();
		frmPayDetails.add("",$("<label for='active'>&nbsp;Active</label>").prepend(chkActive));
		frmPayDetails.addDefaultButtons();

		frmDialog
			.append(frmPayDetails.getForm())
			.dialog({

				title: (!!payDetailsId)?"Edid Pay Details":"Add Pay Details",
				height: "auto",
				width: "auto",
				modal: true,
			});
	}
})