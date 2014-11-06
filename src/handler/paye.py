from bottle import Bottle, request, template, redirect
from src.controller.paye import PayeController
from lib.util import toClass

app = Bottle()

@app.post("/all")		
def rates():
	rsRate = PayeController.getRates()
	dRate = dict([('page',1), ('rows',[rRate.toCells(["mlbound", 
														"mubound",
														"albound",
														"aubound",
														"rate"]) for rRate in rsRate])])
	dRate.update(total=len(dRate['rows']))
	return dRate

@app.route("/view/<id>")
def view_rate(id):
	try:
		rRate = PayeController.getRate(int(id))
		dRate = rRate.toRow()
		return dRate
	except TypeError:
		return None
		
@app.post("/update")
def update_rate():
	if PayeController.updateRate(toClass(request.forms.dict)):
		return {"success":True}
	else:
		return {"success":False}

@app.post("/add")
def add_rate():
	if PayeController.addRate(toClass(request.forms.dict)):
		return {"success":True}
	else:
		return {"success":False}

@app.delete("/delete/<id>")
def delete_rate(id):
	if PayeController.deleteRate(id):
		return {"success":True}
	else:
		return {"success":False}