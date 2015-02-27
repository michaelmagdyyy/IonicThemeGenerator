"""
Definition of views.
"""

from django.shortcuts import render
from django.http import HttpRequest
from django.http import HttpResponse
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
import json
import sass
import os
import uuid
import shutil

def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/index.html',
        context_instance = RequestContext(request,
        {
            'title':'Home Page',
            'year': datetime.now().year,
        })
    )

@csrf_exempt
def process(request):
    raw_request_body = request.body;
    variables = json.loads(raw_request_body.decode("utf-8"))['variables']

    ionic_path = write_variables_to_file(variables)

    sass_result = sass.compile(filename=ionic_path + "ionic.scss")

    file = open(ionic_path + 'output.css', 'w')
    file.writelines(sass_result)

    return HttpResponse(ionic_path.split('/')[-2])

def kitchensink(request):
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/kitchensink.html',
        context_instance = RequestContext(request,
        {
            'outputuuid': request.GET.get('q', '')
        })
    )

def write_variables_to_file(variables):
    lines = []

    id = str(uuid.uuid4())
    local_path = os.path.dirname(os.path.realpath(__file__)).replace('\\', '/')
    temp_directory = os.path.dirname(os.path.realpath(__file__)) + "/../static/temp/"
    directory = temp_directory + id + "/"

    if not os.path.exists(directory):
        os.makedirs(directory)

    for variable in variables:
        lines.append(variable['name'] + ": " + variable['value']  + " !default; \n")

    file = open(directory + '_variables.scss', 'w')
    file.writelines(lines)

    shutil.copy(temp_directory + "ionic.scss", directory + "ionic.scss")

    return directory