import { Box, Container, Grid, Typography } from '@mui/material';

// ============== Types ==============
import { AppIntroSectionProps } from 'types/app-intro-section-props.type';

export default function AppIntroSection( {backgroundImage, mainTitle, subTitle } : AppIntroSectionProps ) {
  return (
    <Grid
      sx={{
        color: 'white',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '80vh',
        minHeight: 500,
        maxHeight: 1300,
      }}
    >
      <Container
        sx={{
          mt: 3,
          mb: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography align="center" variant="h2" >
          {mainTitle}
        </Typography>
        {subTitle && (
          <Typography
            color="inherit"
            align="center"
            variant="h5"
            sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
          >
            {subTitle}
          </Typography>
        )}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'black',
            opacity: 0.5,
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${backgroundImage})`,
            backgroundColor: '#7fc7d9',
            backgroundPosition: 'center',
            zIndex: -2,
          }}
        />
      </Container>
    </Grid>
  );
}
