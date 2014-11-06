jQuery(document).ready(function($){

	Benefits.renderFlexiGrid = function(){
		
		var deductFlex = $("#benefit").flexigrid({

			url: '/benefit/all',
			dataType: 'json',
			colModel : [
				{display: '#', name : '#', width : 180, hide:true, sortable : true, align: 'left'},
				{display: 'Name.', name : 'name', width : 180, sortable : true, align: 'left'},
				{display: 'Amount/Perc(%)', name : 'damt', width : 180, sortable : true, align: 'right'},
				{display: 'Description', name : 'descr', width : 180, sortable : true, align: 'left'},
				{display: 'Percentage', name : 'descr', width : 60, sortable : true, align: 'left'},
				{display: 'Deduct', name : 'descr', width : 45, sortable : true, align: 'left'},
				{display: 'Taxable', name : 'taxable', width : 45, sortable : true, align: 'left'},
				{display: 'Active', name : 'descr', width : 45, sortable : true, align: 'left'}],
			buttons : [
				{name: "Add", bclass:"", onpress : function(){

					Benefits.renderFormView();
				}},
				{name: 'Delete', bclass: '', onpress : function(){
				
					if(!!$(".trSelected").attr('alt'))
						new ui.ConfirmDialog("Delete Benefit", "Are you sure?", {"Yes":function(){

								$('BODY').mask("wait...");
								$.destroy('/benefit/delete/'.concat($(".trSelected").attr('alt')),function(json){
								
									setTimeout(function(){

										$('BODY').unmask();
										$("#benefit").flexReload();

									}, 1000)
								})
								.error(function(){

									$('BODY').unmask();
									new ui.MessageDialog("Benefit", "Failed to delete benefit");
								});

								$(this).dialog("close").remove();
							}
						})
				}},
				{separator: true}
			],
			sortname: "name",
			sortorder: "asc",
			title: 'Benefits',
			showTableToggleBtn: false,
			onRowClick:function(){
			
				Benefits.renderFormView($(this).attr('alt'));
			},
			onError: function(){

				new ui.MessageDialog("Benefits", "Failed to load information");
			},
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#benefit").flexOptions({params: dt});

				return true;
			},
			height: 200
		});
	};
})