import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Dialog, DialogContent, DialogTitle, Divider, Grid } from '@mui/material';
import { ProductInfoCardProps } from './types/product-info-card-props.type';

export default function ProductInfoCard({isOpen, handle, product}: ProductInfoCardProps) {

  return (
      <Dialog
        open={isOpen}
        onClose={() => handle()}
        aria-labelledby="alert-dialog-title"
      >
        <Grid sx={{display: 'flex', alignItems: 'center', bgcolor: '#0A5F38'}}>
          <DialogTitle id="alert-dialog-title" sx={{ color: 'white'}}>
            {product.name}
          </DialogTitle>
          <Grid 
            item 
            sx={{
              width: 25, 
              height: 25, 
              bgcolor: product.color,
              borderRadius: '50%',
              border: '1px solid white'
            }}
          />
        </Grid>
        <DialogContent sx={{bgcolor: '#0A5F38', color: 'white'}}>
          <Grid sx={{display: 'flex', fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`}}>
            <Grid
              component="img"
              sx={{
                width: 300,
                marginRight: '20px'
              }}
              alt="Product image"
              src={product.image}
            />
            <Grid sx={{display: 'flex', flexDirection: 'column'}}>
              <Typography 
                sx={{ 
                  mt: 1, 
                  fontSize: '20px' ,
                  fontStyle: 'italic'
                }}
              >
                {product.vendorCode}
              </Typography>
              <Typography sx={{ fontSize: '20px', mt: 1 }}>
                <Box 
                  component="span" 
                  sx={{ 
                    fontWeight: 'bold', 
                    paddingRight: '10px' 
                  }}
                >
                  Size:
                </Box> 
                {product.size}
              </Typography>
              <Grid sx={{ fontSize: '20px', mt: 1 }}>
                <Grid 
                  sx={{ 
                    fontWeight: 'bold', 
                    paddingRight: '10px' 
                  }}
                >
                  Description:
                </Grid> 
                {product.description}
              </Grid>
              <Grid 
                sx={{
                  fontSize: '20px', 
                  mt: 1, 
                  fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`  
                }}
              >
                <Grid 
                  sx={{ 
                    fontWeight: 'bold', 
                    paddingRight: '10px'
                  }}
                >
                  Composition:
                </Grid> 
                {product.composition}
              </Grid>
              <Typography sx={{ fontSize: '20px', mt: 1, mb: 3 }}>
                <Box 
                  component="span" 
                  sx={{ 
                    fontWeight: 'bold', 
                    paddingRight: '10px' 
                  }}
                >
                  Brand:
                </Box> 
                {product.brand}
              </Typography>
              <Divider />
              <Typography 
                sx={{ 
                  fontSize: '25px', 
                  fontWeight: 'bold' 
                }}
              >
                {product.price}$
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
  );
}