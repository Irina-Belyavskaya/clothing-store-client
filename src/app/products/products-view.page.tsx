import Grid from "@mui/material/Grid";
import { useEffect } from "react";

// ============== Redux ==============
import { useAppDispatch } from "hooks/redux";
import { getProducts } from "./store/products.actions";
import { useProductsSelector } from "./store/products.selectors";

// ============== Components ==============
import AppBar from "components/app-bar.component";
import AppButton from "components/app-button.component";
import AppFooter from "components/app-footer.component";
import AppIntroSection from "components/app-intro-section.component";
import CardProduct from "components/card-product.component";
import AppTextStatus from "components/app-text-status.component";
import ErrorAlert from "components/error-alert.component";
import Loading from "components/loading.component";
import ProductInfoCard from "./product-info-card.component";

export default function ProductsViewPage() {
  const dispatch = useAppDispatch();
  const {products, pending, errors} = useProductsSelector();

  useEffect(() => {
      dispatch(getProducts());
  }, [dispatch])

  return (
    <>
      <AppBar/>
      <AppIntroSection
        backgroundImage='https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80' mainTitle='Clothes for you'
        subTitle='Enjoy secret offers up to -70% off the best luxury clothes every Sunday' 
      />
      <Grid 
        container
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          padding: 5
        }}
      >
      {pending.products 
        ?
          <Loading/>
        :
          products.length !== 0
          ?
            products.map((product) => (
              product.quantity !== 0 && <CardProduct 
                key={product.id}
                product={product}
                orderQuantity={undefined}
              />
            ))
          :
            !errors.products && <AppTextStatus text="Sorry, there are no clothes available at the moment..."/>
      }
      { errors.products && <ErrorAlert title="Error" text={errors.products}/> }
      </Grid>
      <Grid container>
        <AppButton
          title={'On main'}
          route={'/'}
        />
      </Grid>
      <AppFooter/>
    </>
  )
}
