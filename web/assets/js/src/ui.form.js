jQuery(document).ready(function($){	

	ui.Form = function(id,action,method,cssClass){
	
		this.uiForm = $("<form></form>");
		this.uiFormId = id;
		this.uiFormUrl = action;
		this.uiForm.attr('id',id);
		this.uiForm.attr('action',action);
		this.uiForm.attr('method',(!!method)?method:"POST");
		this.uiForm.addClass(cssClass);
		this.uiForm.submit(function(e){
			
			e.preventDefault();
		});
		
		this.getForm = function(){
		
			return this.uiForm;
		};
		
		this.registerForm = function(name,mode){
		
			this.appendId('form-id',name);
			this.appendId('form-mode',mode);		
		};
		
		this.appendId = function(id,value){
		
			var identifier = $(document.createElement('INPUT'));
			identifier.attr('type','hidden');
			identifier.attr('id',id);
			identifier.attr('name',id);
			identifier.val(value);
			
			this.uiForm.append(identifier);
		};
		
		this.getSubmitButton = function(){
		
			var btnSubmit = $("<input type='button' value='Submit'>");
			btnSubmit.attr("id","submit-".concat(this.uiFormId));
			
			if(!!this.handler)
				btnSubmit.click(this.handler);
				
			if(!!this.jsonHandler)
				btnSubmit.click(this.jsonHandler);
			
			return btnSubmit;
		};
		
		this.onSubmit = function(handler){
		
			this.handler = handler;
		};
		
		this.doJsonRpc = function(jsonHandler){
		
			this.jsonHandler = jsonHandler;
		};
		
		this.getResetButton = function(){
		
			var btnReset = $("<input type='reset' value='Reset'>");
			btnReset.attr("id","reset-".concat(this.uiFormId));
			
			return btnReset;
		};
		
		this.getButtons = function(){
			
			var spanButton = $("<span></span>");
			spanButton.attr("id","buttons-".concat(this.uiFormId));
			spanButton.append(this.getSubmitButton());
			spanButton.append(this.getResetButton());
			
			return spanButton;
		};
	}
});
