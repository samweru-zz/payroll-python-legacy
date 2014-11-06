jQuery(document).ready(function($){

	Setup.renderTabView = function(){
				
		var tblSetupPaye = new ui.Table('paye');
		var tableSetupPaye = tblSetupPaye.getTable();
		// tableSetupPaye.css({display:'none'});
		
		var tblSetupTaxRelief = new ui.Table('taxrelief');
		var tableSetupTaxRelief = tblSetupTaxRelief.getTable();
		// tableSetupTaxRelief.css({display:'none'});

		var tblSetupNhif = new ui.Table('nhif');
		var tableSetupNhif = tblSetupNhif.getTable();
		
		var setupTabs = new ui.Tabs('tabsSetup');
		setupTabs.newTab('tabPaye',"PAYE",tableSetupPaye);
		setupTabs.newTab('tabNhif',"NHIF",tableSetupNhif);
		setupTabs.newTab('tabRelief',"Tax Relief",tableSetupTaxRelief);

		$(".right")
			.empty()
			.append(setupTabs.getTabs())
		
		$("#tabsSetup").tabs();
		
		Setup.Paye.renderFlexiGrid();
		Setup.Nhif.renderFlexiGrid();
		Setup.TaxRelief.renderFlexiGrid();
	} 
});