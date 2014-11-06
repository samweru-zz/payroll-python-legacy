var TextBox;
var ComboBox;
var TextArea;
var CheckBox;

jQuery(document).ready(function($){	

	TextBox = function(id,name,value){
	
		var textBox = $(document.createElement('INPUT'));
		
		textBox.focus(function(){
		
			$(this).css({backgroundColor:'#fff'});
		});

		textBox.isEmpty = function(){

			if(!textBox.val()){

				textBox.css({backgroundColor:'pink'});
				return true;
			}
			else
				return false;
		}

		textBox.attr('id',id);
		textBox.attr('name',name);
		textBox.attr('type','text');
		textBox.val(value);
		
		return textBox;
	};
	
	CheckBox = function(id,name,checked,value){
	
		var checkBox = $(document.createElement('INPUT'));
		checkBox.attr('type','checkbox');
		checkBox.attr('id',id);
		checkBox.attr('name',name);
		checkBox.attr('checked',(checked)?'checked':'');
		checkBox.attr('value',value);
		
		checkBox.checked = function(isChecked){
		
			checkBox.attr('checked',(isChecked)?'checked':'');
		};
		
		return checkBox;
	};
	
	TextArea  = function(id,name){
	
		var textArea = new $(document.createElement('TEXTAREA'));
		textArea.attr("id",id);
		textArea.attr("name",name);
		
		(function(textAreaCtrl){
		
			textAreaCtrl.setCols = function(cols){
			
				this.attr('cols',cols);
			};
			
			textAreaCtrl.setRows = function(rows){
			
				this.attr('rows',rows);
			};
			
		})(textArea);
		
		return textArea;
	};
	
	ComboBox = function(id,name){

		var comboBox = $(document.createElement("SELECT"));
		comboBox.attr("id",id);
		comboBox.attr("name",name);

		(function(cboCtrl){

			cboCtrl.addOption = function(key,value,selected){
			
				this.append(new Option(value,key));
			};

		})(comboBox);

		return comboBox;
	};
});