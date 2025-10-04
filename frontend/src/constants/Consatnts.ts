
export type Severity = 'P0' | 'P1' | 'P2';
export type Status = 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';


export const SEVERITY_CHOICES: { value: Severity, label: string }[] = [
    { value: 'P0', label: 'Critical' },
    { value: 'P1', label: 'High' },
    { value: 'P2', label: 'Medium' },
];


export const STATUS_CHOICES: { value: Status, label: string }[] = [
    { value: 'NEW', label: 'New' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'RESOLVED', label: 'Resolved' },
    { value: 'CLOSED', label: 'Closed' },
];