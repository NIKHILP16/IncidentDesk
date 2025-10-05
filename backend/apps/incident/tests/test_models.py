import pytest
from incident.models import Incident, Comment
import time
from  incident.constants import STATUS_NEW, SEVERITY_P2

@pytest.mark.django_db
def test_incident_creation():
    incident = Incident.objects.create(
        title="Server Down",
        description="The main server is not responding.",
        assignee="Test"
    )

    assert incident.id is not None
    assert incident.title == "Server Down"
    assert incident.severity == SEVERITY_P2
    assert incident.status == STATUS_NEW
    assert str(incident) == f"[{STATUS_NEW}] Server Down"


@pytest.mark.django_db
def test_comment_creation_and_relationship():
    incident = Incident.objects.create(
        title="DB Lag",
        description="Database queries are slow.",
    )
    comment = Comment.objects.create(
        incident=incident,
        author="Test2",
        content="Needs investigation"
    )

    assert comment.id is not None
    assert comment.incident == incident
    assert str(comment) == f"Comment on {incident.title} by Test2"
    assert incident.comments.count() == 1
    assert incident.comments.first() == comment




@pytest.mark.django_db
def test_comment_ordering():
    incident = Incident.objects.create(
        title="Cache Issue",
        description="Redis seems unresponsive."
    )
    c1 = Comment.objects.create(incident=incident, author="A", content="First")
    time.sleep(0.01) 
    c2 = Comment.objects.create(incident=incident, author="B", content="Second")

    comments = list(incident.comments.all())
    assert comments[0] == c2
    assert comments[1] == c1
