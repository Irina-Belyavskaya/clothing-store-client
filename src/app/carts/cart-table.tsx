import { useEffect, useState } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router-dom";

// ============== Redux ==============
import { useAppDispatch } from "../../hooks/redux";
import { useUserCartSelector } from "./store/cart.selectors";
import { deleteUserCart, getUserCart, updateProductQuantity } from "./store/cart.actions";
import { createOrder } from "../orders/store/orders.actions";
import { useOrderSelector } from "../orders/store/orders.selectors";

// ============== Types ==============
import { UpdateProductType } from "./types/update-product-type";

// ============== Constants ==============
import { columns } from 'constants/cart-table-columns';

// ============== Components ==============
import ErrorAlert from "components/error-alert.component";
import Loading from "components/loading.component";
import { CartDtoType } from "./types/cart-dto.type";
import SuccessModalWindow from "components/success-modal-window.component";

export default function CartTable() {
    const dispatch = useAppDispatch();
    const { userCart, errors, pending } = useUserCartSelector();
    const order = useOrderSelector();
    const [updateTable, setUpdateTable] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [totalPrice, setTotalPrice] = useState(0);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(getUserCart());
    }, [dispatch, updateTable])

    useEffect(() => {
        if (userCart) {
            let price = 0;
            userCart.forEach(cart => {
                price += cart.quantity * cart.products.price;
            })
            setTotalPrice(price);
        }
    }, [userCart])

    const handleOrder = () => {
        if (userCart?.length === 0 || !userCart)
            return;
        const dto = { totalPrice: totalPrice };
        dispatch(createOrder({ dto }))
            .then(({ meta }) => {
                if (meta.requestStatus !== 'rejected') {
                    dispatch(deleteUserCart()).then(({ meta }) => {
                        if (meta.requestStatus !== 'rejected') {
                            setUpdateTable(!updateTable);
                            handleOpen();
                        }
                    });
                }
            })
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleAddQuantity = (cart: CartDtoType) => {
        const newQuantity = cart.quantity + 1;
        const dto: UpdateProductType = { 
            quantity: newQuantity, 
            recordId: cart.id, 
            productQuantity: cart.products.quantity
        }
        dispatch(updateProductQuantity({ dto }))
            .then(({ meta }) => {
                if (meta.requestStatus !== 'rejected') {
                    setUpdateTable(!updateTable);
                }
            })
    }

    const handleRemoveQuantity = (cart: CartDtoType) => {
        const newQuantity = cart.quantity - 1;
        const dto: UpdateProductType = { 
            quantity: newQuantity, 
            recordId: cart.id, 
            productQuantity: cart.products.quantity 
        }
        dispatch(updateProductQuantity({ dto }))
        .then(({ meta }) => {
            if (meta.requestStatus !== 'rejected') {
                setUpdateTable(!updateTable);
            }
        })
    }

    return (
        <>
            {pending.userCart
                ?
                <Loading />
                :
                <>
                    <Grid container sx={{ marginBottom: 2 }}>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                                marginLeft: 'auto',
                                fontWeight: 'bold'
                            }}
                        >
                            Total price: {totalPrice}
                        </Typography>
                    </Grid>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                data-testid='cell'
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}

                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userCart?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((cart) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={cart.id} data-testid= 'tblrow'>
                                                    {columns.map((column) => {
                                                        if (column.id === "productName") {
                                                            const value = cart.products.name;
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );

                                                        }
                                                        if (column.id === "price") {
                                                            const value = cart.products.price;
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );

                                                        }
                                                        if (column.id === "quantity") {
                                                            const quantity = cart.quantity;
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof quantity === 'number'
                                                                        ? column.format(quantity)
                                                                        : quantity}
                                                                </TableCell>
                                                            );
                                                        }

                                                        if (column.id === "size") {
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {cart.products.size}
                                                                </TableCell>
                                                            );
                                                        }

                                                        if (column.id === "color") {
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    <Grid 
                                                                        sx={{
                                                                            mr:'auto',
                                                                            ml: 'auto',
                                                                            width: 25, 
                                                                            height: 25, 
                                                                            bgcolor: cart.products.color,
                                                                            borderRadius: '50%',
                                                                            border: '1px solid white'
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                            );
                                                        }
                                                    })}
                                                    <TableCell style={{ textAlign: 'center' }}>
                                                        <IconButton color="primary"
                                                        data-testid='addQuantity'
                                                            onClick={() => {
                                                                handleAddQuantity(cart)
                                                            }}
                                                        >
                                                            <AddIcon />
                                                        </IconButton>
                                                        <IconButton color="primary"
                                                            onClick={() => {
                                                                handleRemoveQuantity(cart)
                                                            }}
                                                        >
                                                            <RemoveIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[3, 5, 7]}
                            component="div"
                            count={userCart?.length ? userCart?.length : 5}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                    <Grid container>
                        <Button 
                            sx={{ 
                                marginLeft: "auto", 
                                marginTop: '20px',
                                mb: 1,
                                color: 'white', 
                                bgcolor: '#0A5F38',
                                '&:hover': {
                                    backgroundColor: '#0E8E53',
                                    color: 'white',
                                }
                            }} 
                            variant="contained" 
                            onClick={handleOrder}
                        >
                            Make an order
                        </Button>
                    </Grid>
                    <SuccessModalWindow 
                        text={'Order successfully created.'} 
                        handleClose={handleClose} 
                        isOpen={open}
                    />
                </>
            }
            {order.errors.order && <ErrorAlert title="Error" text={order.errors.order} />}
            {errors.userCart && <ErrorAlert title="Error" text={errors.userCart} />}
        </>
    );
}