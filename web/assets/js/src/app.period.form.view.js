jQuery(document).ready(function($){

	Period.renderFormView = function(periodId){
	
		var frmDialog = $(document.createElement("DIV"))
		var frmPeriod = new ui.widget.Form("period-form","/period/".concat((!!periodId)?'update':'add'));
		frmPeriod.register(((!!periodId)?'edit':'new'),'period');
		frmPeriod.addId('id',periodId);

		var txtStart = new TextBox('start','start');
		var txtEnd = new TextBox('end','end');

		var cboStatus = new ComboBox('status','status');
		cboStatus.addOption('Close-Period','Close Period');
		cboStatus.addOption('New-Period','New Period');
		
		var chkActive = new CheckBox('active','active', false, 1);
		chkActive.css({margin:'1px'});
		
		var spanActive = $("<span><span>");
		spanActive.append(chkActive);
		spanActive.append($("<b>  Active?</b>"));

		if(!!periodId)
			$.read("/period/view/".concat(periodId), function(period){

				txtStart.val(period.start);
				txtEnd.val(period.end);
				cboStatus.val(period.status);
				chkActive.attr("checked", period.active == "True");

			})
			.error(function(){

				new ui.MessageDialog("Fisical Period", "Failed to retrieve data!");
			})
		
		frmPeriod.onSubmit(function(){
			
			$("body").mask('Saving Fisical Period...');
			frmPeriod.valid(true);
		});
		
		frmPeriod.onError(function(){
			
			$("body").unmask();
			new ui.MessageDialog("Fisical Period", "Failed to save data!");
		});

		frmPeriod.onComplete(function(jsonResult){
			
			frmDialog.remove()
			setTimeout(function(){

				$("body").unmask();
				$("#period").flexReload();

			},1000)
		});
		
		frmPeriod.addRow();
		frmPeriod.add("Start Date", txtStart);
		frmPeriod.addRow();
		frmPeriod.add("End Date", txtEnd);
		frmPeriod.addRow();
		frmPeriod.add("Status", cboStatus);
		frmPeriod.addRow();
		frmPeriod.add("", spanActive);
		frmPeriod.addRow();
		frmPeriod.addDefaultButtons();

		frmDialog
			.append(frmPeriod.getForm())
			.dialog({

				title: (!!periodId)?"Edid Period":"Add Period",
				height: "auto",
				width: "auto",
				modal: true,
				open:function(event, ui){

					$( "#start" ).datepicker({dateFormat:"yy-mm-dd"});
					$( "#end" ).datepicker({maxDate:"+1Y", dateFormat:"yy-mm-dd"});
				}
			});
	}
});