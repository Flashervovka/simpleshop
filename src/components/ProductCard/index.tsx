import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './styles.css';

interface ProductCardProps {
}

const ProductCard: React.FC<ProductCardProps> = (props: ProductCardProps) => {

    return (
        <Card className="product-card">
            <CardActionArea>
                <CardMedia
                    className="product-card__media"
                    image="../images/milk.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Продукт
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Цена: 100р
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Краткое описание
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