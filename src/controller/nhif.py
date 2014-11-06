from src.model import Nhif

from google.appengine.ext import db

class NhifController:
	@staticmethod
	def getRates():
		rates = Nhif.all()
		rates.order("lbound")
		return rates
	
	@staticmethod
	def getRate(id):
		rate = Nhif.get_by_id(id)
		return rate
		
	@staticmethod
	def deleteRate(id):
		rate = NhifController.getRate(int(id))
		if rate:
			rate.delete()
			
			return True
		else: return False
		
	@staticmethod
	def updateRate(urate=None):
		if urate is not None:
			try:
				orate = NhifController.getRate(int(urate.id))
				orate.lbound = float(urate.lbound)
				orate.ubound = float(urate.ubound)
				orate.amount = float(urate.amount)
				orate.put()
				
				return True
			except db.TransactionFailedError:
				return False
		else:
			return False
	
	@staticmethod	
	def addRate(arate=None):
		if arate is not None:
			try:
				nrate = Nhif(lbound = float(arate.lbound),
							ubound = float(arate.ubound),
							amount = float(arate.amount))
				nrate.put()
				
				return True
			except db.TransactionFailedError:
				return False
		else:
			return False