import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import { useStoreContext } from "../../app/context/StoreContext";
import { BasketItem } from "../../app/models/basket";
import { useAppSelector } from "../../app/store/configurationStore";

function BasketSummary() {
    const basket = useAppSelector(state => state.basket);

    const subtotal = basket.basket?.items.reduce((total: number, item: BasketItem) => total += (item.price * item.quantity), 0) ?? 0;



    const deliveryFee = subtotal > 10000 ? 0 : 500;

    const total = subtotal + deliveryFee

    //Nếu subto

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{currencyFormat(total)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{ fontStyle: 'italic' }}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default BasketSummary;