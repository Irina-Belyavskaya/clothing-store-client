// ============== Components ==============
import Layout from "../../components/layout.component";

// ============== Page ==============
import ContentUserCartsPage from "./content-user-carts.page";

// ============== Constants ==============
import {nav} from "../../constants/nav";

export default function UserCartPage () {
    return(
        <Layout nav={nav} title={'Cart'}>
            <ContentUserCartsPage/>
        </Layout>
    );
}