from src.model import Relief

from google.appengine.ext import db

class ReliefController:
	@staticmethod
	def getRates():
		rates = Relief.all()
		return rates
	
	@staticmethod
	def getRate(id):
		rate = Relief.get_by_id(id)
		return rate
		
	@staticmethod
	def deleteRate(id):
		rate = ReliefController.getRate(int(id))
		if rate:
			rate.delete()
			
			return True
		else: return False
		
	@staticmethod
	def updateRate(urate=None):
		if urate is not None:
			try:
				orate = ReliefController.getRate(int(urate.id))
				orate.name = urate.name
				orate.annual = float(urate.annual)
				orate.monthly = float(urate.monthly)
				orate.active = hasattr(urate, "active")
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
				nrate = Relief(annual = float(arate.annual),
								monthly = float(arate.monthly),
								name = arate.name,
								active = hasattr(arate, "active"))
				nrate.put()
				
				return True
			except db.TransactionFailedError:
				return False
		else:
			return False