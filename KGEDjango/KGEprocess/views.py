from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import status
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
        if "delete" in request.data:
            Data.objects.filter(pk=request.data['data_id']).delete()
            return Response("", status=status.HTTP_204_NO_CONTENT)
        data = request.data["data"]
        user_id = request.data["user_id"]
        n = Data.objects.create(data=data, user_id=user_id, overall_status="Processing")
        n_id = n.data_id
        Queue.objects.create(status=1, data_id=n_id)
        return Response("Success")

    def get(self, request):
        user_id = request.query_params['user_id']
        output = [{"id": output.data_id,
                    "date": output.date.strftime("%Y-%m-%d %H:%M"),
                    "title": output.title,
                    "text": output.data,
                    "status": output.overall_status}
                    for output in Data.objects.filter(user_id=user_id)]
        return Response(output)

class History(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, id):
        output = [{"id": output.data_id,
                    "date": output.date.strftime("%Y-%m-%d %H:%M"),
                    "title": output.title,
                    "text": output.data,
                    "text_json": output.data_json,
                    "status": output.overall_status}
                    for output in Data.objects.filter(data_id=id)]
        return Response(output)