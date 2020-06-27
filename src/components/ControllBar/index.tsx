import React,{useState} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './styles.css';
import {makeStyles, Theme} from "@material-ui/core/styles";
import TabPanel from "./TabPanel";

import FastfoodIcon from '@material-ui/icons/Fastfood';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import SettingsIcon from '@material-ui/icons/Settings';


type ControlBarProps = {}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: "#2d323e",
    },
    indicator:{
        backgroundColor:"#039be5",
        height:"3px"
    },
    scrollButtons:{
        color:"#ffffff"
    }
}));

const ControllBar: React.FC<ControlBarProps> = (props: ControlBarProps) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static" color="default" className={classes.root}>
                <Tabs classes={classes}
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >
                    <Tab className="menu-item" label={
                        <div className="menu-item__info">
                            <FastfoodIcon className="menu-item__icon"/>
                            <div className="menu-item__label">Продукты</div>
                        </div>

                    } />
                    <Tab className="menu-item" label={
                        <div className="menu-item__info">
                            <FormatListNumberedIcon className="menu-item__icon"/>
                            <div className="menu-item__label">Заказы</div>
                        </div>
                    } />
                    <Tab className="menu-item" label={
                        <div className="menu-item__info">
                            <SettingsIcon className="menu-item__icon"/>
                            <div className="menu-item__label">Настройки</div>
                        </div>
                    } />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Продукты
            </TabPanel>
            <TabPanel value={value} index={1}>
                Заказы
            </TabPanel>
            <TabPanel value={value} index={2}>
                Настройки
            </TabPanel>
        </div>

    )
}

export default ControllBar;