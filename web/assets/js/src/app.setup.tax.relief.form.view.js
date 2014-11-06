jQuery(document).ready(function($){
	
	Setup.TaxRelief.renderFormView = function(reliefId){

		var frmDialog = $(document.createElement("DIV"));
		var txtName = new TextBox('name','name');
		txtName.attr("size", 30);
		var txtMonthly = new TextBox('monthly','monthly');
		var txtAnnual = new TextBox('annual','annual');
		var chkActive = new CheckBox('active','active', false, 1);

		var frmRelief = new ui.widget.Form("relief-form","/relief/".concat((!!reliefId)?'update':'add'));
		if(!!reliefId)
			$.read("/relief/view/".concat(reliefId), function(relief){

				frmRelief.addId("id", relief.id);
				txtName.val(relief.name);
				txtMonthly.val(relief.monthly);
				txtAnnual.val(relief.annual);
				chkActive.attr("checked", relief.active == "True")
			})
			.error(function(){

				new ui.MessageDialog("Tax Relief", "Failed to retrieve data!");
			})

		frmRelief.onSubmit(function(){

			$("BODY").mask("wait...")
			frmRelief.valid(true);
		});

		frmRelief.onError(function(){

			$("BODY").unmask();
			new ui.MessageDialog("Tax Relief", "Failed to save data!");
		});

		frmRelief.onComplete(function(){

			setTimeout(function(){

				$("#taxrelief").flexReload();
				$("BODY").unmask();
				frmDialog.remove();
				
			},1000)
		});

		frmRelief.addRow()
		frmRelief.add("Name", txtName);
		frmRelief.addRow()
		frmRelief.add("Monthly", txtMonthly);
		frmRelief.addRow()
		frmRelief.add("Annually", txtAnnual);
		frmRelief.addRow()
		frmRelief.add("Active", chkActive);
		frmRelief.addDefaultButtons();

		frmDialog
			.append(frmRelief.getForm())
			.dialog({

				title: (!!reliefId)?"Edit Tax Relief Entry":"Add Tax Relief Entry",
				height: "auto",
				width: "auto",
				modal: true,
			});
	}
});