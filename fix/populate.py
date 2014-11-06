import sha

from datetime import date
from src.model import Role, User, Department, Post, Employee, Benefit, PayDetails, PayBenefit, PayRelief, Paye, Nhif, Relief

class Populate(object):
	def __init__(self):
		self.auth()
		self.payroll()

	def auth(self):
		r1 = Role(name="Admin",descr="Administrator")
		r1.put()
		r2 = Role(name="User",descr="User")
		r2.put()
		u1 = User(uname='sa',
					pword=self.shash('admin'),
					role=r1)
		u1.put()
		u2 = User(uname='guest',
					pword=self.shash('user'),
					role=r2)
		u2.put()
		
	def payroll(self):
		d1 = Department(name='Human Resource',
							descr='Human Resource Department')
		d1.put()
		d2 = Department(name='Financial Department',
							descr='Accounting and Finance Department')
		d2.put()
		p1 = Post(name='Human Resource Manager',
					descr='N/A',
					department=d1)
		p1.put()
		p2 = Post(name='Accounting Manager',
					descr='N/A',
					department=d2)
		p2.put()
		e1 = Employee(idno = 24533489,
						surname = 'Weru',
						othernames = 'Samuel Wambugu',
						post = p1,
						address1 = "P. O. Box 123 0200 Nairobi, Kenya",
						address2 = "N/A",
						phone1 = "254-0712-000-001",
						phone2 = "000-0000-000-000",
						email1 = "samweru@gmail.com",
						email2 = "samweru@ymail.com",
						nssf = "nssf0092wwe22",
						nhif = "nhif3672hsd77",
						pin = "712637teyw871238ye",
						gender = "Male",
						country = "Kenya",
						city = "Nairobi",
						dob = date(1986,01,01),
						start = date(2010,01,01),
						end = date(2015,01,01),
						status = "Married",
						bankacc = "029 3266366 Equity Bank, Mfangano Street",
						active = True)
		e1.put()
		e2 = Employee(idno = 56657403,
						surname = 'Oyier',
						othernames = 'George Anderson',
						post = p2,
						address1 = "P. O. Box 567 0222 Nairobi, Kenya",
						phone1 = "254-0735-020-021",
						email1 = "oyiergoh@gmail.com",
						nssf = "nssf4646w4e42",
						nhif = "nhif337hs3d47",
						pin = "872364868237hjbgfs8",
						gender = "Male",
						country = "Kenya",
						city = "Nairobi",
						status = "Single",
						bankacc = "029 3266366 Barclays Bank, Haile Selassie Avenue",
						active = True)
		e2.put()

		b1 = Benefit(name = "Travel Expense",
						amount = 10.00, #deductable amount
						descr = "N/A",
						perc = bool(True),
						deduct = bool(False),
						taxable = bool(True),
						active = bool(True))
		b1.put()
		b2 = Benefit(name = "House Allowance",
						amount = 10000.00, #deductable amount
						descr = "N/A",
						perc = bool(False),
						deduct = bool(False),
						taxable = bool(True),
						active = bool(True))
		b2.put()
		b3 = Benefit(name = "Hardship Allowance",
						amount = 12000.00, #deductable amount
						descr = "N/A",
						perc = bool(False),
						deduct = bool(False),
						taxable = bool(False),
						active = bool(True))
		b3.put()

		r1=Relief(name='Personal Relief', monthly=1162.00, annual=13944.00, active=True)
		r1.put()
		r2=Relief(name='Insurance Relief', monthly=5000.00, annual=60000.00, active=True)
		r2.put()
		r3=Relief(name='Allowable Pension Fund Contribution', monthly=20000.00, annual=240000.00, active=True)
		r3.put()
		r4=Relief(name='Allowable HOSP Contribution', monthly=4000.00, annual=48000.00, active=True)
		r4.put()
		r5=Relief(name='Owner Occupier Interest', monthly=12500.00, annual=150000.00, active=True)
		r5.put()

		pd1 = PayDetails(employee = e1,
							gross_salary = 15000.00)
		pd1.put()
		pd2 = PayDetails(employee = e2,
							gross_salary = 25000.00)
		pd2.put()

		pr1 = PayRelief(pay_details = pd1, relief = r1)
		pr1.put()

		pr1 = PayRelief(pay_details = pd2, relief = r2)
		pr1.put()

		p1 = PayBenefit(benefit = b1,
							pay_details = pd1)
		p1.put()
		p2 = PayBenefit(benefit = b2,
							pay_details = pd2)
		p2.put()
		p3 = PayBenefit(benefit = b3,
							pay_details = pd1)
		p3.put()
		p4 = PayBenefit(benefit = b2,
							pay_details = pd1)
		p4.put()
		
		###########
		y1 = Paye(mlbound=0.00, mubound=10164.00, albound=0.00, aubound=121968.00, rate=10)
		y1.put()
		y2 = Paye(mlbound=10165.00, mubound=19740.00, albound=121969.00, aubound=236880.00, rate=15)
		y2.put()
		y3 = Paye(mlbound=19741.00, mubound=29316.00, albound=236881.00, aubound=351792.00, rate=20)
		y3.put()
		y4 = Paye(mlbound=29317.00, mubound=38892.00, albound=351793.00, aubound=466704.00, rate=25)
		y4.put()
		y5 = Paye(mlbound=38893.00, mubound=10000000.00, albound=466704.00, aubound=10000000.00, rate=30)
		y5.put()

		n1=Nhif(lbound=0.00, ubound=5999.00, amount=150.00)
		n1.put()
		n2=Nhif(lbound=6001.00, ubound=7999.00, amount=300.00)
		n2.put()
		n3=Nhif(lbound=8000.00, ubound=22222.00, amount=400.00)
		n3.put()
		n4=Nhif(lbound=12000.00, ubound=14999.00, amount=500.00)
		n4.put()
		n5=Nhif(lbound=15000.00, ubound=22222.00, amount=600.00)
		n5.put()
		n6=Nhif(lbound=20000.00, ubound=24999.00, amount=750.00)
		n6.put()
		n7=Nhif(lbound=25000.00, ubound=29999.00, amount=850.00)
		n7.put()
		n8=Nhif(lbound=30000.00, ubound=49999.00, amount=1000.00)
		n8.put()
		n9=Nhif(lbound=50000.00, ubound=99999.00, amount=1500.00)
		n9.put()
		n10=Nhif(lbound=100000.00, ubound=99999999.00, amount=2000.00)
		n10.put()

	def shash(self, hstr):
		s = sha.new()
		s.update(hstr)
		return s.hexdigest()
		