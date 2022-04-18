from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('person/', GetPerson),
    path('home/', GetHome),
    path('video/', GetVideo),
    path('history/', GetHistory),
    path('message/', GetMassageBox),
]
