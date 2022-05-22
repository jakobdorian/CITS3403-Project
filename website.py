from app import app, db
from app.models import User, Score, Puzzle

#Registers a dictionary of items returned in the shell session 
#Can work with database entities without having to import them
@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User' : User, 'Score': Score, 'Puzzle' : Puzzle}