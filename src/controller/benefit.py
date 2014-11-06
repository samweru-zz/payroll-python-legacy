from src.model import PayDetails, Benefit
from lib.util import toClass

from google.appengine.ext import db

class BenefitController:
	@staticmethod
	def getBenefitsList(benefitIdList):
		benefitKeyList = [Benefit.get_by_id(benefitId).key() for benefitId in benefitIdList]
		rsBenefits = Benefit.get(benefitKeyList)
		return rsBenefits
		
	@staticmethod
	def getBenefits():
		benefits = Benefit.all()
		return benefits
	
	@staticmethod
	def getBenefit(id):
		benefit = Benefit.get_by_id(id)
		return benefit
		
	@staticmethod
	def deleteBenefit(id):
		benefit = BenefitController.getBenefit(int(id))
		if benefit:
			benefit.delete()
			
			return True
		else: return False
		
	@staticmethod
	def updateBenefit(ubenefit=None):
		if ubenefit is not None:
			try:
				benefit = BenefitController.getBenefit(int(ubenefit.id))
				benefit.name = ubenefit.name
				benefit.amount = float(ubenefit.amount)
				benefit.descr = ubenefit.descr
				benefit.perc = hasattr(ubenefit, "perc")
				benefit.deduct = hasattr(ubenefit, "deduct")
				benefit.taxable = hasattr(ubenefit, "taxable")
				benefit.active = hasattr(ubenefit, "active")
				benefit.put()
				
				return True
			except db.TransactionFailedError:
				return False
		else:
			return False
	
	@staticmethod	
	def addBenefit(ubenefit=None):
		if ubenefit is not None:
			try:				
				benefit = Benefit(name = ubenefit.name,
				amount = float(ubenefit.amount),
				descr = ubenefit.descr,
				perc = hasattr(ubenefit, "perc"),
				deduct = hasattr(ubenefit, "deduct"),
				taxable = hasattr(ubenefit, "taxable"),
				active = hasattr(ubenefit, "active"))
				benefit.put()
				
				return True
			except db.TransactionFailedError:
				return False
		else:
			return False