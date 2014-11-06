jQuery(document).ready(function($){
	
	Setup.Paye.renderFlexiGrid = function(){
	
		$("#paye").flexigrid({

			url: '/paye/all',
			dataType: 'json',
			title: 'PAYE Rates',
			height: 200,
			colModel : [
				{display: '#', name : '#',  width : 180, hide:true, sortable : true, align: 'right'},
				{display: 'Monthly Lower Bound', name : 'mlbound', width : 180, sortable : true, align: 'right'},
				{display: 'Monthly Upper Bound', name : 'mubound', width : 180, sortable : true, align: 'right'},
				{display: 'Annual Lower Bound', name : 'albound', width : 180, sortable : true, align: 'right'},
				{display: 'Annual Upper Bound', name : 'aubound', width : 180, sortable : true, align: 'right'},
				{display: 'Rate(%)', name : 'rate', width : 180, sortable : true, align: 'right'}],
			buttons : [
				{name: 'Add', bclass:'', onpress: function(){

					Setup.Paye.renderFormView();
				}},
				{name: 'Delete', bclass:'', onpress: function(){

					if($('.trSelected').attr('alt'))
						new ui.ConfirmDialog("Delete PAYE Rate", "Are you sure?", {"Yes":function(){

								$("BODY").mask("wait...");
								$.destroy("/paye/delete/".concat($('.trSelected').attr('alt')), function(){

									setTimeout(function(){

										$("#paye").flexReload();
										$("BODY").unmask();

									}, 1000)
								})
								.error(function(){

									$("BODY").unmask();
									new ui.MessageDialog("PAYE", "Failed to delete rate!");
								})

								$(this).dialog("close").remove();
							}
						});
				}}
			],
			onRowClick:function(){
			
				Setup.Paye.renderFormView($(this).attr('alt'));
			},
			onSuccess:function(){
			
				$("BODY").unmask();
			},
			onSubmit: function addFormData(){
				
				var dt = $('#sform').serializeArray();
				$("#paye").flexOptions({params: dt});

				return true;
			}
		});
	}
});