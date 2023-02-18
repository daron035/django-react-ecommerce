from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from rest_framework import generics, viewsets
from django.utils import timezone
from django.http import Http404
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.generics import RetrieveAPIView

from .serializers import ItemSerializer, OrderSerializer, ItemDetailSerializer
from .models import (
    Item,
    OrderItem,
    Order,
    Coupon,
    UserProfile,
    Variation,
    ItemVariation,
)


class ItemListView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


class ItemDetailView(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = ItemDetailSerializer
    queryset = Item.objects.all()


class AddToCartView(APIView):
    def post(self, request, *args, **kwargs):
        slug = request.data.get("slug", None)
        variations = request.data.get("variations", [])
        print(variations)
        if slug is None:
            return Response({"message": "Invalid request"}, status=HTTP_400_BAD_REQUEST)

        item = get_object_or_404(Item, slug=slug)

        minimum_variation_count = Variation.objects.filter(item=item).count()
        if len(variations) < minimum_variation_count:
            return Response(
                {"message": "Please specify the required variations"},
                status=HTTP_400_BAD_REQUEST,
            )

        order_item_qs = OrderItem.objects.filter(
            item=item, user=request.user, ordered=False
        )
        for v in variations:  # [1,4]
            order_item_qs = order_item_qs.filter(Q(item_variations__exact=v))

        if order_item_qs.exists():
            order_item = order_item_qs.first()
            order_item.quantity += 1
            order_item.save()
        else:
            order_item = OrderItem.objects.create(
                item=item, user=request.user, ordered=False
            )
            order_item.item_variations.add(*variations)  # [1,4]
            order_item.save()

        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            # check if the order item is in the order
            # if order.items.filter(item__slug=item.slug).exists():
            #     order_item_qs.quantity += 1
            #     order_item_qs.save()
            #     return Response(status=HTTP_200_OK)
            # else:
            #     order.items.add(order_item_qs)
            #     return Response(status=HTTP_200_OK)
            if not order.items.filter(item__id=order_item.id).exists():
                order.items.add(order_item)
            return Response(status=HTTP_200_OK)
            #
        else:
            ordered_date = timezone.now()
            order = Order.objects.create(user=request.user, ordered_date=ordered_date)
            order.items.add(order_item)
            return Response(status=HTTP_200_OK)


class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        try:
            order = Order.objects.get(user=self.request.user, ordered=False)
            return order
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            # return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


class PaymentView(APIView):
    def post(self, request, *args, **kwargs):
        return Response({"OK"}, status=HTTP_200_OK)


class AddCouponView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get("code", None)
        if code is None:
            return Response(
                {"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST
            )
        order = Order.objects.get(user=self.request.user, ordered=False)
        coupon = get_object_or_404(Coupon, code=code)
        order.coupon = coupon
        order.save()
        return Response(status=HTTP_200_OK)
