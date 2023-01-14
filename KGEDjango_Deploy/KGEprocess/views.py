from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from .models import *
from rest_framework.permissions import AllowAny

# Create your views here.
# def kge_list(request):
#     data = request.data["data"]
#     if request.method == "POST":
#         print(request.data)
#         # Data(data=data).save()
#         # OCR_Queue.objects.create(data=request.data['data_id'], status=1)
#         return HttpResponse("Success")
#     if request.method == "GET":
#         records = Data.objects.all()
#     return HttpResponse("hi")

class Home(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        data = request.data["data"]
        user_id = request.data["user_id"]
        n = Data.objects.create(data=data, user_id=user_id, overall_status="Processing")
        n_id = n.data_id
        Queue.objects.create(status=1, data_id=n_id)
        return Response("Success")