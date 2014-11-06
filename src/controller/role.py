from src.model import Role

class RoleController:
	@staticmethod
	def getRoles():
		roles = Role.all()
		return roles
	
	@staticmethod
	def getRole(id):
		role = Role.get_by_id(id)
		return role
	
	@staticmethod
	def deleteRole(id):
		role = RoleController.getRole(int(id))
		if role:
			role.delete()
			
			return True
		else: return False
		
	@staticmethod
	def updateRole(urole=None):
		if urole is not None:
			try:
				role = RoleController.getRole(int(urole.id))
				role.name = urole.name
				role.descr = urole.descr
				role.put()
				
				return True
			except db.TransactionFailedError:
				return False
		else:
			return False
			
	@staticmethod
	def addRole(urole=None):
		if urole is not None:
			try:
				role = Role(name=urole.name,descr=urole.descr)
				role.put()
				
				return True
			except db.TransactionFailedError:
				return False
		else:
			return False

