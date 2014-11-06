from google.appengine.api import memcache

import Cookie
import random

class Session(object):
    def __init__(self):
        self.cookie = Cookie.SimpleCookie()
        try:
            self.session = memcache.get(self.cookie["sess-id"].value)
        except KeyError:
            self.sess_id = "app-id-" + str(random.random())[5:] + str(random.random())[5:]
            self.sess_exp = 24*60*60

            self.cookie["sess-id"] = self.sess_id     
            self.cookie["sess-id"]['path'] = "/sess-id"
            self.cookie["sess-id"]["expires"] = self.sess_exp

            self.session = {"sess-id":self.sess_id}
            memcache.add(self.sess_id, self.session, self.sess_exp)

    def __update_cache(self):
        memcache.replace(self.sess_id, self.session, self.sess_exp)

    def set(self, key, value):
        self.session[key] = value
        self.__update_cache()

    def get(self, key):
        return self.session[key]

    def remove(self, key):
        if(self.contains(key)):
            del self.session[key]
            self.__update_cache()

    def contains(self, key):
        return self.session.has_key(key)

            
       