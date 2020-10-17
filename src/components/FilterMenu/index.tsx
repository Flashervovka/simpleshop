import React,{useEffect} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {ICategory} from "../../store/categories/types";
import './styles.css';
import { history } from '../../store/';
import {BASE, DASHBOARD} from "../../config/Routes";

interface FilterMenuProps {
    categories:ICategory[]
    onSetFilter(selectedIndex:number):void
    locationPathName:string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: "#ededff",
            top: 48,
            position: "fixed",
            zIndex: 3,
            width: "100%",
            height: 60
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
    const {categories, onSetFilter, locationPathName} = props
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
        const filterName:string = index === 0 ? '': categories[index-1].name;
        const basePath:string = locationPathName.includes(DASHBOARD) ? `${DASHBOARD}/` : BASE;
        if(`${basePath}${filterName}` !== locationPathName){
            history.push(`${basePath}${filterName}`)
        }
        onSetFilter(index);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const filterCategories:string[] = categories.reduce((accumulator, currentValue)=>{
        return [...accumulator, currentValue.label]
    },["Показывать все"])

    useEffect(() => {
        let categoryIndex:number = 0;
        const basePath:string = locationPathName.includes(DASHBOARD) ? `${DASHBOARD}/` : BASE;
        categories.forEach((category, index) => {
            if(locationPathName.includes(`${basePath}${category.name}`)){
                categoryIndex = index+1;
            }
        });
        setSelectedIndex(categoryIndex);
        onSetFilter(categoryIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[locationPathName, categories.length]);

    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItem
                    button
                    onClick={handleClickListItem}
                >
                    <ListItemText primary={filterCategories[selectedIndex]} className="filter-menu__list-item-text"/>
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