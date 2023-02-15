from django.urls import path

from .views import (
    AddCouponView,
    ItemListView,
    ItemDetailView,
    AddToCartView,
    OrderDetailView,
    PaymentView,
)


core_urlpatterns = [
    path("api/products/", ItemListView.as_view(), name="product-list"),
    path("api/products/<pk>/", ItemDetailView.as_view(), name="product-detail"),
    path(
        "api/add-to-cart/", AddToCartView.as_view(), name="add-to-cart"
    ),  # button "Add to cart"
    path(
        "api/order-summary/", OrderDetailView.as_view(), name="order-summary"
    ),  # fetchCart for redux
    path("api/checkout/", PaymentView.as_view(), name="checkout"),
    path("api/add-coupon/", AddCouponView.as_view(), name="add-coupon"),
]
