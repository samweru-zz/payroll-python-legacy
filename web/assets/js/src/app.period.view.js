jQuery(document).ready(function($){

	Period.renderView = function(){
		
		var tblPeriod = new ui.Table('period');
		var tablePeriod = tblPeriod.getTable();
		tablePeriod.css({display:'none'});

		$(".right")
			.empty()
			.append(tablePeriod);
		
		Period.renderFlexiGrid();
	};

	Period.renderFlexiGrid = function(){
	
		$("#period").flexigrid({

			url: '/period/all',
			dataType: 'json',
			colModel : [
				{display: '#', name : '#',  width : 180, hide:true, sortable : true, align: 'left'},
				{display: 'Start Date', name : 'no', width : 180, sortable : true, align: 'left'},
				{display: 'End Date', name : 'surname', width : 180, sortable : true, align: 'left'},
				{display: 'Status', name : 'post', width : 180, sortable : true, align: 'left'},
				{display: 'Active', name : 'active', width : 180, sortable : true, align: 'left'}],
			buttons : [
				{name: 'Add', bclass: '', onpress : function(){

					Period.renderFormView()
				}}
			],
			sortname: "name",
			sortorder: "asc",
			usepager: true,
			title: 'Fisical Period',
			useRp: false,
			rp: 15,
			showTableToggleBtn: false,
			onRowClick:function(){
			
				Period.renderFormView($(this).attr('alt'))
			},
			onError:function(){

				ui.MessageDialog("Fisical Period", "Failed to retrieve fisical period list!");
			},
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#employee").flexOptions({params: dt});

				return true;
			},
			height: 200
		});
	}
});