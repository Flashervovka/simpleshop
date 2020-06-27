import React, {ChangeEvent} from 'react';
import TextField from '@material-ui/core/TextField';
/*import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';*/

type ProductProps = {
    onSendFile:Function
}

const ProductCreatePanel = (props: ProductProps) => {
    const {onSendFile} = props;

    const onAddPhoto = (event: ChangeEvent<HTMLInputElement>): void => {
        const files:Array<File> = Array.prototype.slice.call(event.target.files);
        onSendFile(files[0]);
    }

    return(
        <div>
            <TextField required label="Название товара"/>
            <TextField required label="Описание товара" multiline/>
            <input type="file" accept="image/*" onChange={onAddPhoto}/>

            {/*<Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image="../images/kolbasa.jpg"
                        title="Contemplative Reptile"
                    />
                </CardActionArea>
            </Card>
*/}
        </div>
    )
}

export default ProductCreatePanel;