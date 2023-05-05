import { Avatar, Grid, List, ListItem, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

export default function AppFooter() {
  return (
    <Grid 
      container 
      sx={{
        padding: '20px 20px', 
        bgcolor: '#0A5F38',
        textAlign: 'center' 
      }}
    >
      <Grid container>
        <Typography
          component="footer"
          sx={{ 
            textAlign: 'left',
            width: '100%',
            opacity: 0.5,
            color: 'white'
          }}
        >
          Our social networks
        </Typography>
        <List 
          sx={{ 
            display: 'flex',
            justifyContent: 'flex-start',
            width: 'fit-content',
            paddingBottom: 0,
          }}
        >
        <ListItem sx={{paddingLeft: 0}}>
          <Link to="https://instagram.com/irina_beliavskaya?igshid=ZDdkNTZiNTM="target="_blank">
            <Avatar>
              <InstagramIcon />
            </Avatar>
          </Link>
        </ListItem>
        <ListItem sx={{paddingLeft: 0}}>
          <Link to="https://www.facebook.com/" target="_blank">
            <Avatar>
              <FacebookIcon />
            </Avatar>
          </Link>
        </ListItem>
        <ListItem sx={{paddingLeft: 0}}>
          <Link to="https://www.linkedin.com/in/irina-belyavskaya-b2057123a/" target="_blank">
            <Avatar>
              <LinkedInIcon />
            </Avatar>
          </Link>
        </ListItem>
      </List>
    </Grid>
      <Typography
        component="footer"
        sx={{ 
          textAlign: 'center', 
          width: '100%',
          opacity: 0.5,
          color: 'white'
        }}
      >
        BelyavskayaStore©2023
      </Typography>
    </Grid>
  );
}
