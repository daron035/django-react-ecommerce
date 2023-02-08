from django.urls import path

from .views import ItemListView, AddToCartView, OrderDetailView


core_urlpatterns = [
    path("api/products/", ItemListView.as_view(), name="product-list"),
    path(
        "api/add-to-cart/", AddToCartView.as_view(), name="add-to-cart"
    ),  # button "Add to cart"
    path(
        "api/order-summary/", OrderDetailView.as_view(), name="order-summary"
    ),  # fetchCart for redux
]
