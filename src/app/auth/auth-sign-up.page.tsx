import { useAppDispatch } from "hooks/redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Grid, CssBaseline, Paper, Box, Avatar, Typography, TextField, Button } from "@mui/material";

// ============== Redux ==============
import { registerUser } from "./store/auth.actions";
import { useAuthSelector } from "./store/auth.selectors";

// ============== Yup ==============
import { schemaSignUp } from "./auth-schemas.yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FieldValues, useForm } from "react-hook-form";

// ============== Types ==============
import { RegistrationDto } from "./types/registration-dto.type";

// ============== Components ==============
import ErrorAlert from "components/error-alert.component";

// ============== Icons ==============
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HomeIcon from '@mui/icons-material/Home';

export default function AuthSignUpPage() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const auth = useAuthSelector();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaSignUp),
    defaultValues: { email: '', password: '', confirmPassword: '' }
  });

  const handleSubmitForm = (data: FieldValues) => {
    const dto: RegistrationDto = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    };

    dispatch(registerUser({ dto }))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          reset();
          navigate('/', { replace: true });
        }
      })
  }

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${'https://images.unsplash.com/photo-1517408395525-fa05dd0bb2ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: '#0A5F38',
                color: 'white'
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleSubmitForm)}
              sx={{ mt: 1 }}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                        helperText={errors.email ? `${errors.email.message}`: ''}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        error={errors.email ? true : false}
                        {...field} />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <TextField
                      helperText={errors.password ? `${errors.password.message}`: ''}
                      margin="normal"
                      fullWidth
                      label="Password"
                      type="password"
                      id="password"
                      error={errors.password ? true : false}
                      {...field} />
                )}
              />

                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                  <TextField
                    helperText={errors.confirmPassword ? `${errors.confirmPassword.message}`: ''}
                    margin="normal"
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    error={errors.confirmPassword ? true : false}
                    {...field} />
                  )}
                />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: '20px',
                  backgroundColor: '#0A5F38',
                  '&:hover': {
                    backgroundColor: '#0E8E53',
                    color: 'white',
                  }
                }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <NavLink to="/app/auth/sign-in" style={{ color: '#0A5F38' }}>
                    {"Do you already have an account?"}
                  </NavLink>
                </Grid>
                <Grid
                  container
                  item
                  sx={{ marginTop: '30px' }}
                >
                  <NavLink
                    to="/"
                    style={{
                      textDecoration: 'none',
                      color: 'white'
                    }}
                  >
                    <HomeIcon
                      sx={{
                        backgroundColor: '#0A5F38',
                        border: '2px',
                        borderRadius: '50%'
                      }}
                    />
                  </NavLink>
                  {auth.errors.token && <ErrorAlert title="Error" text={auth.errors.token} />}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}