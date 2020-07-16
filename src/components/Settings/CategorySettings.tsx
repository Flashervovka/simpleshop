import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import './styles.css';
import {ICategory} from "./types";

interface CategorySettingsProps {
    categories:ICategory[]
}

const CategorySettings: React.FC<CategorySettingsProps> = (props: CategorySettingsProps) => {
    const {categories} = props;

    return (
        <AccordionDetails>
            <List dense={false}>
                {
                    categories.map((category, index) =>
                        <ListItem key={`category__${category.name}__${index}`}>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={category.label}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
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
