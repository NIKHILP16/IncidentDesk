// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IncidentList from './pages/IncidentList';
import { Container } from '@mui/material';
import IncidentDetail from './pages/IncidentDetail';
import IncidentCreate from './pages/IncidentCreate';

function App() {
  return (
  
    <Router>
      <Container maxWidth="xl" sx={{ mt: 2 }}>
       
        <Routes>
        
          <Route path="/" element={<IncidentList />} />

         
          <Route path="/incident/:id" element={<IncidentDetail />} />
          <Route path="/create" element={<IncidentCreate />} />
           
        
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;