import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {ICategory} from "../../store/categories/types";

interface FilterMenuProps {
    categories:ICategory[]
    onSetFilter(selectedIndex:number):void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
            top: 48,
            position: "fixed",
            zIndex: 3,
            width: "100%"
        },
        paper:{
            width:"100%"
        }
    }),
);

const useMenuStyles = makeStyles(() =>
    createStyles({
        paper:{
            width:"100%"
        }
    })
);


const FilterMenu: React.FC<FilterMenuProps> =  (props:FilterMenuProps) => {
    const {categories, onSetFilter} = props
    const classes = useStyles();
    const classesMenu = useMenuStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        onSetFilter(index);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const filterCategories:string[] = categories.reduce((accumulator, currentValue)=>{
        return [...accumulator, currentValue.label]
    },["Все"])

    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItem
                    button
                    onClick={handleClickListItem}
                >
                    <ListItemText primary={filterCategories[selectedIndex]}/>
                </ListItem>
            </List>
            <Menu
                classes={classesMenu}
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {filterCategories.map((category, index) => (
                    <MenuItem
                        key={`filter_menu__${index}`}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {category}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

export default FilterMenu;