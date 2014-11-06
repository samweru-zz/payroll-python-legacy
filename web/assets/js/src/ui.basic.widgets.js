var Phone;

jQuery(document).ready(function($){	
	
	Phone = function(id,name){
		
		var phoneControlContainer = $(document.createElement("SPAN"));
		phoneControlContainer.attr('id',id);
		phoneControlContainer.attr('name',name);
		phoneControlContainer.addClass('phone_control');
		phoneControlContainer.html('+')

		phoneControlContainer.addCountryPrefix = function(value){
			
			var prefix = $((function(el){
			
				el.CharType = EnumCharType.Numeral; 
				return el;
			
			})(document.createElement("INPUT")));
			
			prefix.keydown(ui.custom.Event.KeyEvent);
			prefix.attr('size',3);
			prefix.attr('maxlength',3);
			prefix.attr("id","country_prefix_".concat(id));
			prefix.attr("name","country_prefix_".concat(name));
			prefix.val((!value.length)?'254':value);
			prefix.keypress(function(e){
			
				if($(this).val().length == 3)
					$(this).next().focus();
			});
			phoneControlContainer.append(prefix);
		};
		
		phoneControlContainer.addServicePrefix = function(value){
			
			var prefix = $((function(el){
			
				el.CharType = EnumCharType.Numeral; 
				return el;
			
			})(document.createElement("INPUT")));
			
			prefix.keydown(ui.custom.Event.KeyEvent);
			prefix.attr('size',4);
			prefix.attr('maxlength',4);
			prefix.attr("id","service_prefix_".concat(id));
			prefix.attr("name","service_prefix_".concat(name));
			prefix.val(value);
			prefix.keydown(function(e){
			
				if(e.keyCode == 8)
					if($(this).val().length == 0)
						$(this).prev().focus();
					else return;	
				else if($(this).val().length == 4)
					$(this).next().focus();
			});
			phoneControlContainer.append(prefix);
		};
		
		phoneControlContainer.addFirstSuffix = function(value){
			
			var suffix = $((function(el){
			
				el.CharType = EnumCharType.Numeral; 
				return el;
			
			})(document.createElement("INPUT")));
			
			suffix.keydown(ui.custom.Event.KeyEvent);
			suffix.attr('size',3);
			suffix.attr('maxlength',3);
			suffix.attr("id","first_suffix_".concat(id));
			suffix.attr("name","first_suffix_".concat(name));
			suffix.val(value);
			suffix.keydown(function(e){
			
				if(e.keyCode == 8)
					if($(this).val().length == 0)
						$(this).prev().focus();
					else return;	
				else if($(this).val().length == 3)
					$(this).next().focus();
			});
			phoneControlContainer.append(suffix);
		};
		
		phoneControlContainer.addSecondSuffix = function(value){
			
			var suffix = $((function(el){
			
				el.CharType = EnumCharType.Numeral; 
				return el;
			
			})(document.createElement("INPUT")));
			
			suffix.keydown(ui.custom.Event.KeyEvent);
			suffix.attr('size',3);
			suffix.attr('maxlength',3);
			suffix.attr("id","second_suffix_".concat(id));
			suffix.attr("name","second_suffix_".concat(name));
			suffix.val(value);
			suffix.keydown(function(e){
			
				if(e.keyCode == 8)
					if($(this).val().length == 0)
						$(this).prev().focus();
			});
			phoneControlContainer.append(suffix);
		};

		phoneControlContainer.setDefault = function(country, prefix, suffix1, suffix2){

			phoneControlContainer.addCountryPrefix((!country)?"":country);
			phoneControlContainer.addServicePrefix((!prefix)?"":prefix);
			phoneControlContainer.addFirstSuffix(!(suffix1)?"":suffix1);
			phoneControlContainer.addSecondSuffix(!(suffix2)?"":suffix2);
		}
				
		return phoneControlContainer;
	}
});