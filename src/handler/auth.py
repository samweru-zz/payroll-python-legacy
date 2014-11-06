import sys, bottle 

from bottle import Bottle, request, template, redirect, session
from src.controller.login import LoginController

app = Bottle()

@app.route("/check")
def check():
	if session.has_key("username"):
		return {"msg":"loggedin"}
	else:
		return {'msg':'loggedout'}

@app.post("/login")
def auth():
	uname = request.forms.get("uname")
	pword = request.forms.get("pword")

	user = LoginController.getUser(uname,pword)
	if user.uname:
		session["username"] = uname
		return {'msg':'Succeded'}
	else: 
		return {'msg':'Failure'}

@app.route("/logout")
def logout():
	del session["username"]
	if session.has_key("username"):
		return {'msg':'Failure'}
	else: 
		return {'msg':'Succeded'}