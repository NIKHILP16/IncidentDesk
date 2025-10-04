from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Incident, Comment
from .serializers import IncidentSerializer, IncidentListSerializer, CommentSerializer

class IncidentViewSet(viewsets.ModelViewSet):
    # Set to IncidentListSerializer for list, and IncidentSerializer for retrieve/create/update
    def get_serializer_class(self):
        if self.action == 'list':
            return IncidentListSerializer
        return IncidentSerializer

    queryset = Incident.objects.all().order_by('-created_at')
    
    # Filtering (status, severity) and Search (title, description)
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['status', 'severity']
    search_fields = ['title', 'description']
    
    # Pagination is enabled globally via settings.py (not shown, but assumed)

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer

    def get_queryset(self):
        # Ensure comments are scoped to the parent incident
        incident_pk = self.kwargs.get('incident_pk')
        return Comment.objects.filter(incident_id=incident_pk).order_by('-created_at')

    def perform_create(self, serializer):
        # Automatically link the comment to the incident
        incident = Incident.objects.get(pk=self.kwargs.get('incident_pk'))
        serializer.save(incident=incident)