import sys, bottle 
from bottle import Bottle, request, response, template, redirect
from src.controller.login import LoginController


app = Bottle()

@app.route("/check")
def check():
	username = request.get_cookie("username")
	if username:
		return {"msg":"loggedin"}
	else:
		return {'msg':'loggedout'}

@app.post("/login")
def auth():
	uname = request.forms.get("uname")
	pword = request.forms.get("pword")

	user = LoginController.getUser(uname,pword)
	if user.uname:
		response.set_cookie('username', uname)
		return {'msg':'Succeded'}
	else: 
		return {'msg':'Failure'}

@app.route("/logout")
def logout():
	response.delete_cookie("username")
	return {'msg':'Succeded'}
		