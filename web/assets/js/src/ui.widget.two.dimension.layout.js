jQuery(document).ready(function($){	
		
	ui.widget.two.dimension.Layout = function(id,cssClass){
	
		this.uiCustomTable = new ui.Table(id,cssClass);
		this.uiElementCell;
		
		this.newRow = function(id,cssClass){
		
			this.uiCustomTable.newRow(id,cssClass); 
		};
		
		this.newCell = function(caption,element,halign){
		
			if(!!halign);
			else	halign = "right";
				
			this.uiCustomTable.newCell(caption);
			this.uiCustomTable.uiTblCell.attr('valign',"top");
			this.uiCustomTable.uiTblCell.attr('align',halign);
			this.uiCustomTable.newCell(element);
			this.uiElementCell = this.uiCustomTable.uiTblCell;
			this.uiCustomTable.uiTblCell.attr('valign',"top");
		};
		
		this.getElementCell = function(){
		
			return this.uiElementCell;
		};
		
		this.getTable = function(){
		
			return this.uiCustomTable.uiTbl;
		};
	}
});