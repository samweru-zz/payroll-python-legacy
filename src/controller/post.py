from src.model import Post
from src.controller.department import DepartmentController

from google.appengine.ext import db

class PostController:
	@staticmethod
	def getPosts():
		posts = Post.all()
		return posts
	
	@staticmethod
	def getPost(id):
		post = Post.get_by_id(id)
		return post
		
	@staticmethod
	def deletePost(id):
		post = PostController.getPost(int(id))
		if post:
			post.delete()
			
			return True
		else: return False
		
	@staticmethod
	def updatePost(upost=None):
		if upost is not None:
			try:
				post = PostController.getPost(int(upost.id))
				post.name = upost.name
				post.descr = upost.descr
				post.department = DepartmentController.getDepartment(int(upost.dept))
				post.put()
				
				return True
			except db.TransactionFailedError:
				return False
		else:
			return False
	
	@staticmethod	
	def addPost(apost=None):
		if apost is not None:
			try:
				post = Post(name = apost.name,descr = apost.descr)
				post.department = DepartmentController.getDepartment(int(apost.dept))
				post.put()
				
				return True
			except db.TransactionFailedError:
				return False
		else:
			return False