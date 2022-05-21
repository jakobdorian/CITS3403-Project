import unittest
from app import app, db
from app.models import User, Score


class TestUserModel(unittest.TestCase):
    
    def test_new_user(self): # TESTS CREATING A NEW USER, CHECKS TO MAKE SURE HASH ISNT THE SAME AS PASSWORD
        user = User(username="tester", email="tester@gmail.com")
        user.set_password('imatest')
        self.assertTrue(user.check_password('imatest'))
        self.assertFalse(user.check_password('iamNOTatest'))
    
    def test_initialize_database(self): # TESTS CREATING A DATABASE
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
        db.create_all()

    # def test_drop_user(self): # TESTS DROPPING ALL TABLES FOR A USER
    #     db.session.remove()
    #     db.drop_all()

class TestGameModel(unittest.TestCase):
    def test_initialize_database(self): # TESTS CREATING A DATABASE
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
        db.create_all()   

    def test_new_score(self):
        user = User(username="tester2", email="tester2@gmail.com", id=111)
        user.set_password('imatest')
        score = Score(user_id=111, user_score = float(80))
        db.session.add(score)
        db.session.commit()
    
    # def test_drop_user(self): # TESTS DROPPING ALL TABLES FOR A USER
    #     db.session.remove()
    #     db.drop_all()




if __name__ == "__main__":
    unittest.main()