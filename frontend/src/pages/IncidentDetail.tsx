import  { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import type { Comment, Incident, Status } from '../interface/Incident.type';
import { Box, Typography, Paper, Grid, Select, MenuItem, TextField, Button, Divider, List, ListItem, ListItemText, Alert } from '@mui/material';
import { STATUS_CHOICES } from '../constants/Consatnts';
import IncidentService from '../services/IncidentService';
import type { PaginatedResponse } from '../interface/BaseService.type';

export default function IncidentDetail() {
    const { id } = useParams<{ id: string }>();
    const [incident, setIncident] = useState<Incident | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [statusUpdate, setStatusUpdate] = useState<Status>('NEW');
    const [loading, setLoading] = useState(true);

    const fetchIncidentData = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        try {
            const incidentRes = await IncidentService.getById(id);
            const commentsRes: PaginatedResponse<Comment> = await IncidentService.getComments(id);
            setIncident(incidentRes);
            setStatusUpdate(incidentRes.status);
            setComments(commentsRes.results);
            
        } catch (error) {
            console.error('Error fetching incident data:', error);
            setIncident(null); 
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchIncidentData();
    }, [fetchIncidentData]);

    
    const handleStatusUpdate = async () => {
        if (!id || !incident) return;
        try {
            const updatedIncident = await IncidentService.partialUpdate(id, { status: statusUpdate });
            setIncident(updatedIncident);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    
    const handleCommentSubmit = async () => {
        if (!id || !newComment.trim()) return;

        try {
            
            const createdComment = await IncidentService.createComment(id, {
                content: newComment,
                author: "Test Engineer" 
            });
            setComments([createdComment, ...comments]);
            setNewComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    if (loading) return <Typography p={3}>Loading...</Typography>;
    if (!incident) return <Alert severity="error">Incident not found.</Alert>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>{incident.title}</Typography>
            <Paper sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid  size={12}>
                        <Typography variant="body1"><strong>ID:</strong> {incident.id}</Typography>
                        <Typography variant="body1"><strong>Description:</strong> {incident.description}</Typography>
                    </Grid>
                    <Grid  size={4}><Typography variant="body2"><strong>Severity:</strong> {incident.severity}</Typography></Grid>
                    <Grid  size={4}><Typography variant="body2"><strong>Assignee:</strong> {incident.assignee || 'None'}</Typography></Grid>
                    <Grid  size={4}><Typography variant="body2"><strong>Created:</strong> {new Date(incident.created_at).toLocaleString()}</Typography></Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" alignItems="center" gap={2}>
                    <Typography variant="subtitle1">Current Status:</Typography>
                    <Select value={statusUpdate} onChange={(e) => setStatusUpdate(e.target.value as Status)} size="small">
                        {STATUS_CHOICES.map(s => <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>)}
                    </Select>
                    <Button variant="contained" onClick={handleStatusUpdate} disabled={statusUpdate === incident.status}>Update</Button>
                </Box>
            </Paper>

            <Typography variant="h5" gutterBottom>Comments</Typography>
            <Paper sx={{ p: 2, mb: 3 }}>
                <TextField
                    fullWidth
                    label="Add a comment"
                    multiline
                    rows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{ mb: 1 }}
                />
                <Button variant="contained" onClick={handleCommentSubmit} disabled={!newComment.trim()}>Post Comment</Button>

                <Divider sx={{ my: 2 }} />
                
                <List>
                    {comments.map((comment) => (
                        <ListItem key={comment.id} alignItems="flex-start">
                            <ListItemText
                                primary={comment.content}
                                secondary={`By ${comment.author} on ${new Date(comment.created_at).toLocaleString()}`}
                            />
                        </ListItem>
                    ))}
                    {comments.length === 0 && <Typography variant="body2" color="textSecondary">No comments yet.</Typography>}
                </List>
            </Paper>
        </Box>
    );
}