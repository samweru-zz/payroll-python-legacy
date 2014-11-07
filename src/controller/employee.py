from datetime import *
from src.model import Employee, PayBenefit
from src.controller.post import PostController
from src.controller.payroll import PayrollController

from google.appengine.ext import db

class EmployeeController:
	# @staticmethod
	# def getEmployeesByBenefit(id):
	# 	#benefits = PayBenefit.get_by_id(int(id))
	# 	#print len(benefits)
	# 	return None
	
	@staticmethod
	def getEmployees():
		employees = Employee.all()
		return employees
		
	@staticmethod
	def getEmployee(id):
		employee = Employee.get_by_id(int(id))
		return employee
		
	@staticmethod
	def deleteEmployee(id):
		employee = EmployeeController.getEmployee(int(id))
		if employee:
			employee.delete()
			
			return True
		else: return False
		
	@staticmethod
	def updateEmployee(uemployee=None):
		if uemployee is not None:
			try:
				employee = EmployeeController.getEmployee(int(uemployee.id))
				employee.idno = long(uemployee.empno)
				employee.surname = uemployee.surname
				employee.othernames = uemployee.othernames
				employee.post = PostController.getPost(int(uemployee.post))
				employee.address1 = uemployee.address1
				employee.address2 = uemployee.address2
				employee.phone1 = uemployee.phone1
				employee.phone2 = uemployee.phone2
				employee.email1 = uemployee.email1
				employee.email2 = uemployee.email2
				employee.nssf = uemployee.nssf
				employee.nhif = uemployee.nhif
				employee.pin = uemployee.pin
				employee.gender = uemployee.gender
				employee.country = uemployee.country
				employee.city = uemployee.city
				employee.dob = datetime.date(datetime.strptime(uemployee.dob,"%Y-%m-%d"))
				employee.start = datetime.date(datetime.strptime(uemployee.start,"%Y-%m-%d"))
				employee.end = datetime.date(datetime.strptime(uemployee.end,"%Y-%m-%d"))
				employee.status = uemployee.status
				employee.bankacc = uemployee.bankacc
				employee.active = hasattr(uemployee, "active")
				employee.put()
				
				return True
			except db.TransactionFailedError:
				return False
		else:
			return False
	
	@staticmethod	
	def addEmployee(aemployee=None):
		if aemployee is not None:
			try:
				employee = Employee(idno = long(aemployee.empno),
							surname = aemployee.surname,
							othernames = aemployee.othernames,
							post = PostController.getPost(int(aemployee.post)),
							address1 = aemployee.address1,
							address2 = aemployee.address2,
							phone1 = aemployee.phone1,
							phone2 = aemployee.phone2,
							email1 = aemployee.email1,
							email2 = aemployee.email2,
							nssf = aemployee.nssf,
							nhif = aemployee.nhif,
							pin = aemployee.pin,
							gender = aemployee.gender,
							country = aemployee.country,
							city = aemployee.city,
							dob = datetime.date(datetime.strptime(aemployee.dob,"%Y-%m-%d")),
							start = datetime.date(datetime.strptime(aemployee.start,"%Y-%m-%d")),
							end = datetime.date(datetime.strptime(aemployee.end,"%Y-%m-%d")),
							status = aemployee.status,
							bankacc = aemployee.bankacc,
							active = hasattr(aemployee, "active"))
				employee.put()

				return True
			except db.TransactionFailedError:
				return False
		else:
			return False
