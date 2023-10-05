from flask import current_app as app
from flask import Blueprint, render_template, request, make_response, session, redirect, url_for
import json
import requests
from .utilities import get_daftar_event, get_kehadiran, get_sertifikat


# inisiasi bluprint
Event = Blueprint (
    name='Event', 
    import_name=__name__,   
    url_prefix='/event',
    template_folder='../../../templates/pages/Dashboard/Event'
)

@Event.get('/')
def index():
    data = dict()
    data['daftar_event'] = get_daftar_event()
    data['jumlah_event'] = len(data['daftar_event'])
    return render_template (
        title="Central Admin - Manajemen Event",
        template_name_or_list='daftar-event.html',
        active='Dashboard.Event.index',
        navigation=app.config['navigation'],
        data=data,
    )

@Event.get('/detail/<kode>')
def detail(kode=None):
    data = dict()
    data['event'] = get_daftar_event(kode=kode)[0]
    print(data['event'])
    return render_template (
        title=f"Central Admin - Detail Event {kode}",
        template_name_or_list='detail-event.html',
        active='Dashboard.Event.index',
        navigation=app.config['navigation'],
        data=data,
    )

@Event.get('/buat')
def buat():
    data = dict()
    return render_template (
        title=f"Central Admin - Membuat Webinar Baru",
        template_name_or_list='buat-event.html',
        active='Dashboard.Event.index',
        navigation=app.config['navigation'],
        data=data,
    )

@Event.post('/buat')
def buat_process():
    dataInput = request.json
    response = requests.request (
        method='POST',
        url=app.config['BACKEND_URL'] + '/event/',
        headers={
            'Authorization' : f'Bearer {session["user"]["access_token"]}',
            'Content-Type' : 'application/json'
        },
        data=json.dumps(dataInput)
    )
    return make_response(response.text, response.status_code)

@Event.put('/publish/<kode>')
def publish_event(kode):
    response = requests.request (
        method='PUT',
        url=app.config['BACKEND_URL'] + f'/event/publish/{kode}',
        headers={
            'Authorization' : f'Bearer {session["user"]["access_token"]}',
            'Content-Type' : 'application/json'
        },
    )
    return make_response(response.text, response.status_code)

@Event.put('/unpublish/<kode>')
def unpublish_event(kode):
    response = requests.request (
        method='PUT',
        url=app.config['BACKEND_URL'] + f'/event/unpublish/{kode}',
        headers={
            'Authorization' : f'Bearer {session["user"]["access_token"]}',
            'Content-Type' : 'application/json'
        },
    )
    return make_response(response.text, response.status_code)

@Event.delete('/delete/<kode>')
def delete_event(kode):
    print('tes delete event', kode)
    response = requests.request (
        method='DELETE',
        url=app.config['BACKEND_URL'] + f'/event/kode/{kode}',
        headers={
            'Authorization' : f'Bearer {session["user"]["access_token"]}',
            'Content-Type' : 'application/json'
        },
    )
    return make_response(response.text, response.status_code)

@Event.get('/kehadiran/<kode>')
def kehadiran(kode=None):
    data = dict()
    data['kehadiran'] = get_kehadiran(kode=kode)
    return render_template (
        title=f"Central Admin - Kehadiran {kode}",
        template_name_or_list='kehadiran.html',
        active='Dashboard.Event.index',
        navigation=app.config['navigation'],
        data=data['kehadiran'],
    )

@Event.get('/sertifikat/<id>')
def sertifikat(id=None):
    data = dict()
    data['sertifikat'] = get_sertifikat(id=id)
    return render_template (
        title=f"Central Admin - Kehadiran {id}",
        template_name_or_list='kehadiran.html',
        active='Dashboard.Event.index',
        navigation=app.config['navigation'],
        data=data['kehadiran'],
    )