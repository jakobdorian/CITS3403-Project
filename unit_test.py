import unittest
from app import app, db
from app.models import User, Score, Puzzle


class TestUserModel(unittest.TestCase):
    
    def test_new_user(self): #Testing creating a new user, checks to make sure hash isn't the same as password
        user = User(username="tester", email="tester@gmail.com")
        user.set_password('imatest')
        self.assertTrue(user.check_password('imatest'))
        self.assertFalse(user.check_password('iamNOTatest'))
    
    def test_initialize_database(self): #Tests creating a database
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
        db.create_all()

    # def test_drop_user(self): # TESTS DROPPING ALL TABLES FOR A USER
    #     db.session.remove()
    #     db.drop_all()

class TestGameModel(unittest.TestCase):
    def test_initialize_database(self): #Tests creating a database
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
        db.create_all()   

    def test_new_score(self):
        user = User(username="tester2", email="tester2@gmail.com", id=111)
        user.set_password('imatest')
        score = Score(user_id=111, user_score = float(80))
        self.assertTrue(score.user_score > float(0)) #Test to ensure score is bigger than 0
        db.session.add(score)
        db.session.commit()
    
    def test_new_puzzle(self):
        puzzle = Puzzle(id=2, puzzle01 = "26, 2, 6, 21, 25, 1, 22, 27, 16, 23", puzzle02 = "10, 2, 3, 4, 20, 6, 7, 8, 9, 10", puzzle03 = "11, 2, 3, 4, 15, 6, 17, 8, 9, 10")
        db.session.add(puzzle)
        db.session.commit()

    # def test_drop_user(self): # TESTS DROPPING ALL TABLES
    #     db.session.remove()
    #     db.drop_all()

class TestTypicalUserScenario(unittest.TestCase):
    def test_initialize_database(self): # DATABASE IS CREATED 
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
        db.create_all()
    
    def test_new_user(self): #User creates an account
        user = User(username="tester", email="tester@gmail.com", id=111)
        user.set_password('imatest')
        self.assertTrue(user.check_password('imatest'))
        self.assertFalse(user.check_password('iamNOTatest'))
    
    def test_new_puzzle(self): #Add a new puzzle
        puzzle = Puzzle(id=6, puzzle01 = "24, 2, 6, 21, 23, 1, 22, 27, 16, 23", puzzle02 = "1, 12, 3, 4, 20, 6, 7, 8, 9, 10", puzzle03 = "11, 12, 3, 4, 15, 6, 17, 8, 19, 1")
        db.session.add(puzzle)
        db.session.commit()
     
    def test_new_score(self): #User submits a score
        score = Score(user_id=111, user_score = float(80))
        db.session.add(score)
        db.session.commit()
    
    def test_drop_user(self): #Tests dropping all tables
        db.session.remove()

if __name__ == "__main__":
    unittest.main()