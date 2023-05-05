import {nav} from "../../constants/nav";
import Layout from "../../components/layout.component";
import ContentUserOrdersPage from "./content-user-orders.page";

export default function UserOrdersPage () {
    return(
        <Layout nav={nav} title={'Orders'}>
            <ContentUserOrdersPage/>
        </Layout>
    );
}