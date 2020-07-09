import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import './styles.css';
import {makeStyles, Theme} from "@material-ui/core/styles";
import TabPanel from "./TabPanel";
import ControllBarTab from "./ControllBarTab";
import {ITabsPanelsData} from "./types";
import {IProduct} from "../../store/products/types";


interface ControlBarProps {
    tabsPanelsData: ITabsPanelsData
    onGetProductsList(): void
    productsList: IProduct[]
    onOpenProductDialog(isOpenDialogCreate:boolean, product?:IProduct,  dialogStatus?:string):void
    onRemoveProduct(product:IProduct):void
}

const useStyles = makeStyles((theme: Theme) => ({
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
    const {tabsPanelsData, onGetProductsList, productsList, onOpenProductDialog, onRemoveProduct } = props;

    useEffect(() => {
        onGetProductsList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const classes = useStyles();
    const [value, setValue] = useState(0);
    const onSelectTab = (selectedTabIndex: number) => {
        setValue(selectedTabIndex);
    };

    return (
        <div>
            <AppBar position="fixed" color="default" className={classes.root}>
                <Tabs classes={classes}
                      value={value}
                      variant="scrollable"
                      scrollButtons="on"
                      textColor="primary"
                      aria-label="scrollable force tabs example"
                >
                    {
                        tabsPanelsData.tabs.map((tab, index) =>
                            <ControllBarTab {...tab} key={`admin_tabs_${index}`} index={index} onSelect={onSelectTab}/>
                        )
                    }
                </Tabs>
            </AppBar>
            {
                tabsPanelsData.panels.map((Panel, index) =>
                    <TabPanel value={value} index={index} key={`admin_tab_panel_${index}`}>
                        <Panel name="panel" productsList={productsList} onOpenProductDialog={onOpenProductDialog} onRemoveProduct={onRemoveProduct}/>
                    </TabPanel>
                )
            }
        </div>

    )
}

export default ControllBar;