import React from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import addSvg from '../../static/images/add_circle_outline-24px.svg'
import './styles.css'

interface NewProductProps {
    onCreateNewProduct(isOpenDialogCreate:boolean):void
}


const NewProduct: React.FC<NewProductProps> = (props: NewProductProps) => {
    const {onCreateNewProduct} = props;

   // const [productPhoto, setProductPhoto] = useState<string>(addSvg);
   // const [imageFile, setImageFile] = useState<Blob>();

   /* const onAddPhoto = (event: ChangeEvent<HTMLInputElement>): void => {
        const files: Array<File> = Array.prototype.slice.call(event.target.files);
        setImageFile(files[0]);
        const reader: FileReader = new FileReader();
        reader.onload = function (event) {
            if (event.target) {
                setProductPhoto(event.target.result as string)
            }
        };
        reader.readAsDataURL(files[0]);
    }*/

    const onAddProductStart = (): void => {
        onCreateNewProduct(true);
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
                            {/*<label htmlFor="product-photo">
                                <img className="media-content__image" src={addSvg} alt="новый товар"/>
                            </label>
                            <input id="product-photo" className="media-content__product-photo" type="file"
                                   accept="image/*" onChange={onAddPhoto}/>*/}
                        </div>
                    }
                />
            </CardActionArea>
        </Card>
    );
}

export default NewProduct;
