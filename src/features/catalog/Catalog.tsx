
import { Button, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";


function Catalog() {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    
    
    useEffect(() => {
        agent.Catalog.list()
            .then(response => setProducts(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))            
    }, []);


    if (loading) return <LoadingComponent message="Loading Product"/>


    return (
        <>
            <Typography variant='h2'>Product List </Typography>

            <ProductList products={products} />

            <Button variant="contained">Add Product</Button>
        </>
    );
}

export default Catalog;