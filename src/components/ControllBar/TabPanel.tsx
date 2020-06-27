import React from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        value===index ?
            <div
                role="tabpanel"
                id={`scrollable-force-tabpanel-${index}`}
                aria-labelledby={`scrollable-force-tab-${index}`}
                {...other}
            >{children}
            </div> : null
    );
}

export default TabPanel;