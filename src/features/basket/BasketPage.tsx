import { Container, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import agent from "../../app/api/agent";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/util/util";
import BasketSummary from "./BasketSummary";

function BasketPage() {
    const { basket, removeItem, setBasket } = useStoreContext();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    });

    const handleAdd = (productId: number, quantity = 1, name: string) => {
        setStatus({ loading: true, name: name })
        agent.Bastket.addItem(productId, quantity)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: name }))
    }

    const handleRemove = (productId: number, quantity = 1, name: string) => {
        setStatus({ loading: true, name: name })

        agent.Bastket.removeItem(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: name }))
    }

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
                                        loading={status.name === 'rem' + item.productId && status.loading}
                                        onClick={() => handleRemove(item.productId, 1, 'rem' + item.productId)}>
                                        <Remove />
                                    </LoadingButton>
    
                                    {item.quantity}
    
                                    <LoadingButton
                                        loading={status.name === 'add' + item.productId && status.loading}
                                        onClick={() => handleAdd(item.productId, 1 , 'add' + item.productId)}>
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(item.price * item.quantity)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status.name === 'del' + item.productId && status.loading}
                                        onClick={() => handleRemove(item.productId, item.quantity, 'del' + item.productId)}
                                    >
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Divider sx={{mb: 1}}/>

            <BasketSummary/>
        </Container>
    );
}

export default BasketPage;