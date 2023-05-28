import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { currencyFormat } from "../../app/util/util";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";



function ProductDetails() {
    const { basket, removeItem, setBasket } = useStoreContext();
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    var item = basket?.items.find(i => i.productId == product?.id);

    useEffect(() => {
        if (item) {
            setQuantity(item.quantity);
        }

        id && agent.Catalog.details(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [id, item]);


    const handleChange = (e: any) => {
        const value = e.target.value;
        if (value > 0) {
            setQuantity(parseInt(value));
        }
    }

    const handleUpdateCart = () =>{
        setSubmitting(true);

        //item = basket?.item.find(i => i.productId === product.id) 
        //Chua co San pham => Add vao Cart. 
        //Co san pham => change Quantity
        //Tang giam theo chenh lech chu khong phai de truc tiep len
        // item?.quantity là số lượng trong cart
        // quantity là số lượng người dùng chỉnh sửa


        if (!item || quantity > item.quantity){
            const updateQuantity = item ? quantity - item?.quantity : quantity;

            agent.Bastket.addItem(product?.id!, updateQuantity)
                .then(basket => setBasket(basket))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false));
        }else
        {
            const updateQuantity = item.quantity - quantity;

            agent.Bastket.removeItem(product?.id!, updateQuantity)
                .then(() => removeItem(product!.id!, updateQuantity))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false))

        }


    }

    if (loading) return <LoadingComponent message='Loading Product Details' />

    if (!product) return <NotFound />

    return (
        <Typography variant="h2">
            <Grid container>
                <Grid item xs={6}>
                    <img src={product.pictureUrl} style={{ width: '100%' }} />
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
                                loading={submitting}
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