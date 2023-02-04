from django.urls import include, path

from .views import ItemListView

core_urlpatterns = [
    path("api/products/", ItemListView.as_view(), name="product-list"),
]
