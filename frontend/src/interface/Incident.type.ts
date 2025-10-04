export type Severity = 'P0' | 'P1' | 'P2';
export type Status = 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export interface Incident {
  id: number;
  title: string;
  description: string;
  severity: Severity;
  status: Status;
  assignee: string | null;
  created_at: string; 
  updated_at: string; 
}

export interface Comment {
    id: number;
    incident: number;
    author: string;
    content: string;
    created_at: string;
}

export type IncidentCreatePayload = Pick<Incident, 'title' | 'description' | 'severity'>;
