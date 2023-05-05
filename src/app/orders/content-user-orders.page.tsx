import {Grid, Typography} from "@mui/material";
import {useEffect} from "react";

// ============== Redux ==============
import {useAppDispatch} from "../../hooks/redux";
import {useOrderSelector} from "./store/orders.selectors";
import {getUserOrders} from "./store/orders.actions";

// ============== Componets ==============
import ErrorAlert from "components/error-alert.component";
import Loading from "components/loading.component";
import AppTextStatus from "components/app-text-status.component";
import CardProduct from "components/card-product.component";
import OrderProductCard from "./order-product-card.component";

export default function ContentUserOrdersPage() {
    const dispatch = useAppDispatch();
    const {orders, errors, pending} = useOrderSelector();

    useEffect(() => {
        dispatch(getUserOrders());
    }, [dispatch])

    return (
        <Grid
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}
        >
            {
                pending.orders
                ?
                    <Loading/>
                :
                    orders && orders.length !== 0
                    ?
                        orders.map(order => (
                            <Grid
                                container
                                key={order.id}
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                    borderRadius: 5,
                                    bgcolor: 'rgb(10, 95, 56, 0.4)',
                                    padding: '20px 30px',
                                    marginTop: 1,
                                    ml: 2,
                                    mr: 2,
                                    '&:hover': {
                                        transform: 'scale(1.01)',
                                        transition: '0.3s ease-in-out'
                                    },
                                    '&:not(:hover)': {
                                        transform: 'scale(1)',
                                        transition: '0.3s ease-in-out'
                                    }
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        width: '100%',
                                        marginBottom: 2,
                                        color: '#0A5F38'
                                    }}
                                >
                                    The price of your order : {order?.totalPrice}$
                                </Typography>
                                {order.products.map(product => (
                                    <OrderProductCard
                                        key={product.product.id}
                                        product={product.product}
                                        orderQuantity={product.quantity}
                                    />                                        
                                ))}
                            </Grid>
                        ))
                    :
                        !errors.orders && <AppTextStatus text="You don't have any orders yet..."/>
            }
            { errors.orders && <ErrorAlert title="Error" text={errors.orders}/> }
        </Grid>
    );
}