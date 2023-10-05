import requests
import json
from flask import current_app as app
from flask import session

def get_data_notifikasi():
    response = requests.request (
        method="GET", 
        url=app.config['BACKEND_URL'] + '/notifikasi/', 
        headers={"Authorization" : f"Bearer {session['user']['access_token'] }"}, 
    )
    data_notifikasi = response.json().get('data')
    # praproses data 
    for data in data_notifikasi:
        data['isi_notifikasi'] = json.loads(data['isi_notifikasi'])
    
    return data_notifikasi