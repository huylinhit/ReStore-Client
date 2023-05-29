import { Button, Container, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/util/util";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configurationStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./BasketSlice";

function BasketPage() {
    const dispatch = useAppDispatch();
    const {status, basket} = useAppSelector(state => state.basket);

    if (!basket) return <Typography variant="h4">Your Basket Is Empty</Typography>

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="right">Detele</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        loading={status === 'pendingRemoveItem' + item.productId + 'rem'}
                                        onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: 1, name: 'rem'}))}>
                                        <Remove />
                                    </LoadingButton>

                                    {item.quantity}

                                    <LoadingButton
                                        loading={status === 'pendingAddItem' + item.productId + 'add'}
                                        onClick={() => dispatch(addBasketItemAsync({productId: item.productId, quantity: 1, name: 'add'}))}>
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status === + item.productId + 'del'}
                                        onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: item.quantity, name: 'del'}))}
                                    >
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Divider sx={{ mb: 1 }} />

            <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        component={Link}
                        to='/checkout'
                        fullWidth
                        variant="contained"
                        size='large'
                    >
                        Check out
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default BasketPage;