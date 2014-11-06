from src.model import PayDetails, Benefit
from src.controller.benefit import BenefitController
from src.controller.payroll import PayrollController
from src.controller.employee import EmployeeController
from lib.util import toClass

from google.appengine.ext import db
from bottle import Bottle, request, template, redirect
		
app = Bottle();

@app.route("/details/<id>")
def payroll_details(id):
	rsPayDetails = PayrollController.getPayrollsByEmployee(int(id))#employeeId
	dPayDetails = [rPayDetails.toRows() for rPayDetails in rsPayDetails]
	return max(dPayDetails) #get last record
		