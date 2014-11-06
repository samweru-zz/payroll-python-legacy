jQuery(document).ready(function($){

	Setup.Paye.renderFormView = function(payeId){

		var frmDialog = $(document.createElement("DIV"));
		var txtAnnualLowerBound = new TextBox('albound','albound');
		txtAnnualLowerBound.css({textAlign:"right"});
		var txtAnnualUpperBound = new TextBox('aubound','aubound');
		txtAnnualUpperBound.css({textAlign:"right"});
		var txtMonthlyLowerBound = new TextBox('mlbound','mlbound');
		txtMonthlyLowerBound.css({textAlign:"right"});
		var txtMonthlyUpperBound = new TextBox('mubound','mubound');
		txtMonthlyUpperBound.css({textAlign:"right"});
		var txtRate = new TextBox('rate','rate');
		txtRate.css({textAlign:"right"});

		var frmPaye = new ui.widget.Form("paye-form","/paye/".concat((!!payeId)?'update':'add'));

		if(!!payeId)
			$.read("/paye/view/".concat(payeId), function(paye){

				frmPaye.addId('id', paye.id);
				txtAnnualLowerBound.val(paye.albound);
				txtAnnualUpperBound.val(paye.aubound);
				txtMonthlyLowerBound.val(paye.mlbound);
				txtMonthlyUpperBound.val(paye.mubound);
				txtRate.val(paye.rate);
			})
			.error(function(){

				new ui.MessageDialog("Paye", "Failed to retrieve data!");
			})

		frmPaye.onSubmit(function(){

			frmPaye.valid(true);
			frmDialog.mask("wait...");
		});

		frmPaye.onError(function(){

			frmDialog.unmask();
			new ui.MessageDialog("Paye", "Failed to save data!");
		})

		frmPaye.onComplete(function(){

			setTimeout(function(){

				$("#paye").flexReload();
				frmDialog.unmask();
				frmDialog.remove();
				
			},1000)
		})

		frmPaye.addRow();
		frmPaye.add("Annual Lower Bound ", txtAnnualLowerBound);
		frmPaye.addRow();
		frmPaye.add("Annual Upper Bound ", txtAnnualUpperBound);
		frmPaye.addRow();
		frmPaye.add("Monthly Upper Bound ", txtMonthlyUpperBound);
		frmPaye.addRow();
		frmPaye.add("Monthly Lower Bound ", txtMonthlyLowerBound);
		frmPaye.addRow();
		frmPaye.add("Rate", txtRate);
		frmPaye.addDefaultButtons();

		frmDialog
			.append(frmPaye.getForm())
			.dialog({

				title: (!!payeId)?"Edit Paye Entry":"Add Paye Entry",
				height: "auto",
				width: "auto",
				modal: true,
			});
	}
});