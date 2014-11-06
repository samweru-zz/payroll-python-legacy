jQuery(document).ready(function($){

	ui.Tabs = function(id){

		var divTabComponent;
		var unorderedListTab;
		
		this.initialize = function(id){
		
			divTabComponent = $(document.createElement('DIV'));
			divTabComponent.attr('id',id);
			
			unorderedListTab = $(document.createElement('UL'));
			divTabComponent.append(unorderedListTab);
		}
		
		this.newTab = function(id,text,content){
		
			var anchor = $(document.createElement('A'));
			anchor.html(text);
			anchor.attr('href','#'.concat(id));
			
			var listItemTab = $(document.createElement('LI'));
			listItemTab.append(anchor);
			unorderedListTab.append(listItemTab);
			
			var divTab = $(document.createElement('DIV'));
			divTab.append(content);
			divTab.attr('id',id);
			divTabComponent.append(divTab);
			
			return anchor;
		}	
		
		this.getTabs = function(){
		
			return divTabComponent;
		}
		
		this.initialize(id);
	}
});