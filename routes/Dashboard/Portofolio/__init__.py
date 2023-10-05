from flask import current_app as app
from flask import Blueprint, render_template, request, make_response, session, redirect, url_for
import json
import requests
from .utilities import get_portofolio

# inisiasi bluprint
Portofolio = Blueprint (
    name='Portofolio', 
    import_name=__name__,   
    url_prefix='/portofolio',
    template_folder='../../../templates/pages/Dashboard/Portofolio'
)

@Portofolio.get('/')
def index():
    data = dict()
    data['portofolio'] = get_portofolio()
    return render_template (
        title="Dashboard | Portofolio",
        template_name_or_list='portofolio.html',
        active='Dashboard.Portofolio.index',
        navigation=app.config['navigation'],
        data=data['portofolio'],
    )

@Portofolio.get('/detail/<id>')
def detail(id=None):
    data = dict()
    data['portofolio'] = get_portofolio(id=id)
    #print(data['portofolio'])
    return render_template (
        title="Central Admin - Detail Portofolio",
        template_name_or_list='detail-portofolio.html',
        active='Dashboard.Portofolio.index',
        navigation=app.config['navigation'],
        data=data['portofolio'],
    )

@Portofolio.put('/approve/<id>')
def approve_portofolio(id):
    response = requests.request (
        method='PUT',
        url=app.config['BACKEND_URL'] + f'/portofolio/approve/{id}',
        headers={
            'Authorization' : f'Bearer {session["user"]["access_token"]}',
            'Content-Type' : 'application/json'
        },
    )
    return make_response(response.text, response.status_code)

