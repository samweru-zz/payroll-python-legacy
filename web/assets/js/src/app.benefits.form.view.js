jQuery(document).ready(function($){	

	Benefits.renderFormView = function(dedId){
	
		var frmDialog = $(document.createElement("DIV"));
		var frmBenefits = new ui.widget.Form("benefits-form","/benefit/".concat((!!dedId)?'update':'add'));

		var lbl = $("<label></label>");
		var txtName = new TextBox("name",'name');	
		txtName.attr("placeholder", "Name");
		var txtDefaultAmt = new TextBox("amount",'amount');
		txtDefaultAmt.attr("placeholder", "Amount");
		var txtDescr = new TextArea("descr",'descr')
		txtDescr.attr("placeholder", "Description");		
		txtDescr.setRows(5);
		txtDescr.setCols(60);
		var chkPerc = new CheckBox('perc','perc',false,1);
		var lblChkPerc = lbl.clone()
							.attr("for", "perc")
							.append(chkPerc)
							.append("<b>&nbsp;Percentage?</b>")
		
		var chkDeduction = new CheckBox('deduct','deduct',false,1);
		var lblChkDeduction = lbl.clone()
							.attr("for", "deduct")
							.append(chkDeduction)
							.append("<b>&nbsp;Deduction?</b>")
		
		var chkTaxable = new CheckBox('taxable','taxable',false,1);
		var lblChkTaxable = lbl.clone()
							.attr("for", "taxable")
							.append(chkTaxable)
							.append("<b>&nbsp;Taxable?</b>")
		
		var chkActive = new CheckBox('active','active',false,1);
		var lblChkActive = lbl.clone()
							.attr("for", "active")
							.append(chkActive)
							.append("<b>&nbsp;Active?</b>")

		if(!!dedId)
			$.read("/benefit/view/".concat(dedId), function(benefit){

				frmBenefits.addId('id',benefit.id);
				txtName.val(benefit.name);
				txtDefaultAmt.val(benefit.amount);
				txtDescr.val(benefit.descr);
				
				chkPerc.attr("checked", benefit.perc=="True");
				chkDeduction.attr("checked", benefit.deduct=="True");
				chkTaxable.attr("checked", benefit.taxable=="True");
				chkActive.attr("checked", benefit.active=="True");
			})
			.error(function(){

				$("BODY").unmask();
				new ui.MessageDialog("Benefit", "Failed to retrieve information!");
			})
		
		frmBenefits.onSubmit(function(){
			
			$("body").mask('saving...');
			frmBenefits.valid(true);
		});
		
		frmBenefits.onComplete(function(jsonResult){
			
			setTimeout(function(){

				$("body").unmask();	
				$("#benefit").flexReload();	
			},1000)
			
			frmDialog.remove();
		});
		
		frmBenefits.cellAlignment("left");
		frmBenefits.addRow();
		frmBenefits.add(txtName);
		frmBenefits.addRow();
		frmBenefits.add(txtDefaultAmt);
		frmBenefits.addRow();
		frmBenefits.add(txtDescr);
		frmBenefits.addRow();
		frmBenefits.add(lblChkPerc);
		frmBenefits.addRow();
		frmBenefits.add(lblChkDeduction);
		frmBenefits.addRow();
		frmBenefits.add(lblChkTaxable);
		frmBenefits.addRow();
		frmBenefits.add(lblChkActive);
		frmBenefits.addRow();
		frmBenefits.addDefaultButtons(EnumFormButtonAlign.SecondCell);
		frmBenefits.addRow();

		frmDialog
			.append(frmBenefits.getForm())
			.dialog({

				title: (!!dedId)?"Edit Department":"Add Department",
				height: "auto",
				width: "auto",
				modal: true,
			});
	}
});