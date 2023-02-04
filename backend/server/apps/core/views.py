from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny

from .serializers import ItemSerializer
from .models import Item


class ItemListView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
