import React, { useState, useEffect, useCallback } from 'react';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Select, MenuItem, TextField, Button, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Incident, Severity, Status } from '../interface/Incident.type';
import IncidentService from '../services/IncidentService';


const STATUS_OPTIONS: Status[] = ['NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
const SEVERITY_OPTIONS: Severity[] = ['P0', 'P1', 'P2'];

export default function IncidentList() {
    const navigate = useNavigate();
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState<Status | ''>('');
    const [severityFilter, setSeverityFilter] = useState<Severity | ''>('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchIncidents = useCallback(async () => {
        try {
            const params = {
                page,
                filters: { 
                status: statusFilter,
                severity: severityFilter,
            },
                search: searchTerm,
            };
            const response =await IncidentService.getAll(params);

            setIncidents(response.results);
            setTotalPages(Math.ceil(response.count / 10)); 
        } catch (error) {
            console.error('Error fetching incidents:', error);
        }
    }, [page, statusFilter, severityFilter, searchTerm]);

    useEffect(() => {
        fetchIncidents();
    }, [fetchIncidents]);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Incident Desk</Typography>
   
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                {/* Status Filter */}
                <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as Status | '')} displayEmpty size="small">
                    <MenuItem value="">All Statuses</MenuItem>
                    {STATUS_OPTIONS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
                {/* Severity Filter */}
                <Select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value as Severity | '')} displayEmpty size="small">
                    <MenuItem value="">All Severities</MenuItem>
                    {SEVERITY_OPTIONS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
                {/* Free Text Search */}
                <TextField label="Search Title/Desc" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} size="small" />
              
                <Button variant="outlined" onClick={() => navigate('/create')}>Create Incident</Button>
            </Box>

         
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Severity</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Assignee</TableCell>
                            <TableCell>Created Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {incidents.map((incident) => (
                            <TableRow 
                                key={incident.id} 
                                onClick={() => navigate(`/incident/${incident.id}`)} 
                                sx={{ '&:hover': { cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                            >
                                <TableCell>{incident.id}</TableCell>
                                <TableCell>{incident.title}</TableCell>
                                <TableCell>{incident.severity}</TableCell>
                                <TableCell>{incident.status}</TableCell>
                                <TableCell>{incident.assignee || 'Unassigned'}</TableCell>
                                <TableCell>{new Date(incident.created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            </Box>
        </Box>
    );
}