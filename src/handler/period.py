from google.appengine.ext.db import Error
from bottle import Bottle, request, template, redirect
from src.controller.period import PeriodController
from lib.util import toClass

app = Bottle()

@app.post("/all")		
def periods():
	rsPeriods = PeriodController.getPeriods()
	dPeriods = dict([('page',1), ('rows',[rPeriod.toCells(["start", 
															"end", 
															"status", 
															"active"]) for rPeriod in rsPeriods])])
	dPeriods.update(total=len(dPeriods['rows']))
	return dPeriods

@app.route("/view/<id>")
def view_period(id):
	try:
		rsPeriod = PeriodController.getPeriod(int(id))
		dPeriod = rsPeriod.toRow()

		return dPeriod
	except TypeError:
		return None
		
@app.post("/update")
def update_period():
	if PeriodController.updatePeriod(toClass(request.forms.dict)):
		return {"success":True}
	else:
		return {"success":False}

@app.post("/add")
def add_period():
	if PeriodController.addPeriod(toClass(request.forms.dict)):
		return {"success":True}
	else:
		return {"success":False}

@app.delete("/delete/<id>")
def delete_period(id):
	if PeriodController.deletePeriod(id):
		return {"success":True}
	else:
		return {"success":False}