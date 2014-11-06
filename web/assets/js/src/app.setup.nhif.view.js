jQuery(document).ready(function($){

	Setup.Nhif.renderFlexiGrid = function(){
		
		$("#nhif").flexigrid({

			url: '/nhif/all',
			dataType: 'json',
			title: 'NHIF Rates',
			height: 200,
			colModel : [
				{display: '#', name : '#', width : 180, hide:true, sortable : true, align: 'right'},
				{display: 'Lower Bound', name : 'lbound', width : 180, sortable : true, align: 'left'},
				{display: 'Upper Bound', name : 'ubound', width : 180, sortable : true, align: 'right'},
				{display: 'Amount', name : 'amount', width : 180, sortable : true, align: 'right'}],
			buttons : [
				{name: 'Add', bclass: '', onpress : function(){

					Setup.Nhif.renderFormView();
				}},
				{name: 'Delete', bclass: '', onpress : function(){

					if($('.trSelected').attr('alt'))
						new ui.ConfirmDialog("Delete NHIF Rate", "Are you sure?", {"Yes":function(){

								$("BODY").mask("wait...");
								$.destroy("/nhif/delete/".concat($('.trSelected').attr('alt')), function(){

									setTimeout(function(){

										$("#nhif").flexReload();
										$("BODY").unmask();

									}, 1000)
								})
								.error(function(){

									$("BODY").unmask();
									new ui.MessageDialog("NHIF", "Failed to delete rate!");
								})

								$(this).dialog("close").remove();
							}
						});
				}}
			],
			onRowClick:function(){
			
				Setup.Nhif.renderFormView($(this).attr("alt"));
			},
			onSuccess:function(){
			
				$("BODY").unmask();
			},
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#nhif").flexOptions({params: dt});

				return true;
			}
		});
	}
});