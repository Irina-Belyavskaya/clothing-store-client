import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from "react";

// ============== Redux ==============
import { useAppDispatch } from "../hooks/redux";
import { addProductToCart } from "../app/carts/store/cart.actions";

// ============== Types ==============
import { CardProduсtParams } from "types/card-product.type";
import { useUserCartSelector } from "app/carts/store/cart.selectors";
import ErrorAlert from "./error-alert.component";
import SuccessModalWindow from "./success-modal-window.component";

// ============== Cookies ==============
import Cookies from "js-cookie";
import ProductInfoCard from "app/products/product-info-card.component";

export default function CardProduct({product, orderQuantity} : CardProduсtParams) {
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

  const handleAddProduct = () => {
    setOpenCard(false);
    const dto = { quantity: 1, productId: product.id }
    dispatch(addProductToCart({ dto }))
      .then(({ meta }) => {
        if (meta.requestStatus !== 'rejected') {
          handleOpen();
        }
      })
  }

  const closeCard = () => setOpenCard(false);

  return (
    <>
      <Card 
        sx={{ width: 300, padding: 2, bgcolor: '#0E8E53' }}
        onClick={() => setOpenCard(true)}
      >
        <CardMedia
          component="img"
          sx={{
            height: 300,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
          image={product.image}
          title={product.name}
          alt={product.name}
        />
        <CardContent sx={{color: "white"}}>
          <Typography variant="h5" gutterBottom>
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
        {Cookies.get('access_token_client') &&
          <CardActions>
            <Button size="medium" sx={{ color: 'white' }} onClick={handleAddProduct}>
              <AddShoppingCartIcon />
            </Button>
          </CardActions>
        }
        {errors.productInCart && <ErrorAlert title="Error" text={errors.productInCart} />}
      </Card>
      <SuccessModalWindow 
        text={'Clothes in your cart.'} 
        handleClose={handleClose} 
        isOpen={open}
      />
      {openCard && !open && <ProductInfoCard product={product} isOpen={openCard} handle={closeCard}/>}
    </>
  );
}