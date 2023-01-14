from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.Home.as_view()),
    path('history<id>', views.History.as_view())
]
