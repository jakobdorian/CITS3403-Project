# CITS3403 Project
## Memory Flash
A memory game to improve and test concentration.
## Group Members:
- Jakob Kuriata (23278189)
- Mandeal Chen Jan Tan (22647372)
- Elisha Anstiss (22241944)
- Jason Dam (21713758)
## About this project:
This application was built using Flask with the purpose of testing a users memory concentration. Users will be challenged with remembering a pattern of blocks that they must click in order to recieve a score that will be uploaded to the leaderboard if that user is logged in.
# How to build the application
## Make sure you have python installed.
```
python3
```
## Create a virtual environment with this command
```
python3 -m venv venv
```
## Create a virtual environment with this command (WINDOWS)
```
py -m venv venv
```
## Once your in the web directory run this command (MAC or LINUX)
```
source venv/bin/activate
```
### Once your in the web directory run this command (WINDOWS)
```
venv\Scripts\activate
```
## Once in the virtual environment run this command
```
pip install -r requirements.txt
```
## Finally, run the application with this command
```
flask run
```
The application will now be running at http://localhost:5000/
## (Optionally), run unit testing with this command
```
python3 unit_test.py
```
