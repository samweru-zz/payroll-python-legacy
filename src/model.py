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
	
class PayDetails(DictModel):
	employee = db.ReferenceProperty(Employee)
	gross_salary = db.FloatProperty(required=True)
	has_nhif = db.BooleanProperty();

class Benefit(DictModel):
	name = db.StringProperty(required=True)
	amount = db.FloatProperty(required=True) #deductable amount
	descr = db.TextProperty()
	perc = db.BooleanProperty()
	deduct = db.BooleanProperty()
	taxable = db.BooleanProperty()
	active = db.BooleanProperty()
	
class PayBenefit(DictModel):
	benefit = db.ReferenceProperty(Benefit)
	pay_details = db.ReferenceProperty(PayDetails)

class Period(DictModel):
	start = db.DateProperty(required=True)
	end = db.DateProperty(required=True)
	status = db.TextProperty(required=True)
	active = db.BooleanProperty()
	created_by = db.ReferenceProperty(reference_class=User, collection_name="creator")
	modified_by = db.ReferenceProperty(reference_class=User)
	created_at = db.DateTimeProperty(auto_now=True)
	modified_at = db.DateTimeProperty()

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

class PaySlip(DictModel):
	employee = db.ReferenceProperty(Employee)
	period = db.ReferenceProperty(Period)
	paye = db.ReferenceProperty(Nhif)

class PayNhif(DictModel):
	pay_slip = db.ReferenceProperty(PaySlip)
	nhif = db.ReferenceProperty(Nhif)

class PayNssf(DictModel):
	pay_slip = db.ReferenceProperty(PaySlip)
	amount = db.FloatProperty(required=True)

class PayRelief(DictModel):
	pay_slip = db.ReferenceProperty(PaySlip)
	relief = db.ReferenceProperty(Relief)