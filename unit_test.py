import unittest
from app import app, db
from app.models import User

class TestUserModel(unittest.TestCase):
    
    def test_new_user(self): # TESTS CREATING A NEW USER, CHECKS TO MAKE SURE HASH ISNT THE SAME AS PASSWORD
        user = User(username="tester", email="tester@gmail.com")
        user.set_password('imatest')
        self.assertTrue(user.check_password('imatest'))
        self.assertFalse(user.check_password('iamNOTatest'))
    
    def test_initialize_database(self):
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
        db.create_all()

    def test_drop_user(self):
        db.session.remove()
        db.drop_all()


if __name__ == "__main__":
    unittest.main()