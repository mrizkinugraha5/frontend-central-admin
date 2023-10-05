from flask import current_app as app
from flask import Blueprint, render_template, request, make_response, session, redirect, url_for
import json
import requests
from .utilities import get_portofolio

# inisiasi bluprint
Sertifikat = Blueprint (
    name='Sertifikat', 
    import_name=__name__,   
    url_prefix='/sertifikat',
    template_folder='../../../templates/pages/Dashboard/Sertifikat'
)

@Sertifikat.get('/')
def index():
    data = dict()
    #data['portofolio'] = get_portofolio()
    return render_template (
        title="Dashboard | Sertifikat",
        template_name_or_list='sertifikat.html',
        active='Dashboard.Sertifikat.index',
        navigation=app.config['navigation'],
        data=data,
    )

