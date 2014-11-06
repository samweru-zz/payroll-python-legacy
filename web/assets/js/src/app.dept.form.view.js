jQuery(document).ready(function($){	

	Dept.renderFormView = function(deptId){
	
		if(!!deptId)
			$("body").mask("Waiting...");
	
		var frmDialog = $(document.createElement("DIV"));
		var txtName = new TextBox('name','name');
		txtName.focus(function(){
		
			$(this).css({backgroundColor:'#fff'});
		});
		
		var txtDescr = new TextArea('descr','descr');
		txtDescr.setRows(10);
		txtDescr.setCols(30);
		
		var frmDept = new ui.widget.Form("dept-form","/dept/".concat((!!deptId)?'update':'add'));
		
		if(!!deptId)
			$.read('/dept/view/'.concat(deptId),function(dept){
			
				frmDept.addId('id',dept.id);
				txtName.val(dept.name);
				txtDescr.html(dept.descr);
				
				$("body").unmask();
			})
			.error(function(){

				$("body").unmask();
				new ui.MessageDialog("Department", "Failed to retrieve information!");
			});

		frmDept.onSubmit(function(){
			
			if(!!$('#name').val()){
				
				$("body").mask('Saving Department...');
				frmDept.valid(true);
			}	
			else	
				$('#name').css({backgroundColor:'pink'});	
		});
		
		frmDept.onComplete(function(jsonResult){
			
			$("body").unmask();
			Dept.renderView();
			frmDialog.remove();
		});
		
		frmDept.addRow();
		frmDept.add("Dept.",txtName);
		frmDept.addRow();
		frmDept.add("Description",txtDescr);
		frmDept.addDefaultButtons();
		
		frmDialog
			.append(frmDept.getForm())
			.dialog({

				title: (!!deptId)?"Edit Department":"Add Department",
				height: "auto",
				width: "auto",
				modal: true,
			});
	}
});	