jQuery(document).ready(function($){
		
	Employee.Relief.renderView = function(){
		
		var tblRelief = new ui.Table('taxrelief');
		var tableRelief = tblRelief.getTable();
		tableRelief.css({display:'none'});
		
		return tableRelief;
	};
	
	Employee.Relief.renderFlexiGrid = function(){

		var pay_details_id = $("#paydetails .trSelected").attr("alt");

		$("#taxrelief").flexigrid({

			url: '/payroll/employee/pay/details/'.concat(pay_details_id).concat('/tax/relief/details'),
			dataType: 'json',
			autoload: false,
			colModel : [
				{display: '#', name : '#', width : 180, hide:true, sortable : true, align: 'left'},
				{display: 'Name', name : 'relief', width : 180, sortable : true, align: 'left'}],
			buttons : [
				{name: 'Add', bclass: '', onpress : function(){
				
					// Post.renderFormView();

				}},
				{separator: true},
				{name: 'Delete', bclass: '', onpress : function(){
				
					// if($('.trSelected').attr('alt')!=undefined)
					// 	new ui.ConfirmDialog("Delete Post", "Are you sure?", {"Yes":function(){

					// 			$("BODY").mask("wait...");
					// 			$.destroy('/post/delete/'.concat($('.trSelected').attr('alt')),function(){
								
					// 				setTimeout(function(){

					// 					$(".pReload").click();
					// 					$("BODY").unmask();

					// 				},1000)
					// 			})
					// 			.error(function(){

					// 				$("BODY").unmask();
					// 				new ui.MessageDialog("Post", "Failed to delete post!");
					// 			});

					// 			$(this).dialog("close").remove();
					// 		}
					// 	})
						
				}},
			],
			// searchitems : [
			// 	{display: 'Name', name : 'name'},
			// 	{display: 'Department', name : 'department', isdefault: true}],
			sortname: "name",
			sortorder: "asc",
			// usepager: true,
			title: 'Employee Tax Relief',
			// useRp: false,
			// rp: 15,
			showTableToggleBtn: false,
			// width: $('.right').width()-10,//700,
			onRowClick:function(){
			
				Employee.Relief.renderFormView($(this).attr('alt'));
			},
			onError:function(){

				new ui.MessageDialog("Tax Relief", "Failed to load information!");
			},
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#taxrelief").flexOptions({params: dt});

				return true;
			},
			height: 200
		});
	}
}); 