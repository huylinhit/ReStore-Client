
import { Button, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configurationStore";
import { fetchProductsAsync, productSelectors } from "./CatalogSlice";


function Catalog() {
    // const [products, setProducts] = useState<Product[]>([]);
    const dispatch = useAppDispatch();
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status} = useAppSelector(state => state.catalog);
    
    
    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());

        // agent.Catalog.list()
        //     .then(response => setProducts(response))
        //     .catch(error => console.log(error))
        //     .finally(() => setLoading(false))            
    }, [productsLoaded]);


    if (status.includes('pending')) return <LoadingComponent message="Loading Product"/>


    return (
        <>
            <Typography variant='h2'>Product List </Typography>

            <ProductList products={products} />

            <Button variant="contained">Add Product</Button>
        </>
    );
}

export default Catalog;