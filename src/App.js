import React from "react";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box
} from '@mui/material';
import VoiceAssistant from './components/VoiceAssistant/VoiceAssistant.mjs';
import { OpenAIProvider } from './components/OpenAI/OpenAIContext.mjs';
import EvidenceCollection from './components/EvidenceCollection';
import CaseStudies from './components/CaseStudies';
import ReportGeneration from './components/ReportGeneration';
import TrainingLinks from './components/TrainingLinks';
import Team from './components/Team/Team';
import logo from './Images/logo.png';
import "./App.css";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OpenAIProvider>
        <Router>
          <div className="App">
            <AppBar position="static">
              <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <img src={logo} alt="Logo" className="app-logo" />
                  <Typography variant="h6" component="div" sx={{ ml: 2 }}>
                    Evidence Collection Hub
                  </Typography>
                </Box>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/voice-assistant">Voice Assistant</Button>
                <Button color="inherit" component={Link} to="/evidence-collection">Evidence Guide</Button>
                <Button color="inherit" component={Link} to="/case-studies">Case Studies</Button>
                <Button color="inherit" component={Link} to="/report-generation">Report Guide</Button>
                <Button color="inherit" component={Link} to="/training">Training</Button>
                <Button color="inherit" component={Link} to="/team">Team</Button>
              </Toolbar>
            </AppBar>
            <main>
              <Routes>
                <Route path="/" element={
                  <>
                    <div className="home-container">
                      <img src={logo} alt="Logo" className="home-logo" />
                      <Typography variant="h4" gutterBottom>
                        Welcome to the Evidence Collection Hub
                      </Typography>
                      <Typography variant="body1">
                        This platform provides comprehensive guidance for evidence collection, 
                        report generation, and training resources. Use the voice assistant 
                        for hands-free navigation and guidance.
                      </Typography>
                    </div>
                    <Team />
                  </>
                } />
                <Route path="/voice-assistant" element={<VoiceAssistant />} />
                <Route path="/evidence-collection" element={<EvidenceCollection />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/report-generation" element={<ReportGeneration />} />
                <Route path="/training" element={<TrainingLinks />} />
                <Route path="/team" element={<Team />} />
              </Routes>
            </main>
          </div>
        </Router>
      </OpenAIProvider>
    </ThemeProvider>
  );
}

export default App;
