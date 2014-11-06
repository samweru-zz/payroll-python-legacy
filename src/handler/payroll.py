from src.model import PayDetails, Benefit
from src.controller.benefit import BenefitController
from src.controller.payroll import PayrollController
from src.controller.employee import EmployeeController
from lib.util import toClass

from bottle import Bottle, request, template, redirect
		
app = Bottle();

@app.post("/employee/<employee_id>/pay/details/entries")		
def employee_pay_details_entries(employee_id):
	entries = PayrollController.getEmployeePayDetailsEntries(employee_id)
	dPayDetailsEntries = dict([('page',1), ('rows', [entry.toCells(["gross_salary",
																	"enable_relief",
																	"enable_nhif",
																	"enable_nssf",
																	"active",
																	"created_at"]) for entry in entries])])
	dPayDetailsEntries.update(total=len(dPayDetailsEntries['rows']))
	return dPayDetailsEntries

@app.post("/employee/pay/details/<pay_details_id>/benefits")
def employe_benefits(pay_details_id):
	try:
		entries = PayrollController.getEmployeeBenefits(pay_details_id)
		dBenefits = dict([("page",1), ("rows", [entry.toCells() for entry in entries])])
		return dBenefits
	except TypeError:
		return None

@app.post("/employee/pay/details/<pay_details_id>/tax/relief/details")
def employe_tax_relief_entries(pay_details_id):
	try:
		entries = PayrollController.getEmployeeTaxReliefEntries(pay_details_id)
		dTaxRelief = dict([("page",1), ("rows", [entry.toCells() for entry in entries])])
		return dTaxRelief
	except TypeError:
		return None

@app.route("/employee/<id>/pay/details")
def employee_pay_details(id):
	try:
		entry = PayrollController.getPayDetailsEntry(int(id))
		dPayDetailsEntry = entry.toRow()
		return dPayDetailsEntry
	except TypeError:
		return None
		
@app.post("/update/pay/details")
def update_rate():
	if PayrollController.updatePayDetails(toClass(request.forms.dict)):
		return {"success":True}
	else:
		return {"success":False}

@app.post("/add")
def add_rate():
	if PayrollController.addPayDetails(toClass(request.forms.dict)):
		return {"success":True}
	else:
		return {"success":False}

@app.delete("/delete/<id>")
def delete_rate(id):
	if PayrollController.deletePayDetails(id):
		return {"success":True}
	else:
		return {"success":False}