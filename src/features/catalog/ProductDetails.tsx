import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { currencyFormat } from "../../app/util/util";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configurationStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/BasketSlice";
import { fetchProductAsync, productSelectors } from "./CatalogSlice";



function ProductDetails() {
    const dispatch = useAppDispatch();
    const {status, basket} = useAppSelector(state => state.basket);
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector(state => productSelectors.selectById(state, id!));
    const {status: productStatus} = useAppSelector(state => state.catalog)
    const [quantity, setQuantity] = useState(0);

    var item = basket?.items.find(i => i.productId === product?.id);

    useEffect(() => {
        if (item) {
            setQuantity(item.quantity);
        }

        if(!product && id) dispatch(fetchProductAsync(parseInt(id!)))

    }, [id, item, dispatch]);


    const handleChange = (e: any) => {
        const value = e.target.value;
        if (value > 0) {
            setQuantity(parseInt(value));
        }
    }

    const handleUpdateCart = () =>{
        //item = basket?.item.find(i => i.productId === product.id) 
        //Chua co San pham => Add vao Cart. 
        //Co san pham => change Quantity
        //Tang giam theo chenh lech chu khong phai de truc tiep len
        // item?.quantity là số lượng trong cart
        // quantity là số lượng người dùng chỉnh sửa

        if (!item || quantity > item.quantity){
            const updateQuantity = item ? quantity - item?.quantity : quantity;
            dispatch(addBasketItemAsync({productId: product?.id!,quantity: updateQuantity}))
        }else
        {
            const updateQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updateQuantity}))
        }


    }

    if (productStatus.includes('pending')) return <LoadingComponent message='Loading Product Details' />

    if (!product) return <NotFound />

    return (
        <Typography variant="h2">
            <Grid container>
                <Grid item xs={6}>
                    <img src={product.pictureUrl} style={{ width: "100%" }} />
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="h2">
                        {product.name}
                    </Typography>

                    <Divider />

                    <Typography variant="h3" color='secondary'>
                        {currencyFormat(product.price)}
                    </Typography>

                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Price</TableCell>
                                    <TableCell>{currencyFormat(product.price)}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>{product.type}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>{product.quantityInStock}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>



                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                type="number"
                                label="Quantity in Cart"
                                fullWidth
                                value={quantity}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <LoadingButton
                                loading={status.includes('pendingRemoveItem' + item?.productId)}
                                variant="contained"
                                size="large"
                                sx={{ height: '52px' }}
                                fullWidth
                                onClick = {handleUpdateCart}
                                disabled={item?.quantity === quantity || !item && quantity === 0}
                            >
                                {item ? 'Update Cart' : 'Add To Cart'}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Typography>
    );
}

export default ProductDetails;