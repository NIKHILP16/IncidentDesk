from django.contrib import admin
from .models import Incident, Comment
admin.site.register(Incident)
admin.site.register(Comment)