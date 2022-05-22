from app import db, login
from datetime import date
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

#Database entry for Users
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    user_stats = db.relationship('Score', backref='user', lazy=True)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    @login.user_loader
    def load_user(id):
        return User.query.get(int(id))

#Database entries for Scores
class Score(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_score = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    
    today = date.today()
    format_date = today.strftime("%b-%d-%Y") #strips minutes, formats the date eg May-16-2022
    date = db.Column(db.String, default=format_date)
    
#Database entries for puzzle   
class Puzzle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    puzzle01 = db.Column(db.String(64))
    puzzle02 = db.Column(db.String(64))
    puzzle03 = db.Column(db.String(64))
    date = db.Column(db.String)
    
