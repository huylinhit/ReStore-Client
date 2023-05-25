
import { Button, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import axios from "axios";


function Catalog() {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error));
    }, []);
    return (
        <>
            <Typography variant='h2'>Product List </Typography>

            <ProductList products={products} />

            <Button variant="contained">Add Product</Button>
        </>
    );
}

export default Catalog;