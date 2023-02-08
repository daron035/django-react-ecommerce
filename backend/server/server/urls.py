from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from apps.user.urls import user_urlpatterns
from apps.core.urls import core_urlpatterns

urlpatterns = [
    path("admin/", admin.site.urls),
]

urlpatterns += user_urlpatterns
urlpatterns += core_urlpatterns

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if not settings.DEBUG:
    urlpatterns += [
        re_path(r"^(?!api/).*", TemplateView.as_view(template_name="index.html"))
    ]
