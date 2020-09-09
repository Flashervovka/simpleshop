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
import {STATUS_ADMIN_VIEW, STATUS_CLIENT_VIEW, STATUS_EDIT} from "../../config";

interface ProductCardProps {
    productData:IProduct
    onOpenProduct(isOpenDialogCreate:boolean, product?:IProduct, dialogStatus?:string):void
    onRemoveProduct(product:IProduct):void
    readOnly?:boolean
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {
    const {productData, onOpenProduct, onRemoveProduct, readOnly} = props;

    const onView = (): void => {
        onOpenProduct(true, productData, readOnly ? STATUS_CLIENT_VIEW : STATUS_ADMIN_VIEW);
    }
    const onEdit = (): void => {
        onOpenProduct(true, productData, readOnly ? STATUS_CLIENT_VIEW : STATUS_EDIT);
    }

    const onRemove = (): void => {
        onRemoveProduct(productData);
    }
    return (
        <Card className="product-card">
            <CardActionArea onClick={onView}>
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
                        {`Категория: ${productData.categoryLabel}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {productData.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={onEdit}>
                    {!readOnly ? "Редактировать" : "Заказать"}
                </Button>

                {
                    !readOnly &&
                    <Button size="small" color="primary" onClick={onRemove}>
                        Удалить
                    </Button>
                }
            </CardActions>
        </Card>
    );
}
export default ProductCard;