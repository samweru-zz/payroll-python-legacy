import sys, bottle 

from session import Session
from bottle import Bottle
from bottle import request, template, redirect
from src.controller.login import LoginController

app = Bottle()
sess = Session()

@app.route("/check")
def check():
	if(sess.contains("username")):
		return {"msg":"loggedin"}
	else:
		return {'msg':'loggedout'}

@app.post("/login")
def auth():
	uname = request.forms.get("uname")
	pword = request.forms.get("pword")

	user = LoginController.getUser(uname,pword)
	if user.uname:
		sess.set("username", uname)
		return {'msg':'Succeded'}
	else: 
		return {'msg':'Failure'}

@app.route("/logout")
def logout():
	sess.remove("username")
	if sess.contains("username"):
		return {'msg':'Failure'}
	else: 
		return {'msg':'Succeded'}