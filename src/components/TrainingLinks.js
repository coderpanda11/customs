import React from 'react';
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Paper, 
  Button 
} from '@mui/material';

const TrainingLinks = () => {
  const trainings = [
    {
      title: "Basic Evidence Collection",
      description: "Learn the fundamentals of evidence collection",
      link: "https://example.com/training1"
    },
    {
      title: "Digital Forensics Basics",
      description: "Introduction to digital forensics and evidence collection",
      link: "https://example.com/training2"
    },
    {
      title: "Advanced Evidence Documentation",
      description: "Advanced techniques for documenting evidence",
      link: "https://example.com/training3"
    }
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>Training Resources</Typography>
      <List>
        {trainings.map((training, index) => (
          <ListItem key={index} component={Paper} sx={{ mb: 2, p: 2 }}>
            <ListItemText
              primary={training.title}
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">
                    {training.description}
                  </Typography>
                  <Button 
                    href={training.link} 
                    target="_blank" 
                    variant="outlined" 
                    sx={{ mt: 1 }}
                  >
                    Access Training
                  </Button>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TrainingLinks; 