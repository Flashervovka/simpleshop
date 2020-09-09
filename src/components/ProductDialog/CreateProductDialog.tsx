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
import {ICategory} from "../../store/categories/types";
import {compressImage} from "../../helpers";
import {getCategoryByName} from "../../helpers/dataHelper";
import FormHelperText from '@material-ui/core/FormHelperText';

interface CreateProductDialogProps {
    onCloseDialog(): void

    onSaveProduct(product: IProduct, productImgFile: Blob | undefined): void

    categories: ICategory[]
}

const CreateProductDialog: React.FC<CreateProductDialogProps> = (props: CreateProductDialogProps) => {
    const {onCloseDialog, onSaveProduct, categories} = props;

    const [productPhoto, setProductPhoto] = useState<string>(addSvg);

    const [imageFile, setImageFile] = useState<Blob>();
    const [category, setCategory] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [categoryLabel, setCategoryLabel] = useState<string>('');
    const [savePressed, setSavePressed] = useState<boolean>(false);

    const onSave = () => {
        setSavePressed(true);
        if (name !== "" && price !== "" && category !== "" && productPhoto !== addSvg) {
            onSaveProduct({name, price, description, url: '', category, categoryLabel}, imageFile);
        }

    }

    const onAddPhoto = (event: ChangeEvent<HTMLInputElement>): void => {
        setSavePressed(false);
        const files: Array<File> = Array.prototype.slice.call(event.target.files);
        compressAndSetPhoto(files[0]);
    }

    const compressAndSetPhoto = (imageFile: File): void => {
        compressImage(imageFile, (compressedImage: File) => {
            setImageFile(compressedImage);
            const reader: FileReader = new FileReader();
            reader.onload = function (event) {
                if (event.target) {
                    setProductPhoto(event.target.result as string)
                }
            };
            reader.readAsDataURL(compressedImage);
        })
    }


    const onChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; label?: string | undefined }>) => {
        setSavePressed(false);
        switch (event.target.name) {
            case 'name':
                setName(event.target.value as string);
                break;
            case 'price':
                setPrice(event.target.value as string);
                break;
            case 'category':
                setCategory(event.target.value as string);
                const cat: ICategory | null = getCategoryByName(categories, event.target.value as string);
                setCategoryLabel(cat?.label ? cat.label : '');
                break;
            case 'description':
                setDescription(event.target.value as string);
                break;
            default:
                break;
        }
    }
    const inputProps:Object = {
        style:{color:"rgba(0, 0, 0, 0.87)"},
        // disableUnderline: true
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
                    {savePressed && productPhoto === addSvg &&
                    <div className="add-dialog__product-image-error">Выберите картинку</div>}
                </div>
                <FormControl fullWidth error={name === "" && savePressed}>
                    <TextField
                        InputProps={inputProps}
                        error={name === "" && savePressed}
                        required
                        label="Название"
                        fullWidth
                        value={name}
                        onChange={onChange}
                        name="name"/>
                    {name === "" && savePressed && <FormHelperText>Поле является обязательным</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={price === "" && savePressed}>
                    <TextField
                        InputProps={{
                            inputProps: {
                                ...inputProps,
                                min:1
                            }
                        }}
                        error={price === "" && savePressed}
                        required
                        label="Цена"
                        type="number"
                        fullWidth value={price}
                        onChange={onChange}
                        name="price"/>
                    {price === "" && savePressed && <FormHelperText>Поле является обязательным</FormHelperText>}
                </FormControl>
                <FormControl fullWidth required error={category === "" && savePressed}>
                    <InputLabel id="demo-simple-select-label">Категория продукта</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        value={category}
                        onChange={onChange}
                        name="category"
                    >
                        {
                            categories.map((cat, index) => <MenuItem key={`product-category__${index}`}
                                                                     value={cat.name}>{cat.label}</MenuItem>)
                        }
                    </Select>
                    {category === "" && savePressed && <FormHelperText>Поле является обязательным</FormHelperText>}
                </FormControl>
                <TextField
                    InputProps={inputProps}
                    label="Описание"
                    fullWidth
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
