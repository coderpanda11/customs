import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Box 
} from '@mui/material';
import './Team.css';

// Import team member images
import spSirImg from '../../Images/spsir.jpg';
import devaImg from '../../Images/Deva.jpg';
import sidImg from '../../Images/Profile photo.jpg';
import sksImg from '../../Images/sks.png';
import unknownImg from '../../Images/unfinded.png';

const teamMembers = [
    {
        name: 'Shishir Kumar Shandilya',
        role: 'Advisor',
        image: sksImg
    },
  {
    name: 'Sh. Rajeev Kumar Agrawal (IRS)',
    role: 'Commissioner, Customs,Indore',
    image: unknownImg
  },
  {
    name: 'Sh. Jayesh K. Jadav',
    role: 'Assistant Commissioner, Inland Container Depot,Dhannad.',
    image: unknownImg
  },
  {
    name: 'Sandeep Garg',
    role: 'Superintendent Customs & Central GST',
    image: spSirImg
  },
  {
    name: 'Devangana Sujay',
    role: 'Project Lead',
    image: devaImg
  },
  {
    name: 'Sidharth Panda',
    role: 'Developer',
    image: sidImg
  }
];

const Team = () => {
  return (
    <Container maxWidth="lg" className="team-container">
      <Typography variant="h4" gutterBottom align="center" className="team-title">
        Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="team-card">
              <CardMedia
                component="img"
                className={`team-member-image ${member.name === 'Sidharth Panda' ? 'sidharth-image' : ''}`}
                image={member.image}
                alt={member.name}
              />
              <CardContent>
                <Typography variant="h6" component="div" align="center">
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" align="center">
                  {member.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Team; 