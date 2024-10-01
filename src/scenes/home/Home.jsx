import React, { useEffect, useState } from 'react';
import MainCarousel from './MainCarousel';
import ShoppingList from './ShoppingList';
import Subscribe from './Subscribe';
import Chatbot from './Chatbot';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig.js'; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsCollection = collection(db, 'jobs');
        const jobsSnapshot = await getDocs(jobsCollection);
        const jobsList = jobsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJobs(jobsList);
      } catch (error) {
        console.error('Error fetching jobs: ', error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  const handleApply = (job) => {
    // Navigate to /checkout page with the job details
    navigate("/checkout", { state: { job } });
  };

  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
      <Subscribe />
      <Chatbot />

      <Box marginTop="40px" padding="0 20px">
        <Typography variant="h4" textAlign="center" margin="20px 0">
          Available Jobs
        </Typography>
        {loading ? (
          <Typography variant="h6" textAlign="center">Loading...</Typography>
        ) : error ? (
          <Typography variant="h6" textAlign="center" color="error">{error}</Typography>
        ) : (
          <Grid container spacing={2}>
            {jobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <Card
                  elevation={3}
                  style={{
                    borderRadius: '8px',
                    marginBottom: '20px',
                    transition: '0.3s',
                    '&:hover': {
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  {job.imageUrl && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={job.imageUrl}
                      alt={job.title}
                      style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.description}
                    </Typography>
                    <Typography variant="body2" color="text.primary"><strong>Name:</strong> {job.name}</Typography>
                    <Typography variant="body2" color="text.primary"><strong>Price:</strong> ${job.price}</Typography>
                    <Typography variant="body2" color="text.primary"><strong>Contact:</strong> {job.contact}</Typography>
                    <Typography variant="body2" color="text.primary"><strong>Job Type:</strong> {job.jobType}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        marginTop: '10px',
                        borderRadius: '5px',
                        transition: '0.3s',
                        '&:hover': {
                          backgroundColor: '#0056b3',
                          transform: 'translateY(-2px)',
                        },
                      }}
                      onClick={() => handleApply(job)} // Replace with actual apply logic
                    >
                      Apply
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default Home;
