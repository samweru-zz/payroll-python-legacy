from src.model import Department

class DepartmentController:
	@staticmethod
	def getDepartments():
		departments = Department.all()
		return departments
		
	@staticmethod
	def getDepartment(id):
		department = Department.get_by_id(id)
		return department
		
	@staticmethod
	def deleteDepartment(id):
		department = DepartmentController.getDepartment(int(id))
		if department:
			department.delete()
			
			return True
		else: return False
		
	@staticmethod
	def updateDepartment(udept=None):
		if udept is not None:
			try:
				dept = DepartmentController.getDepartment(int(udept.id))
				dept.name = udept.name
				dept.descr = udept.descr
				dept.put()
				
				return True
			except db.TransactionFailedError:
				return False
		else:
			return False
	
	@staticmethod	
	def addDepartment(adept=None):
		if adept is not None:
			try:
				dept=Department(name=adept.name, descr=adept.descr)
				dept.put()
				
				return True
			except db.TransactionFailedError:
				return False
		else:
			return False