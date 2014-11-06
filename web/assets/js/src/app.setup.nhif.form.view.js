jQuery(document).ready(function($){
	
	Setup.Nhif.renderFormView = function(nhifId){

		var frmDialog = $(document.createElement("DIV"));
		var txtLowerBound = new TextBox('lbound','lbound');
		txtLowerBound.css({textAlign: "right"});
		var txtUpperBound = new TextBox('ubound','ubound');
		txtUpperBound.css({textAlign: "right"});
		var txtAmount = new TextBox('amount','amount');
		txtAmount.css({textAlign: "right"});

		var frmNhif = new ui.widget.Form("nhif-form","/nhif/".concat((!!nhifId)?'update':'add'));

		if(!!nhifId)
			$.read("/nhif/view/".concat(nhifId), function(nhif){

				frmNhif.addId('id', nhif.id);
				txtLowerBound.val(nhif.lbound);
				txtUpperBound.val(nhif.ubound);
				txtAmount.val(nhif.amount);
			})
			.error(function(){

				new ui.MessageDialog("NHIF", "Failed to retrieve information!");
			})

		frmNhif.onSubmit(function(){

			frmDialog.mask("wait...");
			frmNhif.valid(true);
		});

		frmNhif.onError(function(){

			frmDialog.unmask();
			new ui.MessageDialog("NHIF", "Failed to save data!");
		});

		frmNhif.onComplete(function(){

			setTimeout(function(){

				frmDialog.unmask();
				frmDialog.remove();
				$("#nhif").flexReload();

			}, 1000);
		});

		frmNhif.addRow();
		frmNhif.add("Lower Bound", txtLowerBound);
		frmNhif.addRow();
		frmNhif.add("Upper Bound", txtUpperBound);
		frmNhif.addRow();
		frmNhif.add("Amount", txtAmount);
		frmNhif.addDefaultButtons();

		frmDialog
			.append(frmNhif.getForm())
			.dialog({

				title: (!!nhifId)?"Edit NHIF Entry":"Add NHIF Entry",
				height: "auto",
				width: "auto",
				modal: true,
			});
	}
});