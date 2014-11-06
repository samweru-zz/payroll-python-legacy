from src.model import Paye

from google.appengine.ext import db

class PayeController:
	@staticmethod
	def getRates():
		rates = Paye.all()
		rates.order("rate")
		return rates
	
	@staticmethod
	def getRate(id):
		rate = Paye.get_by_id(id)
		return rate
		
	@staticmethod
	def deleteRate(id):
		rate = PayeController.getRate(int(id))
		if rate:
			rate.delete()
			
			return True
		else: return False
		
	@staticmethod
	def updateRate(urate=None):
		if urate is not None:
			try:
				orate = PayeController.getRate(int(urate.id))
				orate.albound = float(urate.albound)
				orate.aubound = float(urate.aubound)
				orate.mlbound = float(urate.mlbound)
				orate.mubound = float(urate.mubound)
				orate.rate = int(urate.rate)
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
				nrate = Paye(albound = float(arate.albound),
							aubound = float(arate.aubound),
							mlbound = float(arate.mlbound),
							mubound = float(arate.mubound),
							rate = int(arate.rate))
				nrate.put()
				
				return True
			except db.TransactionFailedError:
				return False
		else:
			return False