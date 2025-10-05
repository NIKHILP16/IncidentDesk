import pytest
from django.urls import reverse
from rest_framework import status
from datetime import datetime
from incident.models import Incident, Comment 

@pytest.fixture
def base_incident(db):
    """Create a base incident for testing detail and update operations."""
    return Incident.objects.create(
        title='Base Test Incident',
        description='This is a description for testing.',
        severity='P1',
        status='NEW',
        assignee='user1',
        created_at=datetime.now()
    )


@pytest.mark.django_db
class TestIncidentAPI:

    def test_create_incident_success(self, client):
        list_url = reverse('incident-list')
        data = {
            'title': 'New Incident Report',
            'description': 'The critical service is down.',
            'severity': 'P0',
        }
        response = client.post(list_url, data, format='json')

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['title'] == data['title']
        assert response.data['severity'] == data['severity']
        assert response.data['status'] == 'NEW' 

    def test_retrieve_incident_detail_success(self, client, base_incident):
        """Retrieve details of a single incident."""
        detail_url = reverse('incident-detail', args=[base_incident.id])
        response = client.get(detail_url)

        assert response.status_code == status.HTTP_200_OK
        assert response.data['title'] == base_incident.title
        assert response.data['severity'] == base_incident.severity
        assert response.data['status'] == base_incident.status

    def test_patch_incident_status_update(self, client, base_incident):
        """Partial update of the status field."""
        detail_url = reverse('incident-detail', args=[base_incident.id])
        update_data = {'status': 'IN_PROGRESS'}

        response = client.patch(detail_url, data=update_data, content_type='application/json')

        assert response.status_code == status.HTTP_200_OK
        assert response.data['status'] == 'IN_PROGRESS'
        assert response.data['title'] == base_incident.title

    def test_list_incidents_with_status_filter(self, client, base_incident):
        """List incidents filtered by status."""
        list_url = reverse('incident-list')
        Incident.objects.create(
            title='Resolved Incident',
            description='This one is done.',
            severity='P2',
            status='RESOLVED',
            assignee='user2',
            created_at=datetime.now()
        )

        # Filter for RESOLVED
        response = client.get(list_url, {'status': 'RESOLVED'})
        assert response.status_code == status.HTTP_200_OK
        assert response.data['count'] == 1
        assert response.data['results'][0]['status'] == 'RESOLVED'

        # Filter for NEW
        response = client.get(list_url, {'status': 'NEW'})
        assert response.status_code == status.HTTP_200_OK
        assert response.data['count'] == 1
        assert response.data['results'][0]['title'] == base_incident.title


@pytest.mark.django_db
class TestCommentAPI:
    """Test suite for Comment API endpoints."""

    @pytest.fixture
    def incident_setup(self, db):
        """Create an incident and return it with comments list URL."""
        incident = Incident.objects.create(
            title='Comment Test Target',
            description='Test incident for comments.',
            severity='P3',
            status='NEW',
            assignee=None,
            created_at=datetime.now()
        )
        comments_url = reverse('incident-comments-list', args=[incident.id])
        return incident, comments_url

    def test_create_comment_success(self, client, incident_setup):
        """Create a new comment on an incident."""
        incident, comments_url = incident_setup
        data = {
            'content': 'This is a new comment from the test client.',
            'author': 'TestUser'
        }

        response = client.post(comments_url, data, format='json')

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['content'] == data['content']
        assert response.data['author'] == data['author']
        assert response.data['incident'] == incident.id

    def test_list_comments_for_incident(self, client, incident_setup):
        """Retrieve all comments for a specific incident."""
        incident, comments_url = incident_setup

        # Create comments for the incident
        Comment.objects.create(
            incident=incident,
            content="First comment.",
            author="A",
            created_at=datetime.now()
        )
        Comment.objects.create(
            incident=incident,
            content="Second comment.",
            author="B",
            created_at=datetime.now()
        )

        response = client.get(comments_url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['count'] == 2
        assert len(response.data['results']) == 2
