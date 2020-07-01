import React, {ChangeEvent, useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import addSvg from "../../static/images/wallpaper-24px.svg";
import {IProduct} from "../../store/products/types";

interface CreateProductDialogProps {
    onCloseDialog():void
    onSaveProduct(product:IProduct, productImgFile:Blob | undefined):void
}

const CreateProductDialog: React.FC<CreateProductDialogProps> = (props: CreateProductDialogProps) => {
    const {onCloseDialog, onSaveProduct} = props;

    const [productPhoto, setProductPhoto] = useState<string>(addSvg);

    const [imageFile, setImageFile] = useState<Blob>();
    const [category, setCategory] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const onSave = () => {
        onSaveProduct({name, price, description, url: '', category}, imageFile);
    }

    const onAddPhoto = (event: ChangeEvent<HTMLInputElement>): void => {
        const files: Array<File> = Array.prototype.slice.call(event.target.files);
        setImageFile(files[0]);
        const reader: FileReader = new FileReader();
        reader.onload = function (event) {
            if (event.target) {
                setProductPhoto(event.target.result as string)
            }
        };
        reader.readAsDataURL(files[0]);
    }
    const onChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
        switch (event.target.name) {
            case 'name':
                setName(event.target.value as string);
                break;
            case 'price':
                setPrice(event.target.value as string);
                break;
            case 'category':
                setCategory(event.target.value as string);
                break;
            case 'description':
                setDescription(event.target.value as string);
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <DialogTitle id="form-dialog-title">Добавить новый продукт</DialogTitle>
            <DialogContent>
                <div className="add-dialog__product-image-wrapper">
                    <label htmlFor="product-photo">
                        <img className="add-dialog__product-image" src={productPhoto} alt="новый товар"/>
                    </label>
                    <input id="product-photo" className="add-dialog__image-input" type="file"
                           accept="image/*" onChange={onAddPhoto}/>
                </div>
                <TextField
                    required
                    label="Название"
                    fullWidth
                    value={name}
                    onChange={onChange}
                    name="name"/>
                <TextField
                    required
                    label="Цена"
                    type="number"
                    fullWidth value={price}
                    onChange={onChange}
                    name="price"/>
                <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-label">Категория продукта</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        onChange={onChange}
                        name="category"
                    >
                        <MenuItem key="1" value='grill'>Гриль</MenuItem>
                        <MenuItem key="2" value='sushi'>Суши</MenuItem>
                        <MenuItem key="3" value='drink'>Напитки</MenuItem>
                        <MenuItem key="4" value='salat'>Салаты</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Описание"
                    fullWidth
                    required
                    value={description}
                    onChange={onChange}
                    name="description"
                    multiline/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSave} color="primary">
                    Добавить
                </Button>
                <Button onClick={onCloseDialog} color="primary">
                    Отменить
                </Button>
            </DialogActions>
        </div>
    );
}

export default CreateProductDialog;
