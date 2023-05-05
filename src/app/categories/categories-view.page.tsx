import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";

// ============== Redux ==============
import { useAppDispatch } from "hooks/redux";
import { useCategorySelector } from "./store/categories.selectors";
import { getCategoryById } from "./store/categories.actions";

// ============== Components ==============
import AppBar from "components/app-bar.component";
import AppButton from "components/app-button.component";
import AppFooter from "components/app-footer.component";
import AppIntroSection from "components/app-intro-section.component"
import CategoryProducts from "./category-products.component";

export default function CategoriesViewPage() {
  const {categoryId} = useParams<string>();
  
  const dispatch = useAppDispatch();
  const {category} = useCategorySelector();

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryById({categoryId: Number(categoryId)}));
    }
  }, [dispatch])

  return (
    <>
      <AppBar/>
      <AppIntroSection 
        backgroundImage={
          category?.image 
          ? 
            category.image 
          : 
            'https://res.cloudinary.com/dzouilf8r/image/upload/v1680113277/photo-1631679706909-1844bbd07221_qkpg37.avif'
        }
        mainTitle={category?.name}
        subTitle={undefined}
      />
      <CategoryProducts categoryId={category?.id ? category.id : undefined}/>
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