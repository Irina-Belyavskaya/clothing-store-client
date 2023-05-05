import AppBar from "../../components/app-bar.component";
import AppFooter from "../../components/app-footer.component";
import MainCategories from "./main-categories.component";
import AppIntroSection from "../../components/app-intro-section.component";
import { Grid } from "@mui/material";
import AppButton from "components/app-button.component";

export default function MainPage() {
    return (
    <>
      <AppBar/>
      <AppIntroSection
        backgroundImage='https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80' mainTitle='Clothes for you'
        subTitle='Enjoy secret offers up to -70% off the best luxury clothes every Sunday' />
      <MainCategories />
      <Grid container>
        <AppButton
          title={'View all products'}
          route={'products'}
        />
      </Grid>
      <AppFooter />
    </>
  );
}


