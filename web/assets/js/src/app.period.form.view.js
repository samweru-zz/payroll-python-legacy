jQuery(document).ready(function($){

	Period.renderFlexiGrid = function(){
	
		$("#period").flexigrid({

			url: '../index.php?action=period',
			dataType: 'json',
			colModel : [
				{display: '#', name : '#', sortable : true, align: 'left'},
				{display: 'Start Date', name : 'no', width : 180, sortable : true, align: 'left'},
				{display: 'End Date', name : 'surname', width : 180, sortable : true, align: 'left'},
				{display: 'Status', name : 'post', width : 180, sortable : true, align: 'left'},
				{display: 'Active', name : 'active', width : 180, sortable : true, align: 'left'}],
			buttons : [
				{name: 'Search', bclass: '', onpress : function(){}}
			],
			sortname: "name",
			sortorder: "asc",
			usepager: false,
			title: 'Period',
			singleClick:true,
			maskAjaxRequest:true,
			maskAjaxRequestMsg:'Loading...',
			useRp: false,
			rp: 15,
			showTableToggleBtn: false,
			onRowClick:function(){
			
				$("#start").css({color:"#000"});
				$("#end").css({color:"#000"});
				
				$('#form-mode').val('edit');
				$('#id').val($(this).attr('alt'));
				$("#start").val($($($(this).children().get(1)).html()).html());
				$("#end").val($($($(this).children().get(2)).html()).html());
				$("#status").val($($($(this).children().get(3)).html()).html());
				$('#active').attr('checked',($($($(this).children().get(4)).html()).html()) == 'True');
			},
			onSubmit: function addFormData(){
			
				var dt = $('#sform').serializeArray();
				$("#employee").flexOptions({params: dt});

				return true;
			},
			height: 200
		});
	}

	Period.renderFormView = function(periodId){
	
		$(".right").html("");
		var frmPeriod = new ui.widget.Form("period-form","../index.php");
		frmPeriod.register(((!!periodId)?'edit':'new'),'period');
		frmPeriod.addId('id','');
		
		frmPeriod.onSubmit(function(){
			
			if($('#start').val() == 'Start Date' || $('#end').val() == 'End Date'){
			
				if($('#start').val() == 'Start Date')
					$('#start').css({backgroundColor:'pink',color:'#fff'});
					
				if($('#end').val() == 'End Date')
					$('#end').css({backgroundColor:'pink',color:'#fff'});
			}		
			else{	
			
				$("body").mask('Saving Period...');
				frmPeriod.valid(true);
			}
		});
		
		frmPeriod.onComplete(function(jsonResult){
			
			$("body").unmask();
			
			if(jsonResult.msg == "Succeded")
				Period.renderFormView();
			else alert("Failure :: Update Unsuccessful!");	
		});
		
		var txtStart = new TextBox('start','start');
		txtStart.attr('readonly',true);
		txtStart.css({color:'#ccc'});
		txtStart.val('Start Date');
		txtStart.change(function(){
		
			if($(this).val() == 'Start Date'){
			
				$(this).val("");
				$(this).css({color:'#000'});
			}	
			else $(this).css({color:'#000'});
			
			$(this).css({backgroundColor:'#fff'});
		});
		
		txtStart.blur(function(){
		
			if($(this).val() == ''){
			
				$(this).css({color:'#ccc'});
				$(this).val("Start Date");
			}	
		});
		
		var txtEnd = new TextBox('end','end');
		txtEnd.attr('readonly',true);
		txtEnd.css({color:'#ccc'});
		txtEnd.val("End Date");
		txtEnd.change(function(){
		
			if($(this).val() == 'End Date'){
			
				$(this).val("");
				$(this).css({color:'#000'});
			}	
			else $(this).css({color:'#000'});
			
			$(this).css({backgroundColor:'#fff'});
		});
		
		txtEnd.blur(function(){
		
			if($(this).val() == ''){
			
				$(this).css({color:'#ccc'});
				$(this).val("End Date");
			}	
		});
		
		var cboStatus = new ComboBox('status','status');
		cboStatus.addOption('Close-Period','Close Period');
		cboStatus.addOption('New-Period','New Period');
		
		var chkActive = new CheckBox('active','active');
		chkActive.val('1');
		chkActive.css({margin:'1px'});
		
		var spanActive = $("<span><span>");
		spanActive.append(chkActive);
		spanActive.append($("<b>  Active?</b>"));
		
		var tblPeriod = new ui.Table('period');
		var tablePeriod = tblPeriod.getTable();
		tablePeriod.css({display:'none'});
		
		frmPeriod.cellAlignment("left");
		frmPeriod.addRow();
		frmPeriod.add(txtStart);
		frmPeriod.addRow();
		frmPeriod.add(txtEnd);
		frmPeriod.addRow();
		frmPeriod.add(cboStatus);
		frmPeriod.addRow();
		frmPeriod.add(spanActive);
		frmPeriod.addRow();
		frmPeriod.addDefaultButtons(EnumFormButtonAlign.SecondCell);
		frmPeriod.addRow();
		frmPeriod.add(tablePeriod);
		
		$('.right').append(frmPeriod.getForm());
		Period.renderFlexiGrid();
		
		$( "#start" ).datepicker();
		$( "#end" ).datepicker({maxDate:"+1Y"});
		
		$("#reset-period-form").click(function(e){
		
			txtStart.css({backgroundColor:'#fff',color:'#ccc'});
			txtEnd.css({backgroundColor:'#fff',color:'#ccc'});
			txtStart.val("Start Date");
			txtEnd.val("End Date");
			chkActive.attr('checked',false);
			$('#form-mode').val('new');
			
			e.preventDefault();
		});
	}
});