from flask import Blueprint, render_template, session, redirect, url_for, make_response, request, flash
from flask import current_app as app
import requests

# inisiasi blueprint
Dashboard = Blueprint (
    name='Dashboard', 
    import_name=__name__,
    url_prefix='/dashboard',
    template_folder='../../templates/pages/Dashboard'
)

@Dashboard.before_request
def cek_session():
    if session.get('user') == None:
        return redirect(url_for('Auth.login'))
    else:
        # Cek apakah token masih berlaku
        response = requests.request (
            method='GET',
            url=app.config['BACKEND_URL'] + '/event/',
            headers={"Authorization" : f"Bearer {session['user']['access_token']}"}
        )
        if response.status_code == 401:
            return redirect(url_for("logout", message="Sesi login anda telah habis silahkan login ulang"))

@Dashboard.get('/')
def index():
    data = dict()
    # data['statistik'] = get_toko_statistic()
    return render_template (
        title="Dashboard",
        template_name_or_list='dashboard.html',
        active='Dashboard.index',
        navigation=app.config['navigation'],
        data=data
    )

# import navigation
from .__navigation__ import Navigation

# import child blueprint
from .Event import Event
from .Portofolio import Portofolio
from .Shortlink import Shortlink
from .Sertifikat import Sertifikat

# register child blueprint
Dashboard.register_blueprint(Event)
Dashboard.register_blueprint(Portofolio)
Dashboard.register_blueprint(Shortlink)
Dashboard.register_blueprint(Sertifikat)