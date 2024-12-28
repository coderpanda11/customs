import React from 'react';
import { 
  Container, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent,
  Card,
  CardMedia
} from '@mui/material';

const EvidenceCollection = () => {
  const physicalSteps = [
    {
      label: 'Secure the Scene',
      description: 'Establish perimeter control and document the initial state',
    },
    {
      label: 'Documentation',
      description: 'Take photographs and notes of the scene before collecting evidence',
    },
    {
      label: 'Collection',
      description: 'Use proper tools and containers to collect physical evidence',
    },
    {
      label: 'Packaging',
      description: 'Package evidence properly to maintain integrity',
    },
  ];

  const digitalSteps = [
    {
      label: 'Device Seizure',
      description: 'Properly seize and document digital devices',
    },
    {
      label: 'Data Preservation',
      description: 'Create forensic copies of digital evidence',
    },
    {
      label: 'Analysis',
      description: 'Use forensic tools to analyze digital evidence',
    },
    {
      label: 'Documentation',
      description: 'Document all findings and maintain chain of custody',
    },
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>Evidence Collection Guide</Typography>
      
      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Physical Evidence</Typography>
      <Stepper orientation="vertical">
        {physicalSteps.map((step, index) => (
          <Step key={step.label} active={true}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Digital Evidence</Typography>
      <Stepper orientation="vertical">
        {digitalSteps.map((step, index) => (
          <Step key={step.label} active={true}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      <Card sx={{ mt: 4 }}>
        <CardMedia
          component="iframe"
          height="315"
          src="https://www.youtube.com/embed/example"
          title="Evidence Collection Video"
        />
      </Card>
    </Container>
  );
};

export default EvidenceCollection; 