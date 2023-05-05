import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AppButtonParams } from "types/app-button.type";

export default function AppButton({title, route}: AppButtonParams) {
  return (
    <Button 
      variant="contained"
      sx={{
        bgcolor: '#0A5F38',
        margin: '10px 10px 30px auto',
        '&:hover': {
          backgroundColor: '#0E8E53',
          color: 'white',
        }
      }}
      component={Link} 
      to={route}
    >
      {title}
    </Button>
  )
}