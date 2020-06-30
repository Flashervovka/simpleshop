import React, {ChangeEvent, useState} from "react";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import addSvg from '../../static/images/wallpaper-24px.svg'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './styles.css';

interface NewProductDialogProps {
    open:boolean
    onOpenAddProductDialog(isOpen:boolean):void
}

const NewProductDialog: React.FC<NewProductDialogProps> = (props: NewProductDialogProps) => {
    const {open, onOpenAddProductDialog} = props;
    const [productPhoto, setProductPhoto] = useState<string>(addSvg);
    const [imageFile, setImageFile] = useState<Blob>();

    const [category, setCategory] = useState<string>('');

    const onCloseDialog = ():void => {
        onOpenAddProductDialog(false);
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

    const onChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategory(event.target.value as string);
    }

    return (
        <Dialog open={open} onClose={onCloseDialog} aria-labelledby="form-dialog-title" fullWidth>
            <DialogTitle id="form-dialog-title">Добавить новый продукт</DialogTitle>
            <DialogContent>
                <div className="add-dialog__product-image-wrapper">
                    <label htmlFor="product-photo">
                        <img className="add-dialog__product-image" src={productPhoto} alt="новый товар"/>
                    </label>
                    <input id="product-photo" className="add-dialog__image-input" type="file"
                           accept="image/*" onChange={onAddPhoto}/>
                </div>
                <TextField label="Название" fullWidth/>
                <TextField label="Цена" type="number" fullWidth/>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Категория продукта</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        onChange={onChangeCategory}
                    >
                        <MenuItem key="1" value={10}>Ten</MenuItem>
                        <MenuItem key="2" value={20}>Twenty</MenuItem>
                        <MenuItem key="3" value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <TextField label="Описание" fullWidth/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseDialog} color="primary">
                    Добавить
                </Button>
                <Button onClick={onCloseDialog} color="primary">
                    Отменить
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewProductDialog;
