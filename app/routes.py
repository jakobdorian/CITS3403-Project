from ftplib import B_CRLF
import json
from app import app, db
from app.forms import LoginForm, RegistrationForm
from app.models import User, Score, Puzzle
from flask import Flask, render_template, flash, redirect, url_for, request, session
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.urls import url_parse
from sqlalchemy import func, extract
import random


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
        flash('Congratulations, you are now a user!')
        #CHANGE THIS TO GO STRAIGHT TO STATS PAGE
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
        return redirect(next_page)
    return render_template('login.html', title='Sign In', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/user_stats')
def user_stats():
    if current_user.is_authenticated:
        user_id = current_user.id
        #show list of stats associated with user IF logged in  
        my_scores = Score.query.filter_by(user_id=user_id)
        return render_template('user.html', user=my_scores)
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

@app.route('/')
@app.route('/game')
def game():
    return render_template('game.html', title='Game')

@app.route('/leaderboard', methods=['GET', 'POST'])
def leaderboard():
    all_scores = Score.query.all()
    user = User.query.all()
    if current_user.is_authenticated:
        user_id = current_user.id
    
    
    return render_template('leaderboard.html', title='Leaderboard', scores=all_scores, user=user)

#db testing
@app.route('/update_puzzle/', methods = ['post'])
def update():
    temp = []
    for i in range(30):
        temp.append(i)
        
    a = random.sample(temp,10)
    b = random.sample(temp,10)
    c = random.sample(temp,10)
    
    x = json.dumps(a)
    y = json.dumps(b)
    z = json.dumps(c)
    
    puzzle = Puzzle(
        puzzle01 = x, 
        puzzle02 = y,
        puzzle03 = z
        )
    db.session.add(puzzle)
    db.session.commit()
    return  render_template('game.html', title = 'Game')

@app.route('/game', methods=['GET', 'POST'])
def results():
    all_scores = Puzzle.query.all()
    return render_template('game.html', scores=all_scores)