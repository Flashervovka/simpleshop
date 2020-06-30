import React from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import addSvg from '../../static/images/add_circle_outline-24px.svg'
import './styles.css'
import {IProduct} from "../../store/products/types";

interface NewProductProps {
    onOpenProduct(isOpenDialogCreate:boolean, product?:IProduct):void
}


const NewProduct: React.FC<NewProductProps> = (props: NewProductProps) => {
    const {onOpenProduct} = props

    const onAddProductStart = (): void => {
        onOpenProduct(true);
    }


    return (
        <Card className="new-product-card" onClick={onAddProductStart}>
            <CardActionArea>
                <CardMedia
                    className="new-product-card__media"
                    title="Добавить фото товара"
                    children={
                        <div className="new-product-card__media-content">
                            <img className="media-content__image" src={addSvg} alt="новый товар"/>
                        </div>
                    }
                />
            </CardActionArea>
        </Card>
    );
}

export default NewProduct;
