from django.http import HttpResponse
from .edit import edit

# Create your views here.
def index(req, imgurl):
    edit(imgurl)
    return HttpResponse(imgurl)