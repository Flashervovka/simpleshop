import React, {ChangeEvent, useState} from "react";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {IProduct} from "../../store/products/types";
import './styles.css'


interface EditAndViewProductDialogProps {
    onCloseDialog():void
    selectedProduct: IProduct
    dialogStatus:string
    onUpdateProduct(product: IProduct, productImgFile: Blob | undefined): void
}

const EditAndViewProductDialog: React.FC<EditAndViewProductDialogProps> = (props: EditAndViewProductDialogProps) => {
    const {onCloseDialog, selectedProduct, dialogStatus, onUpdateProduct} = props;

    const [productPhoto, setProductPhoto] = useState<string>();

    const [imageFile, setImageFile] = useState<Blob>();
    const [category, setCategory] = useState<string>(selectedProduct.category);

    const [name, setName] = useState<string>(selectedProduct.name);
    const [price, setPrice] = useState<string>(selectedProduct.price);
    const [description, setDescription] = useState<string>(selectedProduct.description);

    const onSave = () => {
        onUpdateProduct({name, price, description, url: '', category, id:selectedProduct.id}, imageFile);
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
            case 'category':console.log("event.target.value",event.target.value);
                setCategory(event.target.value as string);
                break;
            case 'description':
                setDescription(event.target.value as string);
                break;
            default:
                break;
        }
    }

    const isEditStatus:boolean = dialogStatus === "edit";

    const inputProps:Object = {
        style:{color:"rgba(0, 0, 0, 0.87)"},
       // disableUnderline: true
    }

    return (
        <div>
            {/*<DialogTitle id="form-dialog-title">{selectedProduct.name}</DialogTitle>*/}
            <DialogContent>
                <div className="add-dialog__product-image-wrapper">
                    <label htmlFor="product-photo">
                        <img className="add-dialog__product-image" src={productPhoto ? productPhoto : `../images/${selectedProduct.url}`} alt="новый товар"/>
                    </label>
                    <input id="product-photo" className="add-dialog__image-input" type="file"
                           accept="image/*" onChange={onAddPhoto}/>
                </div>
                <TextField
                    InputProps={inputProps}
                    required
                    label={isEditStatus ? "Название" : ''}
                    fullWidth
                    value={name}
                    onChange={onChange}
                    name="name"
                    disabled={!isEditStatus}/>
                <TextField
                    InputProps={inputProps}
                    required
                    label={isEditStatus ? "Цена" : ''}
                    type="number"
                    fullWidth value={price}
                    onChange={onChange}
                    name="price"
                    disabled={!isEditStatus}/>
                {
                    !isEditStatus ?
                        <TextField
                            InputProps={inputProps}
                            required
                            label={isEditStatus ? "Категория" : ''}
                            fullWidth
                            value={category}
                            onChange={onChange}
                            name="category"
                            disabled={!isEditStatus}/> :
                        <FormControl fullWidth required>
                            <InputLabel>Категория продукта</InputLabel>
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

                }
                <TextField
                    InputProps={inputProps}
                    label={isEditStatus ? "Описание" : ''}
                    fullWidth
                    required
                    value={description}
                    onChange={onChange}
                    name="description"
                    multiline
                    disabled={!isEditStatus}/>
            </DialogContent>
            <DialogActions>
                {
                    isEditStatus ?
                        <Button onClick={onSave} color="primary">
                            Сохранить
                        </Button> : ''
                }
                <Button onClick={onCloseDialog} color="primary">
                    Отменить
                </Button>
            </DialogActions>
        </div>
    );
}

export default EditAndViewProductDialog;
