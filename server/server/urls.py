# server/urls.py
from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('polls/', include('polls.urls')),
    path('', RedirectView.as_view(url='/polls/')),  # Redirect root to polls
]