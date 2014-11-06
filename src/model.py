from lib.model import DictModel
from google.appengine.ext import db

class Role(DictModel):
    name = db.StringProperty(required=True)
    descr = db.TextProperty()
	
class User(DictModel):
	uname = db.StringProperty(required=True)
	pword = db.StringProperty(required=True)
	role = db.ReferenceProperty(Role, required=True)

class Department(DictModel):
	name = db.StringProperty(required=True)
	descr = db.TextProperty()
	
class Post(DictModel):
	department = db.ReferenceProperty(Department)
	name = db.StringProperty(required=True)
	descr = db.TextProperty()

class Employee(DictModel):
	idno = db.IntegerProperty(required=True)
	surname = db.StringProperty(required=True)
	othernames = db.StringProperty(required=True) 
	post = db.ReferenceProperty(Post)
	address1 = db.TextProperty()
	address2 = db.TextProperty()
	phone1 = db.StringProperty(required=True)
	phone2 = db.StringProperty()
	email1 = db.StringProperty(required=True)
	email2 = db.StringProperty()
	nssf = db.StringProperty()
	nhif = db.StringProperty()
	pin = db.StringProperty()
	gender = db.StringProperty(required=True, choices=set(["Male", "Female"]))
	country = db.StringProperty(required=True)
	city = db.StringProperty(required=True)
	dob = db.DateProperty(auto_now=True)
	start = db.DateProperty(auto_now=True)
	end = db.DateProperty(auto_now=True)
	status = db.StringProperty(required=True, choices=set(["Married", "Single", "Divorced", "Widowed"]))
	bankacc = db.TextProperty()
	active = db.BooleanProperty()

class Benefit(DictModel):
	name = db.StringProperty(required=True)
	amount = db.FloatProperty(required=True) #deductable amount
	descr = db.TextProperty()
	perc = db.BooleanProperty()
	deduct = db.BooleanProperty()
	taxable = db.BooleanProperty()
	active = db.BooleanProperty()

class Relief(DictModel):
	name = db.TextProperty(required=True)
	monthly = db.FloatProperty(required=True)
	annual = db.FloatProperty(required=True)
	active = db.BooleanProperty()

class Paye(DictModel):
	mlbound = db.FloatProperty(required=True)
	mubound = db.FloatProperty(required=True)
	albound = db.FloatProperty(required=True)
	aubound = db.FloatProperty(required=True)
	rate = db.IntegerProperty(required=True)

class Nhif(DictModel):
	lbound = db.FloatProperty(required=True)
	ubound = db.FloatProperty(required=True)
	amount = db.FloatProperty(required=True)

class Period(DictModel):
	start = db.DateProperty(required=True)
	end = db.DateProperty(required=True)
	status = db.TextProperty(required=True)
	active = db.BooleanProperty()
	created_by = db.ReferenceProperty(reference_class=User, collection_name="creator")
	modified_by = db.ReferenceProperty(reference_class=User)
	created_at = db.DateTimeProperty(auto_now=True)
	modified_at = db.DateTimeProperty()
	
class PayDetails(DictModel):
	employee = db.ReferenceProperty(Employee)
	gross_salary = db.FloatProperty(required=True)
	enable_nhif = db.BooleanProperty(default=False);
	enable_nssf = db.BooleanProperty(default=False);
	created_at = db.DateTimeProperty(auto_now=True)
	active = db.BooleanProperty(default=True)
	
class PayBenefit(DictModel):
	pay_details = db.ReferenceProperty(PayDetails)
	benefit = db.ReferenceProperty(Benefit)

class PayRelief(DictModel):
	pay_details = db.ReferenceProperty(PayDetails)
	relief = db.ReferenceProperty(Relief)

class PaySlip(DictModel):
	pay_details = db.ReferenceProperty(PayDetails)
	period = db.ReferenceProperty(Period)

class PayNhif(DictModel):
	pay_slip = db.ReferenceProperty(PaySlip)
	nhif = db.ReferenceProperty(Nhif)

class PayNssf(DictModel):
	pay_slip = db.ReferenceProperty(PaySlip)
	amount = db.FloatProperty(required=True)