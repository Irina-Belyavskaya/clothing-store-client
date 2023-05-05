import {useEffect} from "react";
import { styled } from '@mui/material/styles';
import { Grid, Typography, Container, ButtonBase, Box } from '@mui/material';
import { Link } from 'react-router-dom';

// ============== Redux ==============
import { getCategories} from "../categories/store/categories.actions";
import {useAppDispatch} from "../../hooks/redux";
import {useCategorySelector} from "../categories/store/categories.selectors";

// ============== Components ==============
import ErrorAlert from "components/error-alert.component";
import Loading from "components/loading.component";

const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

export default function MainCategories() {
  const dispatch = useAppDispatch();
  const {categories, pending, errors} = useCategorySelector();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch])

  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" align="center" component="h2">
        For all tastes and all desires
      </Typography>
      <Grid
        container
        sx={{
          mt: 8,
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
          justifyContent: 'space-around'
        }}
      >
        {pending.categories 
        ?
          <Loading/>
        :
          !errors.categories && categories.map((category) => (
            <ImageIconButton
              key={category.name}
              style={{
                width: '50%'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 40%',
                  backgroundImage: `url(${category.image})`,
                }}
              />
              <ImageBackdrop className="imageBackdrop" />
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'common.white',
                }}
              >
                <Link 
                  to={`products/categories/${category.id}`} 
                  style={{ 
                    textDecoration: 'none', 
                    color: 'white' 
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h6"
                    color="inherit"
                    className="imageTitle"
                  >
                    {category.name}
                  </Typography>
                </Link>
              </Box>
            </ImageIconButton>
          ))
        }        
      </Grid>
      { errors.categories && <ErrorAlert title="Error" text={errors.categories}/> }
    </Container>
  );
}
