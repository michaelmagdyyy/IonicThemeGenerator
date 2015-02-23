"""
Definition of views.
"""

from django.shortcuts import render
from django.http import HttpRequest
from django.http import HttpResponse
from django.template import RequestContext
from datetime import datetime
import sass

def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/index.html',
        context_instance = RequestContext(request,
        {
            'title':'Home Page',
            'year':datetime.now().year,
        })
    )

def process(request):
    return HttpResponse(sass.compile(filename='C:/Workspaces2/IonicThemeGenerator/IonicThemeGenerator/app/static/temp/ionic.scss'))
