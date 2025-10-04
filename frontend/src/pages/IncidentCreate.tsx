import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, TextField, Button, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import type { Incident, Severity } from '../interface/Incident.type'; 
import { SEVERITY_CHOICES } from '../constants/Consatnts'; 
import IncidentService from '../services/IncidentService';


interface NewIncidentData {
    title: string;
    description: string;
    severity: Severity;
    assignee:string;
}

export default function IncidentCreate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<NewIncidentData>({
        title: '',
        description: '',
        assignee:"",
        severity: 'P2', // Default to Medium severity
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string, value: string } }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(null); 
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await IncidentService.create(formData as unknown as Incident);
            const newIncidentId = response.id;
            navigate(`/incident/${newIncidentId}`);
            
        } catch (err) {
            console.error('Error creating incident:', err);
            setError('Failed to create incident. Please check your inputs and try again.');
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = formData.title.trim() && formData.description.trim();

    return (
        <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>Report New Incident</Typography>
            <Paper sx={{ p: 4 }}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        required
                        label="Incident Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        sx={{ mb: 3 }}
                        disabled={loading}
                    />
                    
                    <TextField
                        fullWidth
                        required
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        sx={{ mb: 3 }}
                        disabled={loading}
                    />

                    <TextField
                        fullWidth
                        required
                        label="Assignee"
                        name="assignee"
                        value={formData.assignee}
                        onChange={handleChange}
                        sx={{ mb: 3 }}
                        disabled={loading}
                    />

                    <FormControl fullWidth sx={{ mb: 4 }} disabled={loading}>
                        <InputLabel id="severity-label">Severity</InputLabel>
                        <Select
                            labelId="severity-label"
                            label="Severity"
                            name="severity"
                            value={formData.severity}
                            onChange={(e) => handleChange({ target: { name: 'severity', value: e.target.value }})}
                        >
                            {SEVERITY_CHOICES.map(s => (
                                <MenuItem key={s.value} value={s.value}>
                                    {s.label} ({s.value})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading || !isFormValid}
                    >
                        {loading ? 'Submitting...' : 'Create Incident'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}