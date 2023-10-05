from flask import current_app as app
from flask import Blueprint, render_template, request, make_response, session, redirect, url_for
import json
import requests
from .utilities import get_shortlink


# inisiasi bluprint
Shortlink = Blueprint (
    name='Shortlink', 
    import_name=__name__,   
    url_prefix='/shortlink',
    template_folder='../../../templates/pages/Dashboard/Shortlink'
)

@Shortlink.get('/')
def index():
    data = dict()
    data['shortlink'] = get_shortlink()
    #print(data)
    i = 1
    for x in data['shortlink']:
        print(x)
        x['nomor'] = i
        i=i+1
    print(data['shortlink'])
    #data['portofolio'] = get_portofolio()
    return render_template (
        title="Dashboard | Shortlink",
        template_name_or_list='shortlink.html',
        active='Dashboard.Shortlink.index',
        navigation=app.config['navigation'],
        data=data,
    )

@Shortlink.get('/buat')
def buat():
    data = dict()
    return render_template (
        title=f"Central Admin - Membuat Shortlink",
        template_name_or_list='buat_shortlink.html',
        active='Dashboard.Shortlink.index',
        navigation=app.config['navigation'],
        data=data,
    )

@Shortlink.post('/buat')
def buat_shortlink():
    dataInput = request.json
    response = requests.request (
        method='POST',
        url=app.config['BACKEND_URL'] + '/s/',
        headers={
            'Authorization' : f'Bearer {session["user"]["access_token"]}',
            'Content-Type' : 'application/json'
        },
        data=json.dumps(dataInput)
    )
    return make_response(response.text, response.status_code)




