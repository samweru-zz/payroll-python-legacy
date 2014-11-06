import sys, bottle 
from bottle import Bottle
from bottle import request, template, redirect
from session import Session

from src.handler import auth
from src.handler import employee
from src.handler import role
from src.handler import user
from src.handler import post
from src.handler import department
from src.handler import benefit
from src.handler import payroll
from src.handler import paye
from src.handler import nhif
from src.handler import relief

from fix.datastore import Datastore

bottle.DEBUG = True

sess = Session()

app = Bottle()
app.mount("/auth", auth.app)
app.mount("/employee", employee.app)
app.mount("/role", role.app)
app.mount("/user", user.app)
app.mount("/post", post.app)
app.mount("/dept", department.app)
app.mount("/benefit", benefit.app)
app.mount("/payroll", payroll.app)
app.mount("/paye", paye.app)
app.mount("/nhif", nhif.app)
app.mount("/relief", relief.app)

@app.route('/')
def index():
	redirect("/web/index.html")

@app.route("/db/populate")
def populate():
	Datastore.populate()

@app.route("/db/truncate")
def populate():
	Datastore.truncate()
		
@app.error(404)
def error_404(error):
    """Return a custom 404 error."""
    return 'Sorry, nothing at this URL.'