jQuery(document).ready(function($){	
		
	ui.Table = function(id,cssClass){
	
		this.uiTbl = $("<table></table>");
		this.uiTbl.attr('id',id)
		this.uiTbl.addClass(cssClass)
		
		this.newRow = function(id,cssClass){
		
			this.uiTblRow = $("<tr></tr>");
			this.uiTblRow.attr('id',id)
			this.uiTblRow.addClass(cssClass)
			this.uiTbl.append(this.uiTblRow);
		};
		
		this.newCell = function(html,id,cssClass,colSpan,rowSpan){
		
			this.uiTblCell = $("<td></td>");
			this.uiTblCell.attr("rowspan",rowSpan);
			this.uiTblCell.attr("colspan",colSpan);
			this.uiTblCell.attr('id',id)
			this.uiTblCell.addClass(cssClass)
			this.uiTblCell.html(html);
			this.uiTblRow.append(this.uiTblCell);
		};
		
		this.getTable = function(){
		
			return this.uiTbl;
		}
	}
	
});