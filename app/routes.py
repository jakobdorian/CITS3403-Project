from ftplib import B_CRLF
import json

#from requests import JSONDecodeError
from app import app, db
from app.forms import LoginForm, RegistrationForm
from app.models import User, Score, Puzzle
from flask import Flask, render_template, redirect, url_for, request, session, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.urls import url_parse
from sqlalchemy import func, extract
import random
import sqlite3
import datetime

#Creates Home Page
@app.route('/')
@app.route('/home')
def index():
    return render_template('home.html', title = 'Home')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)

#Creates Login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            error = 'Invalid username or password'
            return render_template('login.html', title='Sign In', form=form, error=error)
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)
    return render_template('login.html', title='Sign In', form=form)

#Creates Logout page
@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

#Creates User stats page
@app.route('/user_stats')
def user_stats():
    if current_user.is_authenticated: #Show list of stats associated with user IF logged in  
        user_id = current_user.id
        my_scores = Score.query.filter_by(user_id=user_id)
        return render_template('user.html', user=my_scores, title="Profile")
    return render_template('user.html', title='Profile')

#Register score into the database
@app.route('/register_stats', methods=['POST'])
def register_stats(): 
    output = request.get_json()
    finalscore = json.loads(output)
    scores = Score(
        user_id= current_user.id,
        user_score = float(finalscore)
    )
    db.session.add(scores)
    db.session.commit()
    return redirect(url_for('user_stats'))

@app.route('/game')
def game():
    allPuzzles = Puzzle.query.all()
    return render_template('game.html', title='Game', puzzles = allPuzzles)

#Creates Leaderboard page
@app.route('/leaderboard', methods=['GET', 'POST'])
def leaderboard():
    all_scores = Score.query.all()
    user = User.query.all()
    if current_user.is_authenticated:
        user_name = current_user.username
        return render_template('leaderboard.html', title='Leaderboard', scores=all_scores, user_name=user_name)
    return render_template('leaderboard.html', title='Leaderboard', scores=all_scores)

#DB testing
@app.route('/update_puzzle', methods = ['post'])
def update():
    temp01 = request.get_json()
    temp02 = json.loads(temp01)
    
    pattern01 = json.dumps(temp02[0])
    pattern02 = json.dumps(temp02[1])
    pattern03 = json.dumps(temp02[2])
    
    puzzle = Puzzle(
        puzzle01 = pattern01,
        puzzle02 = pattern02,
        puzzle03 = pattern03,
    )
    
    db.session.add(puzzle)
    db.session.commit()
    
    return  render_template('game.html', title = 'Game')

#Creates Admin Page
@app.route('/admin')
@login_required
def admin():
    id = current_user.id
    if id == 4:
        all_puzzles = Puzzle.query.all()
        return render_template('admin.html', title='Admin', puzzles = all_puzzles)
    else:
        return redirect(url_for('index'))


#Update date column in Puzzle
@app.route('/updateDate', methods = ['post'])
def updatingDate():
    
    temp01 = request.get_json()
    temp02 = json.loads(temp01)
    
    selectedId = temp02[0]
    newDate = temp02[1]
   
    row = Puzzle.query.get(selectedId)
    row.date = newDate
    
    db.session.commit()
   
    return render_template('admin.html', title = 'Admin')

#Delete row in Puzzle
@app.route('/delRow', methods = ['post'])
def delRow():
    
    temp = request.get_json()
    selectedId = json.loads(temp)
    
    row = Puzzle.query.get(selectedId)
    db.session.delete(row)
    db.session.commit()
    
    return render_template('admin.html', title = 'Admin')

    
@app.route('/test', methods = ['GET'])
def testfn():
    if request.method == 'GET':
        patternList = []        
        tempDate = datetime.datetime.today().strftime ('%d%m%Y')
        finalDate = tempDate[0:2] + '/' + tempDate[2:4]  + '/' + tempDate[4:8]
        
        Puzzles = Puzzle.query.all()
        for puzzle in Puzzles:
            if (puzzle.date == finalDate): #matching based on todays date
                patternList.append(puzzle.puzzle01)
                patternList.append(puzzle.puzzle02)
                patternList.append(puzzle.puzzle03)
                
                jsThings = {'patterns': patternList}
                message = {'greeting':'Hello from Flask!'}
                return jsonify(message)  # serialize and use JSON headers
                #return render_template('game.js', title = 'Game', jsThings = jsThings)
                #return jsonify(jsThings)  # serialize and use JSON headers
