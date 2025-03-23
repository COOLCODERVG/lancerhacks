from django.contrib import admin
from django.urls import path
from .views import analyze_voice, analyze_emotion

urlpatterns = [
    path("admin/", admin.site.urls),
    path("analyze_voice/", analyze_voice, name="analyze_voice"),
    path("analyze_emotion/", analyze_emotion, name="analyze_emotion"),
]
