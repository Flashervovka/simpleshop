import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './styles.css';
import {IProduct} from "../../store/products/types";

interface ProductCardProps {
    productData:IProduct
    onOpenProduct(isOpenDialogCreate:boolean, product?:IProduct):void
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
    const {productData, onOpenProduct} = props;

    const onOpen = (): void => {
        onOpenProduct(true, productData);
    }

    return (
        <Card className="product-card" onClick={onOpen}>
            <CardActionArea>
                <CardMedia
                    className="product-card__media"
                    image={`../images/${productData.url}`}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {productData.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`Цена: ${productData.price}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {productData.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Редактировать
                </Button>
                <Button size="small" color="primary">
                    Удалить
                </Button>
            </CardActions>
        </Card>
    );
}
export default ProductCard;