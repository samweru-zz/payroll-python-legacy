from bottle import Bottle, request, template, redirect
from src.controller.department import DepartmentController
from lib.util import toClass

app = Bottle();

@app.post("/all")
def depts():
	rsDepartments = DepartmentController.getDepartments()
	dDepartment = dict([('page',1), ('rows',[rDepartment.toCells() for rDepartment in rsDepartments])])
	dDepartment.update(total=len(dDepartment['rows']))
	return dDepartment
	
@app.route("/view/<id>")
def view_dept(id):
	try:
		rsDept = DepartmentController.getDepartment(int(id))
		dDept = rsDept.toRow()
		return dDept
	except TypeError:
		return None
		
@app.post("/update")
def update_dept():
	if DepartmentController.updateDepartment(toClass(request.forms.dict)):
		return {"success": True}
	else:
		return {"success": True}

@app.post("/add")
def add_dept():
	if DepartmentController.addDepartment(toClass(request.forms.dict)):
		return {"success": True}
	else:
		return {"success": True}

@app.delete("/delete/<id>")
def delete_dept(id):
	if DepartmentController.deleteDepartment(id):
		return {"success": True}
	else:
		return {"success": True}