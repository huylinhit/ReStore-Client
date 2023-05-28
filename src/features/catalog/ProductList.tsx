import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[],

}

function ProductList({ products }: Props) {
    return (
        <>
            <Grid container spacing={2} >
                {products.map(product => {
                    return (
                        <Grid key={product.id} item xs={4} sx={{ marginBottom: 2 }}>
                            <ProductCard key={product.id} product={product} />
                        </Grid>
                    )
                })}
            </Grid >
        </>
    );
}

export default ProductList;