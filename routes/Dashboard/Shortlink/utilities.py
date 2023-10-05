from flask import current_app as app
import requests
from flask import session

def get_shortlink():
    url = app.config['BACKEND_URL'] + f'/s/'
    #print(kode)
    response = requests.request(
        method='GET',
        url=url,
        headers={
            'Authorization' : f'Bearer {session["user"]["access_token"]}'
        }
    )
    if response.status_code == 200:
        return response.json().get('data')
    else:
        return []

