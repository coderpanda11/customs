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

const CaseStudies = () => {
  const cases = [
    {
      title: "Digital Evidence in Cybercrime",
      description: "How digital forensics helped solve a major cybercrime case",
      link: "https://example.com/case1"
    },
    {
      title: "Physical Evidence Collection Success",
      description: "Proper evidence collection that led to case resolution",
      link: "https://example.com/case2"
    },
    {
      title: "Combined Physical and Digital Evidence",
      description: "How combining both types of evidence solved a complex case",
      link: "https://example.com/case3"
    }
  ];

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>Case Studies</Typography>
      <List>
        {cases.map((case_study, index) => (
          <ListItem key={index} component={Paper} sx={{ mb: 2, p: 2 }}>
            <ListItemText
              primary={case_study.title}
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">
                    {case_study.description}
                  </Typography>
                  <Button 
                    href={case_study.link} 
                    target="_blank" 
                    variant="outlined" 
                    sx={{ mt: 1 }}
                  >
                    Read More
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

export default CaseStudies; 