from django.shortcuts import render
from rest_framework.views import APIView
import itertools
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from accounts.serializer import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, viewsets
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.conf import settings
import jwt
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.http import HttpResponsePermanentRedirect
from django.shortcuts import get_object_or_404
from rest_framework.renderers import JSONRenderer
from datetime import datetime
import os
# Create your views here.


class CustomRedirect(HttpResponsePermanentRedirect):

    allowed_schemes = [os.environ.get('APP_SCHEME'), 'http', 'https']


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        # user = User.objects.get(username=user_data['username'])
        # user = User.objects.get(username='levllim07@gmail.com')
        # current_site = get_current_site(request).domain
        # relativeLink = reverse('email-verify')
        # absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
        return Response(user_data, status=status.HTTP_201_CREATED)


class VerifyEmail(generics.GenericAPIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms='HS256')
            user = User.objects.get(id=payload['user_id'])
            if user.is_staff == '0':
                user.is_verified == '1'
                user.save()
            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


# class CombinedDetailView(APIView):
#     permission_classes = (AllowAny,)

#     def get(self, request, *args, **kwargs):
#         model1_instances = Original_Documents.objects.filter(user_id=kwargs['user_id'])
#         model1_data_serializer = Model1Serializer(model1_instances, many=True)
#         model2_instances = Document_Images.objects.filter(document__in=model1_instances)
#         model2_data_serializer = Model2Serializer(model2_instances, many=True)
#         combined_data = {
#             'data': model1_data_serializer.data + model2_data_serializer.data
#         }
#         return Response(combined_data)


# class CombinedDetailView(APIView):
#     permission_classes = (AllowAny,)

#     def get(self, request, *args, **kwargs):
#         model1_instances = Original_Documents.objects.filter(
#             user_id=kwargs['user_id'])
#         model1_data_serializer = Model1Serializer(model1_instances, many=True)
#         model2_instances = Document_Images.objects.filter(
#             document__in=model1_instances)
#         model2_data_serializer = Model2Serializer(model2_instances, many=True)

#         combined_data = {}

#         # group the serialized data by document_id
#         model1_data_grouped = itertools.groupby(
#             model1_data_serializer.data, key=lambda x: x['document_id'])
#         for document_id, group in model1_data_grouped:
#             combined_data[document_id] = {
#                 'data': list(group),
#             }

#         # group the serialized data by document_id
#         model2_data_grouped = itertools.groupby(
#             model2_data_serializer.data, key=lambda x: x['document_id'])
#         for document_id, group in model2_data_grouped:
#             if document_id in combined_data:
#                 combined_data[document_id]['data'].extend(list(group))

#         return Response(list(combined_data.values()))






@api_view(['GET', 'POST'])
def getRoutes(request):
    routes = [
        '/accounts/token/',
        '/accounts/register/',
        '/accounts/token/refresh',
    ]
    return Response(routes)
