import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import './styles.css';
import {ICategory} from "../../store/categories/types";
import TextField from "@material-ui/core/TextField";

import {cyrToLat} from "../../helpers";

interface CategorySettingsProps {
    categories: ICategory[]

    onAddNewCategory(category: ICategory): void
    onRemoveCategory(category: ICategory): void
}

const CategorySettings: React.FC<CategorySettingsProps> = (props: CategorySettingsProps) => {
    const {categories, onAddNewCategory, onRemoveCategory} = props;

    const [newCategoryLabel, setNewCategoryLabel] = useState<string>('');

    const onAdd = (): void => {
        onAddNewCategory({id:0, label:newCategoryLabel, name:cyrToLat.transform(newCategoryLabel,"_")})
    }

    const onChange = (event: React.ChangeEvent<{ value: string }>): void => {
        setNewCategoryLabel(event.target.value as string);
    }

    const onRemove = (category:ICategory) => ():void => {
        onRemoveCategory(category);
    }

    return (
        <AccordionDetails>
            <List dense={false}>
                <ListItem key={`category__new`}>
                    <ListItemAvatar>
                        <Avatar>
                            <FolderIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <TextField
                        required
                        label="Новая категория"
                        fullWidth
                        value={newCategoryLabel}
                        name="name"
                        onChange={onChange}/>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={onAdd}>
                            <AddIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {
                    categories.map((category, index) =>
                        <ListItem key={`category__${category.name}__${index}`}>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={category.label}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={onRemove(category)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                }
            </List>
        </AccordionDetails>
    );
}

export default CategorySettings;
