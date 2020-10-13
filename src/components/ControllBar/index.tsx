import React, {useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import './styles.css';
import {makeStyles} from "@material-ui/core/styles";
import TabPanel from "./TabPanel";
import ControllBarTab from "./ControllBarTab";
import {ITabsPanelsData} from "./types";
import {IProduct} from "../../store/products/types";
import { history } from '../../store/';
import {getTabIndex} from "../../helpers/dataHelper";

interface ControlBarProps {
    tabsPanelsData: ITabsPanelsData
    onOpenProductDialog(isOpenDialogCreate: boolean, product?: IProduct, dialogStatus?: string): void
    readOnly?: boolean
    ordersCount?: number,
    locationPathName:string
}

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: "#2d323e",
    },
    indicator: {
        backgroundColor: "#039be5",
        height: "3px"
    },
    scrollButtons: {
        color: "#ffffff"
    }
}));

const ControllBar: React.FC<ControlBarProps> = (props: ControlBarProps) => {
    const {tabsPanelsData, onOpenProductDialog, readOnly, ordersCount, locationPathName} = props;
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const onSelectTab = (url:string) => (selectedTabIndex: number) => {
        setValue(selectedTabIndex);
        history.push(url);
    };

    useEffect(()=>{
        const tabIndex:number = getTabIndex(tabsPanelsData.tabs,locationPathName);
        if(tabIndex>=0){
            setValue(tabIndex);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[locationPathName])

    return (
        <div>
            <AppBar position="fixed" color="default" className={classes.root}>
                <Tabs classes={classes}
                      value={value}
                      variant="scrollable"
                      scrollButtons="on"
                      textColor="primary"
                >
                    {
                        tabsPanelsData.tabs.map((tab, index) =>
                            tab.access ?
                                <ControllBarTab
                                    {...tab}
                                    key={`admin_tabs_${index}`}
                                    index={index}
                                    onSelect={onSelectTab(tab.url)} ordersCount={ordersCount}/> :
                                null
                        )
                    }
                </Tabs>
            </AppBar>
            {
                tabsPanelsData.panels.map((Panel, index) =>
                    <TabPanel value={value} index={index} key={`admin_tab_panel_${index}`}>
                        <Panel
                            name="panel"
                            onOpenProductDialog={onOpenProductDialog}
                            readOnly={readOnly}
                        />
                    </TabPanel>
                )
            }
        </div>

    )
}

export default ControllBar;