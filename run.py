import os
from flask import Flask, render_template, url_for, session, redirect, flash, request
from dotenv import load_dotenv

load_dotenv()           # read env file
app = Flask(__name__)   # init flask app

# konfigurasi variabel global flask
app.config['BASE_URL'] = os.getenv('BASE_URL')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['BACKEND_URL'] = os.getenv('BACKEND_URL')
app.config['SESSION_TYPE'] = 'memcached'

# import navigasi
from routes.Dashboard import Navigation

# register setting navigasi dashboard
app.config['navigation'] = Navigation

# import blueprint
from routes.Dashboard import Dashboard
from routes.Auth import Auth

# register blueprint
app.register_blueprint(Dashboard)
app.register_blueprint(Auth)

# root routing
@app.route('/logout')
def logout():
    if (session.get('user') != None):
        session.pop('user')
        session.clear()
        if request.args.get("message") != None:
            flash(
                message=request.args.get("message"),
                category='danger'
            )
    return redirect(url_for('Auth.login'))

@app.errorhandler(404)
def page_not_found(e):
    return render_template("layout/page_not_found.html")

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv('PORT'))