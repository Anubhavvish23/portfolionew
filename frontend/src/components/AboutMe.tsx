import React from 'react';
import { useAboutMe } from '@/hooks/useAboutMe';
import { Card, CardContent, Typography, Grid, Box, CircularProgress, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProfileImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  marginBottom: '1rem',
});

const SkillChip = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  padding: '4px 12px',
  margin: '4px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '16px',
  fontSize: '0.875rem',
}));

const AboutMe: React.FC = () => {
  const { aboutMe, loading, error } = useAboutMe();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!aboutMe) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <ProfileImage src={aboutMe.profileImage} alt="Profile" />
            <Typography variant="h5" gutterBottom>
              {aboutMe.headline}
            </Typography>
            <Typography variant="body1" paragraph>
              {aboutMe.bio}
            </Typography>
            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Skills
              </Typography>
              <Box>
                {aboutMe.skills.map((skill, index) => (
                  <SkillChip key={index}>{skill}</SkillChip>
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Experience
                </Typography>
                {aboutMe.experience.map((exp) => (
                  <Box key={exp.id} mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {exp.position} at {exp.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </Typography>
                    <Typography variant="body2">{exp.description}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Education
                </Typography>
                {aboutMe.education.map((edu) => (
                  <Box key={edu.id} mb={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {edu.degree}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {edu.institution} • {edu.year}
                    </Typography>
                    <Typography variant="body2">{edu.description}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Interests
                </Typography>
                <Box>
                  {aboutMe.interests.map((interest, index) => (
                    <SkillChip key={index}>{interest}</SkillChip>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutMe; 