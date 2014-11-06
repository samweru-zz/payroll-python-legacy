from bottle import Bottle, request, template, redirect
from src.controller.relief import ReliefController
from lib.util import toClass

app = Bottle()

@app.post("/all")		
def rates():
	rsRate = ReliefController.getRates()
	dRate = dict([('page',1), ('rows',[rRate.toCells(["name", 
														"monthly",
														"annual",
														"active"]) for rRate in rsRate])])
	dRate.update(total=len(dRate['rows']))
	return dRate

@app.route("/view/<id>")
def view_rate(id):
	try:
		rRate = ReliefController.getRate(int(id))
		dRate = rRate.toRow()
		return dRate
	except TypeError:
		return None
		
@app.post("/update")
def update_rate():
	if ReliefController.updateRate(toClass(request.forms.dict)):
		return {"success":True}
	else:
		return {"success":False}

@app.post("/add")
def add_rate():
	if ReliefController.addRate(toClass(request.forms.dict)):
		return {"success":True}
	else:
		return {"success":False}

@app.delete("/delete/<id>")
def delete_rate(id):
	if ReliefController.deleteRate(id):
		return {"success":True}
	else:
		return {"success":False}