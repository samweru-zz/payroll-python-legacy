import types

class toClass:
	def __init__(self, dictionary):
		for k, v in dictionary.items():
			if(v.__class__ is types.ListType):
				v = v[0]

			if len(k.rsplit('[]')) > 1:
				setattr(self,k.rsplit('[]')[0], str(v))
			else:
				setattr(self, k, str(v))