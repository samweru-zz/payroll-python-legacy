jQuery(document).ready(function($){	
	
	Employee.renderFormView = function(employeeId){
	
		$(".right").html("");
		if(!!employeeId)
			$("body").mask('Loading Employee Details...');
		else
			$("body").mask("Loading Posts...")
		
		var txtEmpNo = new TextBox('empno','empno');
		txtEmpNo.get(0).CharType = EnumCharType.Numeral; 
		txtEmpNo.keydown(ui.custom.Event.KeyEvent);
		
		var txtSurname = new TextBox('surname','surname');
		txtSurname.get(0).CharType = EnumCharType.Alpha; 
		txtSurname.keydown(ui.custom.Event.KeyEvent);
		
		var txtOthernames = new TextBox('othernames','othernames');
		txtOthernames.get(0).CharType = EnumCharType.Alpha; 
		txtOthernames.keydown(ui.custom.Event.KeyEvent);
		
		var txtPhone = new TextBox('phone1','phone1');
		var txtPhoneb = new TextBox('phone2','phone2');
		
		var txtEmail = new TextBox('email1','email1');
		var txtEmailb = new TextBox('email2','email2');
		
		var txtNssf = new TextBox('nssf','nssf');
		var txtNhif = new TextBox('nhif','nhif');
		
		var txtPin = new TextBox('pin','pin');
		var txtCountry = new TextBox('country','country');
		var txtCity = new TextBox('city','city');
		
		var txtDob = new TextBox('dob','dob');
		txtDob.attr('readonly',true);
		
		var txtStart = new TextBox('start','start');
		txtStart.attr('readonly',true);
		
		var txtEnd = new TextBox('end','end');
		txtEnd.attr('readonly',true);
				
		var txtBankAcc = new TextArea('bankacc','bankacc');
		txtBankAcc.setRows(5);
		txtBankAcc.setCols(30);
		
		var txtAddress = new TextArea('address1','address1');
		txtAddress.setRows(5);
		txtAddress.setCols(30);
		
		var txtAddressb = new TextArea('address2','address2');
		txtAddressb.setRows(5);
		txtAddressb.setCols(30);
		
		var cboPost = new ComboBox('post','post');
		
		var cboGender = new ComboBox('gender','gender');
		cboGender.addOption('Male',"Male");
		cboGender.addOption('Female',"Female");
		
		var cboStatus = new ComboBox('status','status');
		cboStatus.addOption('Single','Single');
		cboStatus.addOption('Married','Married');
		cboStatus.addOption('Divorced','Divorced');
			
		var chkActive = new CheckBox('active','active');
		
		var frmEmployee = new ui.widget.Form("employee-form","/employee/".concat((!!employeeId)?'update':'add'));
	
		if(!!employeeId){

			$.read('/employee/view/'.concat(employeeId),function(employee){
								
				frmEmployee.addId('id',employee.id);
				frmEmployee.addId('paydetailsid',employee.paydetails);
				
				txtEmpNo.val(employee.idno);
				txtSurname.val(employee.surname);
				txtOthernames.val(employee.othernames);
				
				txtAddress.html(employee.address1);
				txtAddressb.html(employee.address2);

				txtPhone.val(employee.phone1);
				txtPhoneb.val(employee.phone2);
				
				txtEmail.val(employee.email1);
				txtEmailb.val(employee.email2);
				
				txtNssf.val(employee.nssf);
				txtNhif.val(employee.nhif);
				
				txtPin.val(employee.pin);
				txtCountry.val(employee.country);
				txtCity.val(employee.city);
				
				txtDob.val(employee.dob);
				txtStart.val(employee.start);
				txtEnd.val(employee.end);
				
				cboGender.val(employee.gender);
				cboStatus.val(employee.status);
				
				txtBankAcc.html(employee.bankacc);
				chkActive.attr("checked", employee.active == 'True')	
			
				$(employee.posts).each(function(i,post){
				
					cboPost.addOption(post.id,post.name);
					if(employee.post == post.name)	
						cboPost.val(post.id);
					
					$("body").unmask();
				});
			})
			.error(function(){

				$("BODY").unmask();
				new ui.MessageDialog("Employee", "Failed to retrieve information!");
			});
		}
		else{

			$.read("/employee/posts", function(json){

				$.each(json.posts, function(i,post){
				
					cboPost.addOption(post.id,post.name);
					$("body").unmask();
				});
			})
			.error(function(){

				$("body").unmask();
				new ui.MessageDialog("Employee", "Failed to retrieve posts!");
			})
		}
		
		frmEmployee.onSubmit(function(){

			var isAnyEmpty = false;
			$.each([txtSurname, txtOthernames,
					txtStart, txtEnd, txtDob, txtCountry,
					txtCity, txtPhone, txtEmail, txtEmpNo], function(i,e){

						if(e.isEmpty())
							isAnyEmpty = true;
					})

			if(!isAnyEmpty){

				$("body").mask('Saving Employee Details...');
				frmEmployee.valid(true);
			}	
		});

		frmEmployee.onError(function(){

			$("body").unmask();
			new ui.MessageDialog("Employee", "Failed to update employee!");
		})
		
		frmEmployee.onComplete(function(updateMsg){
			
			$("body").unmask();
			if(updateMsg.msg == 'Failed')
				new ui.MessageDialog("Employee", "Failed to update employee!");
			else	
				Employee.renderView();
	
		});
		
		frmEmployee.addRow();
		frmEmployee.add("Employee No/IDNo",txtEmpNo);
		frmEmployee.addRow();
		frmEmployee.add("Surname",txtSurname);
		frmEmployee.add("Othernames",txtOthernames);
		frmEmployee.addRow();
		frmEmployee.add("Post",cboPost);
		frmEmployee.addRow();
		frmEmployee.add("Address1",txtAddress);
		frmEmployee.add("Address2",txtAddressb);
		frmEmployee.addRow();
		frmEmployee.add("Phone1",txtPhone);
		frmEmployee.add("Phone2",txtPhoneb);
		frmEmployee.addRow();
		frmEmployee.add("Email1",txtEmail);
		frmEmployee.add("Email2",txtEmailb);
		frmEmployee.addRow();
		frmEmployee.add("NSSF",txtNssf);
		frmEmployee.add("NHIF",txtNhif);
		frmEmployee.addRow();
		frmEmployee.add("PIN",txtPin);
		frmEmployee.addRow();
		frmEmployee.add("Gender",cboGender);
		frmEmployee.addRow();
		frmEmployee.add("Country",txtCountry);
		frmEmployee.add("City",txtCity);
		frmEmployee.addRow();
		frmEmployee.add("DOB",txtDob);
		frmEmployee.addRow();
		frmEmployee.add("Start Date",txtStart);
		frmEmployee.add("End Date",txtEnd);
		frmEmployee.addRow();
		frmEmployee.add("Marital Status",cboStatus);
		frmEmployee.addRow();
		frmEmployee.add("Bank Account Details",txtBankAcc);
		frmEmployee.addRow();
		frmEmployee.add("Active",chkActive);
		frmEmployee.addDefaultButtons();
		
		return frmEmployee;
	}
}); 
