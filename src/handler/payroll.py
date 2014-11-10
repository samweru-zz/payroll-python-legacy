from src.model import PayDetails, Benefit
from src.controller.benefit import BenefitController
from src.controller.payroll import PayrollController
from src.controller.employee import EmployeeController
from src.controller.payslip import PaySlipController
from lib.util import toClass

from bottle import Bottle, request, template, redirect
		
app = Bottle();
@app.post("/employee/<employee_id>/pay/slip")
def employee_pay_slip(employee_id):
	return PaySlipController.employeePayReport(employee_id)

@app.delete("/employee/tax/relief/delete/<pay_benefit_id>")
def employee_tax_relief_delete(pay_benefit_id):
	if PayrollController.deleteEmployeeTaxReliefEntry(pay_benefit_id):
		return {"success":True}
	else:
		return {"success":False}

@app.delete("/employee/benefit/delete/<pay_benefit_id>")
def employee_benefit_delete(pay_benefit_id):
	if PayrollController.deleteEmployeeBenefit(pay_benefit_id):
		return {"success":True}
	else:
		return {"success":False}

@app.post("/employee/tax/relief/add")
def employee_tax_relief_add():
	if not PayrollController.employeeTaxReliefEntryExists(toClass(request.forms.dict)):
		if PayrollController.addTaxReliefEntryBenefit(toClass(request.forms.dict)):
			return {"success":True}
		else:
			return {"success":False}
	else:
		return {"success":False, "msg":"Tax Relief type already exists for employee!"}

@app.post("/employee/benefit/add")
def employee_benefit_add():
	if not PayrollController.employeeBenefitExists(toClass(request.forms.dict)):
		if PayrollController.addEmployeeBenefit(toClass(request.forms.dict)):
			return {"success":True}
		else:
			return {"success":False}
	else:
		return {"success":False, "msg":"Benefit already exists for employee!"}

@app.post("/employee/pay/details/update")
def employee_pay_details_update():
	if PayrollController.updateEmployeePayDetailsEntry(toClass(request.forms.dict)):
		return {"success":True}
	else:
		return {"success":False}

@app.post("/employee/<employee_id>/pay/details/add")
def employee_pay_details_add(employee_id):
	employeeNewEntry = toClass(request.forms.dict)
	if PayrollController.addEmployeePayDetailsEntry(employee_id, employeeNewEntry):
		return {"success":True}
	else:
		return {"success":False}

@app.post("/employee/<employee_id>/pay/details/entries")		
def employee_pay_details_entries(employee_id):
	entries = PayrollController.getEmployeePayDetailsEntries(employee_id)
	dPayDetailsEntries = dict([('page',1), ('rows', [entry.toCells(["gross_salary",
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

@app.route("/employee/pay/details/entry/<pay_detail_id>")
def employee_pay_details_entry(pay_detail_id):
	try:
		entry = PayrollController.getPayDetailsEntry(pay_detail_id)
		dPayDetailsEntry = entry.toRow()
		return dPayDetailsEntry
	except TypeError:
		return None

@app.delete("/employee/pay/details/entry/delete/<pay_detail_id>")
def employee_pay_details_entry_delete(pay_detail_id):
	if PayrollController.deleteEmployeePayDetails(pay_detail_id):
		return {"success":True}
	else:
		return {"success":False}

