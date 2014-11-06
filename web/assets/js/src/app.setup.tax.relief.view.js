jQuery(document).ready(function($){
	
	Setup.TaxRelief.renderFlexiGrid = function(){
		
		$("#taxrelief").flexigrid({

			url: '/relief/all',
			dataType: 'json',
			title: 'Tax Relief Rates',
			height: 200,
			colModel : [
				{display: '#', name : '#', width : 180, hide:true, sortable : true, align: 'right'},
				{display: 'Name', name : 'name', width : 180, sortable : true, align: 'left'},
				{display: 'Monthly', name : 'monthly', width : 180, sortable : true, align: 'right'},
				{display: 'Annually', name : 'annual', width : 180, sortable : true, align: 'right'},
				{display: 'Active', name : 'active', width : 180, sortable : true, align: 'right'}],
			buttons : [
				{name: 'Add', bclass: '', onpress : function(){

					Setup.TaxRelief.renderFormView();
				}},
				{name: 'Delete', bclass: '', onpress : function(){

					if($('.trSelected').attr('alt'))
						new ui.ConfirmDialog("Delete Tax Relief Rate", "Are you sure?", {"Yes":function(){

								$("BODY").mask("wait...");
								$.destroy("/relief/delete/".concat($('.trSelected').attr('alt')), function(){

									setTimeout(function(){

										$("#taxrelief").flexReload();
										$("BODY").unmask();

									}, 1000)
								})
								.error(function(){

									$("BODY").unmask();
									new ui.MessageDialog("Tax Relief", "Failed to delete rate!");
								})

								$(this).dialog("close").remove();
							}
						});
				}}
			],
			onRowClick:function(){
			
				Setup.TaxRelief.renderFormView($(this).attr('alt'));
			},
			onSuccess:function(){
			
				$("BODY").unmask();
			},
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#taxrelief").flexOptions({params: dt});

				return true;
			}
		});
	}
});