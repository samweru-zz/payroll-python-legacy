from types import *
from google.appengine.ext import db

class DictModel(db.Model):
	def toCells(self, properties=None):
		cell = [self.key().id()]
		if properties is None: properties = self.properties() 
		for p in properties:
			if type(getattr(self,p).__class__) is not TypeType:
				try:
					cell.append(getattr(self,p).name)
				except AttributeError:
					pass
			else:
				cell.append(unicode(getattr(self, p)))
			
		return dict([('id',self.key().id()),('cell',cell)])
		
	def toRow(self):
		row = dict([('id',self.key().id())])
		for p in self.properties():
			if type(getattr(self,p).__class__) is not TypeType:
				row.update([(p,getattr(self,p).name)])
			else:
				row.update([(p,unicode(getattr(self, p)))])

		return row

	def toRows(self, properties=None):
		if properties is None: properties = self.properties() 
		for p in properties:
			if type(getattr(self,p).__class__) is TypeType:
				rows = dict([(p, unicode(getattr(self, p)))])
				rows.update([('id',self.key().id())])
				
		return rows