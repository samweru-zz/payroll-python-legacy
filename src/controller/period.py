from datetime import *
from src.model import Period

from google.appengine.ext import db

class PeriodController:
	@staticmethod
	def getPeriods():
		periods = Period.all()
		return periods
	
	@staticmethod
	def getPeriod(id):
		period = Period.get_by_id(id)
		return period
		
	@staticmethod
	def deletePeriod(id):
		period = PeriodController.getPeriod(int(id))
		if period:
			period.delete()
			
			return True
		else: return False
		
	@staticmethod
	def updatePeriod(uperiod=None):
		if uperiod is not None:
			try:
				period = PeriodController.getPeriod(int(uperiod.id))
				period.start = datetime.date(datetime.strptime(uperiod.start, "%Y-%m-%d"))
				period.end = datetime.date(datetime.strptime(uperiod.end, "%Y-%m-%d"))
				period.status = uperiod.status
				period.active = hasattr(uperiod, "active")
				# modified_by = uperiod.modified_by
				period.modified_at = datetime.now()
				period.put()
				
				return True
			except db.TransactionFailedError:
				return False
		else:
			return False
	
	@staticmethod	
	def addPeriod(aperiod=None):
		if aperiod is not None:
			try:
				period = Period(start = datetime.date(datetime.strptime(aperiod.start, "%Y-%m-%d")),
								end = datetime.date(datetime.strptime(aperiod.end, "%Y-%m-%d")),
								status = aperiod.status,
								active = hasattr(aperiod, "active"),
								# created_by = uperiod.created_by,
								created_at = datetime.now())
				period.put()
				
				return True
			except db.TransactionFailedError:
				return False
		else:
			return False