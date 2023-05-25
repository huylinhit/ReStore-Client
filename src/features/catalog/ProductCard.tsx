import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";

interface Props {
    product: Product
}

function ProductCard({ product }: Props) {
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar
                            sx={
                                { backgroundColor: "primary.main" }
                            }
                        >
                            {product.name.charAt(0).toUpperCase()}
                        </Avatar>
                    }
                    title={product.name}
                    titleTypographyProps={{
                        sx: { fontWeight: 'bold', color: 'primary.main' }
                    }}
                />

                <CardMedia
                    sx={{ backgroundSize: 'contain', height: 140 }}
                    image={product.pictureUrl}
                    title={product.name}
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" >
                        {(product.price / 100).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        {product.brand} / {product.type}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small">Add To Cart</Button>
                    <Button
                        size="small"
                        component={Link}
                        to={`/catalog/${product.id}`}
                    >
                        View
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}

export default ProductCard;