import React from 'react';
import { 
  Container, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent 
} from '@mui/material';

const ReportGeneration = () => {
  const reportSteps = [
    {
      label: 'Initial Documentation',
      description: 'Document basic case information, date, time, and location',
    },
    {
      label: 'Scene Description',
      description: 'Provide detailed description of the scene and conditions',
    },
    {
      label: 'Evidence Documentation',
      description: 'List and describe all evidence collected with photographs',
    },
    {
      label: 'Chain of Custody',
      description: 'Document the complete chain of custody for all evidence',
    },
    {
      label: 'Analysis Results',
      description: 'Include all analysis results and findings',
    },
    {
      label: 'Conclusions',
      description: 'Summarize findings and conclusions',
    }
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>Report Generation Guide</Typography>
      <Stepper orientation="vertical">
        {reportSteps.map((step, index) => (
          <Step key={step.label} active={true}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Container>
  );
};

export default ReportGeneration; 