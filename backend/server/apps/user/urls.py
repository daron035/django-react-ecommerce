from django.urls import include, path

user_urlpatterns = [
    path("api/auth/", include("djoser.urls")),
    path("api/auth/", include("djoser.urls.jwt")),
]
