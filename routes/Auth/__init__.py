from flask import Blueprint, render_template, session
from flask import current_app as app
from flask import request, flash, redirect, url_for
import json
import requests

# inisiasi blueprint
Auth = Blueprint (
    name='Auth', 
    import_name=__name__,
    template_folder='../../templates/pages/Auth'
)

@Auth.before_request
def cek_session():
    if (session.get('user') != None):
        return redirect(url_for('Dashboard.index'))

@Auth.route('/')
@Auth.route('/login')
def login():
    return render_template (
        title="Login Central Admin",
        template_name_or_list='login.html',
    )

@Auth.route('/login', methods=['POST'])
def login_process():
    # mengambil data masukkan
    dataInput = request.form.to_dict()

    # request permintaan register akun baru ke api
    payload = json.dumps(dataInput)
    headers = {'Content-Type' : 'application/json'}
    response = requests.request (
        method='POST', 
        url=app.config['BACKEND_URL'] + '/admin/login',
        headers=headers,
        data=payload
    )
    
    # jika respon api tidak berhasil
    if(response.status_code == 499):
        flash (
            message=response.json().get('description'),
            category='danger'
        )
        return redirect(url_for('Auth.login'))

    if(response.status_code != 200):
        flash (
            message='Email atau Password salah',
            category='danger'
        )
        return redirect(url_for('Auth.login'))
    
    # jika berhasil, arahkan ke halaman dashboard
    else:
        print('login berhasil')
        session['user'] = response.json().get('data')
        return redirect(url_for('Auth.login'))