from flask import current_app as app
import requests
from flask import session

def get_portofolio(id=None):
    if id == None:
        url = app.config['BACKEND_URL'] + '/portofolio/unapproved'
    else:
        url = app.config['BACKEND_URL'] + f'/portofolio/unapproved/id/{id}'
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

