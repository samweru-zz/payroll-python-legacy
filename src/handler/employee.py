from google.appengine.ext.db import Error, Key, Query
from bottle import Bottle
from bottle import request, template, redirect

from src.controller.post import PostController
from src.controller.department import DepartmentController
from src.controller.employee import EmployeeController
from src.controller.payroll import PayrollController
from lib.util import toClass

from src.model import PayDetails, PayBenefit, Benefit

app = Bottle()

@app.route("benefits/<id>")
def benefits(id):
	dPayBenefits = PayrollController.getEmployeeBenefits(int(id))
	return dPayBenefits
	
@app.route("payroll")
def payroll():	
	# oPayroll = toClass(kwargs)
	rsBenefits = Benefit.get_by_id([int(sBenefits) for sBenefits in oPayroll.benefits])
		
	queryPayBenefits = Query(PayBenefit)
	queryPayBenefits.filter('benefit in',[rBenefit.key() for rBenefit in rsBenefits])
	queryPayBenefits.filter('pay_details =',PayDetails.get_by_id(int(oPayroll.id)).key())
	queryPayBenefits.order('-__key__')
	rsPayDetails = queryPayBenefits.fetch(1000)
	
	try:
		for rPayDetail in rsPayDetails: 
			rPayDetail.delete()	
		return {'msg':'Succeded'}
	except db.TransactionFailedError:
		return {'msg':'Failure'}

@app.post("/all")
def employees():
	columns = ['idno','surname','othernames','post','active']
	rsEmployees = EmployeeController.getEmployees()
	dEmployees = dict([('page',1), ('rows',[rEmployee.toCells(columns) for rEmployee in rsEmployees])])
	dEmployees.update(total=len(dEmployees['rows']))
	return dEmployees

@app.route("/view/<id>")	
def view_employee(id):
	try:
		rsPosts = PostController.getPosts()
		rsEmployee = EmployeeController.getEmployee(int(id))
		dEmployee = rsEmployee.toRow()
		dEmployee.update([('posts',[rPost.toRows(['name']) for rPost in rsPosts])])
		return dEmployee
	except TypeError:
		return None

@app.route("/posts")
def employee_posts():
	rsPosts = PostController.getPosts()
	return {"posts":[rPost.toRows(["name"]) for rPost in rsPosts]}
		
@app.post("/update")
def update_employee():
	uemployee = toClass(request.forms.dict)
	if EmployeeController.updateEmployee(uemployee):
		return {"success": True}
	else:
		return {"success": True}

@app.post("/add")
def add_employee():
	aemployee = toClass(request.forms.dict)
	if EmployeeController.addEmployee(aemployee):
		return {"success": True}
	else:
		return {"success": True}

@app.delete("/delete/<id>")
def delete_employee(id):
	if EmployeeController.deleteEmployee(id):
		return {"success": True}
	else:
		return {"success": True}