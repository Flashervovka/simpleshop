import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import './styles.css';
import {makeStyles} from "@material-ui/core/styles";
import TabPanel from "./TabPanel";
import ControllBarTab from "./ControllBarTab";
import {ITabsPanelsData} from "./types";
import {IProduct} from "../../store/products/types";

interface ControlBarProps {
    tabsPanelsData: ITabsPanelsData
    onOpenProductDialog(isOpenDialogCreate: boolean, product?: IProduct, dialogStatus?: string): void
    readOnly?: boolean
    ordersCount?: number
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
    const {tabsPanelsData, onOpenProductDialog, readOnly, ordersCount} = props;
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
                            tab.access ?
                                <ControllBarTab
                                    {...tab}
                                    key={`admin_tabs_${index}`}
                                    index={index}
                                    onSelect={onSelectTab} ordersCount={ordersCount}/> :
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