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
    const showInfo = showOrdersInfo && ordersCount && ordersCount > 0;

    return (
        <Tab onClick={onTabClick} className="menu-item" label={
            <div className={`menu-item__info ${showInfo ? "menu-item__order-anitamation-wrapper" : ""}`}>
                <Icon className={`menu-item__icon ${showInfo ? "menu-item__order-anitamation" : ""}`}/>
                <div className={`menu-item__label ${showInfo? "menu-item__order-anitamation" : ""}`}>{`${label}${showInfo ? `(${ordersCount})` : ''}`}</div>
            </div>
        }/>
    );
}

export default ControllBarTab;
