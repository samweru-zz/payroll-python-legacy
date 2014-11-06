from bottle import Bottle, request, template, redirect
from src.controller.nhif import NhifController
from lib.util import toClass

app = Bottle()

@app.post("/all")		
def rates():
	rsRate = NhifController.getRates()
	dRate = dict([('page',1), ('rows',[rRate.toCells(["lbound", 
														"ubound",
														"amount"]) for rRate in rsRate])])
	dRate.update(total=len(dRate['rows']))
	return dRate

@app.route("/view/<id>")
def view_rate(id):
	try:
		rRate = NhifController.getRate(int(id))
		dRate = rRate.toRow()
		return dRate
	except TypeError:
		return None
		
@app.post("/update")
def update_rate():
	if NhifController.updateRate(toClass(request.forms.dict)):
		return {"success":True}
	else:
		return {"success":False}

@app.post("/add")
def add_rate():
	if NhifController.addRate(toClass(request.forms.dict)):
		return {"success":True}
	else:
		return {"success":False}

@app.delete("/delete/<id>")
def delete_rate(id):
	if NhifController.deleteRate(id):
		return {"success":True}
	else:
		return {"success":False}