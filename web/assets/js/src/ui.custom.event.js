jQuery(document).ready(function($){

	ui.custom.Event = {

		KeyEvent:function(event){
		
			/*
			'65 to 90  'All UpperCase
			'97 to 122 'All LowerCase
			'48 to 57  'All Integers
			'64 '@
			'46 '.
			'32 'Space
			'8  'Back Space
			'95 _
			'47 /
			'44 ,
			'40 (
			'41 )
			'45 -
			'58 :
			'59 ;
			'39 '
			'38 &
			'92 \
			*/

			switch (this.CharType){
			
				case EnumCharType.Alpha:
					if (event.keyCode >= 65 && 
						event.keyCode <= 90 || 
						event.keyCode >= 97 && 
						event.keyCode <= 122 || 
						event.keyCode == 8 || 
						event.keyCode == 9 ||
						event.keyCode == 32) 
						return;
					else
						event.preventDefault();
				break;
				case EnumCharType.Numeral:
					if (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode == 8 || event.keyCode == 9) 
						return;
					else
						event.preventDefault();
				break;
				case EnumCharType.AlphaNumeric:
					alert("Both");
				break;
				default:
					event.preventDefault();
			}
		}
	}
});	