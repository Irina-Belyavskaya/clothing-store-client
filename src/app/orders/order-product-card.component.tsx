import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from "react";

// ============== Redux ==============
import { useAppDispatch } from "hooks/redux";
import { addProductToCart } from "app/carts/store/cart.actions";

// ============== Types ==============
import { CardProduсtParams } from "types/card-product.type";
import { useUserCartSelector } from "app/carts/store/cart.selectors";

// ============== Cookies ==============
import Cookies from "js-cookie";

// ============== Components ==============
import ProductInfoCard from "app/products/product-info-card.component";
import SuccessModalWindow from "components/success-modal-window.component";
import ErrorAlert from "components/error-alert.component";

export default function OrderProductCard({product, orderQuantity} : CardProduсtParams) {
  const dispatch = useAppDispatch();
  const { errors } = useUserCartSelector();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setOpenCard(false);
  }
  const handleClose = () => {
    setOpen(false);
    setOpenCard(false);
  }

  const [openCard, setOpenCard] = useState(false);
  const closeCard = () => setOpenCard(false);

  return (
    <>
      <Card 
        sx={{ padding: 1, bgcolor: '#0E8E53', display: 'flex' }}
        onClick={() => setOpenCard(true)}
      >
        <CardMedia
          component="img"
          sx={{
            width: 100,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
          image={product.image}
          title={product.name}
          alt={product.name}
        />
        <CardContent sx={{color: "white"}}>
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            {product.description}
          </Typography>
          {
            orderQuantity &&
            <Typography variant="body2">
              Quantity: {orderQuantity}
            </Typography>
          }
          <Typography variant="body2">
            {product.price}$
          </Typography> 
        </CardContent>
        {errors.productInCart && <ErrorAlert title="Error" text={errors.productInCart} />}
      </Card>
      {openCard && !open && <ProductInfoCard product={product} isOpen={openCard} handle={closeCard}/>}
    </>
  );
}