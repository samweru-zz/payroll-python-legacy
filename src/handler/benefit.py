from src.model import PayDetails, Benefit
from src.controller.benefit import BenefitController
from src.controller.payroll import PayrollController
from src.controller.employee import EmployeeController
from lib.util import toClass

from bottle import Bottle, request, template, redirect
from google.appengine.ext import db

app = Bottle()

@app.post("/all")
def benefits():
	columns = ["name","amount","descr","perc","deduct","taxable","active"]
	rsBenefits = BenefitController.getBenefits()
	dBenefits = dict([('page',1), ('rows',[rBenefit.toCells(columns) for rBenefit in rsBenefits])])
	dBenefits.update(total=len(dBenefits['rows']))
	return dBenefits
	
@app.route("/view/<id>")
def view_benefit(id):
	try:
		rsBenefit = BenefitController.getBenefit(int(id))
		dBenefit = rsBenefit.toRow()
		return dBenefit
	except TypeError:
		return None

@app.route("/ist")
def list_benefits():
	rsBenefits = BenefitController.getBenefits()
	dBenefits = [rBenefit.toRows(['name']) for rBenefit in rsBenefits]
	return dBenefits
	
@app.post("/update")
def update_benefit():
	if BenefitController.updateBenefit(toClass(request.forms.dict)):
		return {"success":True}
	else:
		return {"success":False}

@app.post("/add")
def add_benefit():
	if BenefitController.addBenefit(toClass(request.forms.dict)):
		return {"success":True}
	else:
		return {"success":False}

@app.delete("/delete/<id>")
def delete_benefit(id):
	if BenefitController.deleteBenefit(id):
		return {"success":True}
	else:
		return {"success":False}