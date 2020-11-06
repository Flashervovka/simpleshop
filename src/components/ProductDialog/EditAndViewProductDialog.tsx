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
import {ICategory} from "../../store/categories/types";
import {compressImage} from "../../helpers";
import {getCategoryByName} from "../../helpers/dataHelper";
import {STATUS_ADMIN_VIEW, STATUS_CLIENT_VIEW, STATUS_EDIT} from "../../config";
import FormHelperText from '@material-ui/core/FormHelperText';
import addSvg from "../../static/images/wallpaper-24px.svg";
import {v4 as uuidv4} from 'uuid';
import {ISettings} from "../../store/settings/types";
import Typography from "@material-ui/core/Typography";
import {addUserOrderToLocalStorage} from "../../helpers/localStorageHelper";


interface EditAndViewProductDialogProps {
    onCloseDialog(): void

    selectedProduct: IProduct
    dialogStatus: string

    onUpdateProduct(product: IProduct, productImgFile?: Blob | undefined): void

    categories: ICategory[],

    onPutProductToBasket(product: IProduct, count: number, id: string): void

    settings: ISettings
}

const EditAndViewProductDialog: React.FC<EditAndViewProductDialogProps> = (props: EditAndViewProductDialogProps) => {
    const {onCloseDialog, selectedProduct, dialogStatus, onUpdateProduct, categories, onPutProductToBasket, settings} = props;

    const [productPhoto, setProductPhoto] = useState<string>();

    const [imageFile, setImageFile] = useState<Blob>();
    const [category, setCategory] = useState<string>(selectedProduct.category);

    const [name, setName] = useState<string>(selectedProduct.name);
    const [price, setPrice] = useState<string>(selectedProduct.price);
    const [description, setDescription] = useState<string>(selectedProduct.description);
    const [categoryLabel, setCategoryLabel] = useState<string>(selectedProduct.categoryLabel);
    const [count, setCount] = useState<number>(1);
    const [savePressed, setSavePressed] = useState<boolean>(false);


    const onSave = () => {
        if (dialogStatus === STATUS_CLIENT_VIEW) {
            onPutProductToBasket(
                {name, price, description, url: selectedProduct.url, category, id: selectedProduct.id, categoryLabel},
                count,
                uuidv4()
            );
            addUserOrderToLocalStorage({
                count:count,
                product:{name, price, description, url: selectedProduct.url, category, id: selectedProduct.id, categoryLabel},
                id:uuidv4()
            })
            onCloseDialog();

        } else {
            setSavePressed(true);
            if (name !== "" && price !== "" && category !== "" && productPhoto !== addSvg) {
                onUpdateProduct({
                    name,
                    price,
                    description,
                    //url: imageFile ? '' : selectedProduct.url,
                    url: selectedProduct.url,
                    category,
                    id: selectedProduct.id,
                    categoryLabel
                }, imageFile);
                onCloseDialog();
            }
        }

    }

    const onAddPhoto = (event: ChangeEvent<HTMLInputElement>): void => {
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

    const onChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
        setSavePressed(false);
        switch (event.target.name) {
            case 'name':
                setName(event.target.value as string);
                break;
            case 'price':
                if(!isNaN(event.target.value as number)){
                    setPrice(event.target.value as string);
                }
                break;
            case 'category':
                setCategory(event.target.value as string);
                const cat: ICategory | null = getCategoryByName(categories, event.target.value as string);
                setCategoryLabel(cat?.label ? cat.label : '');
                break;
            case 'description':
                setDescription(event.target.value as string);
                break;
            case 'count':
                if(!isNaN(event.target.value as number)){
                    setCount(event.target.value as number);
                }
                break;
            default:
                break;
        }
    }

    const isEditStatus: boolean = dialogStatus === STATUS_EDIT;

    const inputProps: Object = {
        style: {color: "rgba(0, 0, 0, 0.87)"},
        // disableUnderline: true
    }

    const onBlurField = (fieldType:string) => (event: React.FocusEvent<HTMLInputElement>) => {
        switch (fieldType){
            case 'count':
                if(event.target.value === ""){
                    setCount(1);
                }
                break;
            default:
                break;
        }

    }

    return (
        <div>
            {/*<DialogTitle id="form-dialog-title">{selectedProduct.name}</DialogTitle>*/}
            <DialogContent>
                <div className="add-dialog__product-image-wrapper">
                    <label htmlFor="product-photo">
                        <img className="add-dialog__product-image"
                             src={productPhoto ? productPhoto : `../images/${selectedProduct.url}`} alt="новый товар"/>
                    </label>
                    {
                        isEditStatus && <input id="product-photo" className="add-dialog__image-input" type="file"
                               accept="image/*" onChange={onAddPhoto}/>
                    }
                </div>
                <FormControl fullWidth error={name === "" && savePressed}>
                    <TextField
                        error={name === "" && savePressed}
                        InputProps={inputProps}
                        required
                        label={isEditStatus ? "Название" : ''}
                        fullWidth
                        value={name}
                        onChange={onChange}
                        name="name"
                        disabled={!isEditStatus}/>
                    {name === "" && savePressed && <FormHelperText>Поле является обязательным</FormHelperText>}
                </FormControl>
                <FormControl fullWidth error={price === "" && savePressed}>
                    <div className="add-dialog__product-price">
                        <TextField
                            error={price === "" && savePressed}
                            InputProps={{
                                inputProps: {
                                    ...inputProps,
                                    min: 1
                                }
                            }}
                            required
                            label={isEditStatus ? "Цена" : ''}
                            type="number"
                            fullWidth value={`${price}`}
                            onChange={onChange}
                            name="price"
                            disabled={!isEditStatus}/>
                        <Typography variant="body2" color="textPrimary" component="p">руб.</Typography>
                    </div>
                    {price === "" && savePressed && <FormHelperText>Поле является обязательным</FormHelperText>}
                </FormControl>
                {
                    !isEditStatus ?
                        <TextField
                            InputProps={inputProps}
                            required
                            label={isEditStatus ? "Категория" : ''}
                            fullWidth
                            value={categoryLabel}
                            onChange={onChange}
                            name="category"
                            disabled={!isEditStatus}/> :
                        <FormControl fullWidth required error={category === "" && savePressed}>
                            <InputLabel>Категория продукта</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={category}
                                onChange={onChange}
                                name="category"
                            >
                                {
                                    categories.map((cat, index) => {
                                        return <MenuItem key={`product-category__${index}`}
                                                         value={cat.name}>{cat.label}</MenuItem>
                                    })
                                }
                            </Select>
                            {category === "" && savePressed &&
                            <FormHelperText>Поле является обязательным</FormHelperText>}
                        </FormControl>

                }
                <TextField
                    rows={3}
                    InputProps={inputProps}
                    label={isEditStatus ? "Описание" : ''}
                    fullWidth
                    required
                    value={description}
                    onChange={onChange}
                    name="description"
                    multiline
                    disabled={!isEditStatus}/>
                {
                    dialogStatus === STATUS_CLIENT_VIEW ?
                        <div className="add-dialog__footer">
                            <TextField
                                onBlur={onBlurField("count")}
                                className="add-dialog__product-order-count"
                                variant="outlined"
                                InputProps={{
                                    inputProps: {
                                        ...inputProps,
                                        min: 1
                                    }
                                }}
                                label="Количество*"
                               // type="number"
                                value={count}
                                onChange={onChange}
                                name="count"/>
                            {
                                settings.minOrderCost !== "" && <div className="add-dialog__free-delivery-info">
                                    {`Бесплатная доставка при заказе от ${settings.minOrderCost} руб.`}
                                </div>
                            }

                        </div>
                        :
                        null
                }
            </DialogContent>
            <DialogActions>
                {
                    dialogStatus !== STATUS_ADMIN_VIEW ?
                        <Button onClick={onSave} color="primary">
                            {isEditStatus ? "Сохранить" : "Добавить в корзину"}
                        </Button> :
                        null
                }

                <Button onClick={onCloseDialog} color="primary">
                    {isEditStatus ? 'Отменить' : 'Закрыть'}
                </Button>
            </DialogActions>
        </div>
    );
}

export default EditAndViewProductDialog;
