from fix.populate import Populate
from src.model import Role, User, Department, Post, Employee, Benefit, PayDetails, PayBenefit, Paye, Nhif, Relief

from google.appengine.ext import db

class Datastore(object):
	@staticmethod
	def populate():
		Populate()

	@staticmethod
	def truncate():
		for entry in [Role, User, Department, Post, Employee, Benefit, PayDetails, PayBenefit, Paye, Nhif, Relief]:
			query = entry.all(keys_only=True)
			entries = query.fetch(1000)
			db.delete(entries)
