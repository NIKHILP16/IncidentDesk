from rest_framework import serializers
from .models import Incident, Comment

class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

class IncidentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        # Key fields for the list view (User Story)
        fields = ('id', 'title', 'severity', 'status', 'assignee', 'created_at') 

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('incident', 'created_at')