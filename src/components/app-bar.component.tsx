import { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import MuiToolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';

// ============== Icons ==============
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// ============== Cookies ==============
import Cookies from 'js-cookie';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

export default function AppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MuiAppBar position="fixed" sx={{backgroundColor: '#0A5F38'}}>
        <MuiToolbar sx={{ justifyContent: 'space-between'}}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {Cookies.get('access_token_client') 
              ? 
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircleIcon/>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                        underline="none"
                        sx={{color: 'black'}}
                        href="/app/users">
                      Account
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link 
                      underline="none"
                      sx={{color: 'black'}}
                      href="/app/auth/log-out">
                      Log out
                    </Link>
                  </MenuItem>
                </Menu>
              </>
              :
              <>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  href="/app/auth/sign-in"
                  sx={rightLink}
                >
                  {'Sign In'}
                </Link>
                <Link
                  variant="h6"
                  underline="none"
                  href="/app/auth/sign-up"
                  sx={rightLink}
                >
                  {'Sign Up'}
                </Link>
              </>
          }
          </Box>
        </MuiToolbar>
      </MuiAppBar>
      <MuiToolbar />
    </div>
  );
}
