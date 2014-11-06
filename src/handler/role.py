from src.controller.role import RoleController
from bottle import Bottle, request, template, redirect
from lib.util import toClass

app = Bottle()

@app.post("/all")	
def role():
	rsRoles = RoleController.getRoles()
	dRoles = dict([('page',1), ('rows',[rRole.toCells() for rRole in rsRoles])])
	dRoles.update(total=len(dRoles['rows']))
	return dRoles
	
@app.route("/view/<id>")
def view_role(id):
	try:
		rsRole = RoleController.getRole(int(id))
		dRole = rsRole.toRow()
		return dRole
	except TypeError:
		return None
		
@app.post("/update")
def update_role():
	if RoleController.updateRole(toClass(request.forms.dict)):
		return {"success": True}
	else:
		return {"success": False}

@app.post("/add")
def add_role():
	if RoleController.addRole(toClass(request.forms.dict)):
		return {"success": True}
	else:
		return {"sucess": False}

@app.delete("/delete/<id>")
def remove_role(id):
	if RoleController.deleteRole(id):
		return {'success':True}
	else: 
		return {'success':False}


