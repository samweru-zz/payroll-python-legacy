import sha

from src.model import User

class LoginController:
	@staticmethod
	def getUser(uname,pword):
		hpword = sha.new()
		hpword.update(pword)
		user = User.gql("WHERE uname = :username AND pword = :password",username=uname,password=hpword.hexdigest()).get()
		return user	
