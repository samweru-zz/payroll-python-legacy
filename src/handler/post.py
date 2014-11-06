from google.appengine.ext.db import Error
from bottle import Bottle, request, template, redirect
from src.controller.post import PostController
from src.controller.department import DepartmentController
from lib.util import toClass

app = Bottle()

@app.post("/all")		
def posts():
	rsPosts = PostController.getPosts()
	dPosts = dict([('page',1), ('rows',[rPost.toCells(["name", "department"]) for rPost in rsPosts])])
	dPosts.update(total=len(dPosts['rows']))
	return dPosts

@app.route("/view/<id>")
def view_post(id):
	try:
		rsDepts = DepartmentController.getDepartments()
		rsPost = PostController.getPost(int(id))
		dPost = rsPost.toRow()
		dPost.update([('depts',[rDept.toRows(['name']) for rDept in rsDepts])])
		return dPost
	except TypeError:
		return None

@app.route("/depts")
def post_depts():
	rsDepts = DepartmentController.getDepartments()
	return {"depts":[rDept.toRows(['name']) for rDept in rsDepts]}

		
@app.post("/update")
def update_post():
	if PostController.updatePost(toClass(request.forms.dict)):
		return {"success":True}
	else:
		return {"success":False}

@app.post("/add")
def add_post():
	if PostController.addPost(toClass(request.forms.dict)):
		return {"success":True}
	else:
		return {"success":False}

@app.delete("/delete/<id>")
def delete_post(id):
	if PostController.deletePost(id):
		return {"success":True}
	else:
		return {"success":False}