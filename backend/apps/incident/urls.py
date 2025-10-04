from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedSimpleRouter
from incident.views import IncidentViewSet, CommentViewSet

# Main router for incidents
router = DefaultRouter()
router.register(r'incidents', IncidentViewSet, basename='incident')

# Nested router for comments under incidents
incident_router = NestedSimpleRouter(router, r'incidents', lookup='incident')
incident_router.register(r'comments', CommentViewSet, basename='incident-comments')

# Final urlpatterns
urlpatterns = [
    path('', include(router.urls)),
    path('', include(incident_router.urls)),
]
