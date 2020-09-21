import React from "react";
import Tab from "@material-ui/core/Tab";
import {ITabData} from "./types";

interface ControllBarTabProps extends ITabData{
    onSelect(index:number):void
    index:number
    ordersCount?:number
}

const ControllBarTab: React.FC<ControllBarTabProps> = (props: ControllBarTabProps) => {
    const { label, Icon, onSelect, index, ordersCount, showOrdersInfo} = props;
    const onTabClick = (event:React.EventHandler<any>) => {
        onSelect(index);
    }
    return (
        <Tab onClick={onTabClick} className="menu-item" label={
            <div className="menu-item__info">
                <Icon className="menu-item__icon"/>
                <div className="menu-item__label">{`${label}${showOrdersInfo && ordersCount && ordersCount > 0 ? `(${ordersCount})` : ''}`}</div>
            </div>
        }/>
    );
}

export default ControllBarTab;
